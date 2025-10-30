import { useRef, useState } from "react";

const useAudioFunctions = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcribedText, setTranscribedText] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Replace this with a real API call 
  const transcribeAudio = async (blob) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve("Sample transcription text from the recorded audio.");
      }, 2000)
    );
  };

  const startRecording = async () => {
    try {
      setAudioBlob(null);
      setAudioUrl(null);
      setTranscribedText("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlobResult = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setAudioBlob(audioBlobResult);
        const url = URL.createObjectURL(audioBlobResult);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());

        const text = await transcribeAudio(audioBlobResult);
        setTranscribedText(text);

        const textFile = new Blob([text], { type: "text/plain" });
        const textUrl = URL.createObjectURL(textFile);
        const link = document.createElement("a");
        link.href = textUrl;
        link.download = "transcribed_audio.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePlay = () => {
    if (audioUrl) new Audio(audioUrl).play();
  };

  return {
    startRecording,
    stopRecording,
    handlePlay,
    isRecording,
    audioUrl,
    transcribedText,
  };
};

export default useAudioFunctions;
