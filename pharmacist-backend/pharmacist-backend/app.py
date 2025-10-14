
import os
import re
import time
import gc
import logging
from datetime import datetime

from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from openai import OpenAI
from bson.objectid import ObjectId
from pydub import AudioSegment, effects

# -------------------- CONFIGURATION --------------------
logging.basicConfig(level=logging.INFO)
app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = {'webm', 'wav'}

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['user_data']
collection = db['user_prescriptions']


# -------------------- UTILITIES --------------------
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def speech_to_text(audio_file_path):
    """Convert speech from WAV file to text using Google's speech recognition."""
    if not os.path.exists(audio_file_path):
        return "Error: Audio file not found."

    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_file_path) as source:
            app.logger.info("Reading audio data...")
            audio = recognizer.record(source)
            if not audio.frame_data:
                return "Error: The audio file is empty or silent."

            app.logger.info("Transcribing audio...")
            text = recognizer.recognize_google(audio)
            return text

    except sr.UnknownValueError:
        return "Could not understand audio. The speech might be unclear or the file is silent."
    except sr.RequestError as e:
        return f"Could not request results from the API; check your internet connection. Error: {str(e)}"
    except Exception as e:
        return f"An unexpected error occurred during transcription: {str(e)}"


# -------------------- ROUTES --------------------
@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    """Handles uploaded audio and returns transcribed text."""
    if 'audio_file' not in request.files:
        return jsonify({"error": "No audio_file part in the request"}), 400

    file = request.files['audio_file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type. Only WebM or WAV files are supported."}), 400

    filename = secure_filename(file.filename)
    original_filepath = os.path.join(os.getcwd(), filename)
    wav_filepath = os.path.join(os.getcwd(), "converted_audio1.wav")

    # Save uploaded file
    file.save(original_filepath)
    app.logger.info(f"File '{filename}' saved temporarily.")

    # Check file size
    if os.path.getsize(original_filepath) == 0:
        os.remove(original_filepath)
        return jsonify({"error": "Recorded audio file is empty. Did you record any sound?"}), 400

    # Wait for Windows to release the file handle
    for attempt in range(5):
        try:
            with open(original_filepath, "rb") as f:
                f.read(1)
            break
        except PermissionError:
            app.logger.warning(f"File locked (retry {attempt+1}/5)...")
            time.sleep(0.3)
    else:
        return jsonify({"error": "File still locked after multiple retries"}), 500

    try:
        # Convert & normalize audio
        app.logger.info("Converting and normalizing audio...")
        audio = AudioSegment.from_file(original_filepath, format="webm")
        audio = effects.normalize(audio)
        audio.export(wav_filepath, format="wav")
        app.logger.info("Conversion successful.")
    except Exception as e:
        app.logger.error(f"Audio conversion failed: {e}")
        try:
            os.remove(original_filepath)
        except Exception as ex:
            app.logger.warning(f"Cleanup failed: {ex}")
        return jsonify({"error": f"Failed to convert audio: {str(e)}"}), 500
    finally:
        audio = None
        gc.collect()
        time.sleep(0.3)

    # Transcribe
    text = speech_to_text(wav_filepath)
    result = {"transcribed_text": text}

    # Cleanup
    for path in [original_filepath, wav_filepath]:
        for attempt in range(5):
            try:
                if os.path.exists(path):
                    os.remove(path)
                    app.logger.info(f"Deleted: {path}")
                break
            except PermissionError:
                time.sleep(0.3)
            except Exception as e:
                app.logger.warning(f"Failed to remove '{path}': {e}")
                break

    return jsonify(result), 200


def generate_prescription(disease_description: str) -> str:
    """Generate a prescription using OpenAI API."""
    client = OpenAI(api_key="*")

    prompt_text = (
        f"Patient description: {disease_description}\n"
        "Generate a concise medical prescription.\n"
        "Rules:\n"
        "- Start directly with prescription steps (numbered list)\n"
        "- No disclaimers or doctor names\n"
        "Example:\n"
        "1. Paracetamol 500mg twice daily\n"
        "2. Warm saline gargle twice daily\n"
    )

    response = client.responses.create(
        model="gpt-4o-mini",
        input=prompt_text,
        temperature=0.3
    )

    raw_text = response.output[0].content[0].text.strip()
    match = re.search(r"(\d+\..*)", raw_text, re.S)
    return match.group(1).strip() if match else raw_text


@app.route('/generate-prescription', methods=['POST'])
def prescription():
    data = request.get_json()
    if not data or 'symptoms' not in data:
        return jsonify({'error': 'Missing symptoms in request body'}), 400

    symptoms = data['symptoms']
    print(symptoms)
    result = generate_prescription(symptoms)
    saved_data = add_prescription(symptoms, result, "OPEN")
    data_dict = saved_data[0].get_json(force=True)
    print(data_dict["id"])

    print(saved_data)
    return jsonify({'prescription': result, "_id": data_dict["id"]})

@app.route('/list-prescriptions', methods=['GET'])
def list_prescriptions():
    prescriptions = []
    for doc in collection.find():
        # Convert ObjectId to string
        doc['_id'] = str(doc['_id'])
        # Convert datetime fields to ISO format strings
        if 'submittedDateTime' in doc and isinstance(doc['submittedDateTime'], datetime):
            doc['submittedDateTime'] = doc['submittedDateTime'].isoformat()
        if 'reviwedDateTime' in doc and isinstance(doc['reviwedDateTime'], datetime):
            doc['reviwedDateTime'] = doc['reviwedDateTime'].isoformat()
        prescriptions.append(doc)
    return jsonify(prescriptions)
@app.route('/check-prescription', methods=['GET'])
def check_prescription():
    print("check_prescription")
    presc_id = request.args.get("id")
    print(presc_id)
    if not presc_id:
        return jsonify({"error": "No ID provided"}), 400
    doc = collection.find_one({"_id": ObjectId(presc_id), "status": "reviewed"})
    print(doc)
    if not doc:
        return jsonify({"error": "Not found"}), 404
    return jsonify({
        "id": str(doc.get("_id")),
        "prescription": doc.get("llmPrescription"),
        "status": doc.get("status", doc.get("status"))
    })

@app.route('/prescriptions/user/<user_id>', methods=['GET'])
def get_prescriptions_by_user(user_id):
    prescriptions = []
    for doc in collection.find({"userId": user_id}):
        doc['_id'] = str(doc['_id'])
        prescriptions.append(doc)
    return jsonify(prescriptions), 200


@app.route('/update-prescription', methods=['POST'])
def update_prescription():
    data = request.get_json()
    if not data or '_id' not in data:
        return jsonify({"error": "Missing prescription ID"}), 400

    prescription_id = data['_id']
    updated_fields = {
        "userId": data['userId'],
        "illnessDescription": data['illnessDescription'],
        "llmPrescription": data['llmPrescription'],
        "submittedDateTime": data['submittedDateTime'],
        "reviwedDateTime": datetime.now(),
        "status": data['status'],
    }

    result = collection.update_one({"_id": ObjectId(prescription_id)}, {"$set": updated_fields})
    if result.modified_count > 0:
        return jsonify({"updated_id": prescription_id}), 200
    else:
        return jsonify({"message": "No document updated"}), 404


def add_prescription(illnessDescription, llmPrescription, status):
    prescription = {
        "userId": "B1965",
        "illnessDescription": illnessDescription,
        "llmPrescription": llmPrescription,
        "submittedDateTime": datetime.now(),
        "reviwedDateTime": datetime.now(),
        "status": status
    }
    result = collection.insert_one(prescription)
    return jsonify({'id': str(result.inserted_id)}), 201


# -------------------- MAIN --------------------
if __name__ == "__main__":
    app.run(debug=True)
