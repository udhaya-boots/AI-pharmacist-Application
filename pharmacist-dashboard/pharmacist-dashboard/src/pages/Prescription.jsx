import { useState } from 'react';
import {
    FileCheck,
    User,
    ArrowLeft,
    Calendar,
    Clock,
    AlertCircle,
    Save,
    Edit3,
    CheckCircle,
    Pill,
    Activity
} from "lucide-react";
import prescriptionData from '../data/prescription';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/SuccessAlert';
import PrescriptionInfoList from '../components/PrescriptionInfoList';

const PrescriptionPage = () => {
    const navigate = useNavigate();

    // Initialize prescriptions from data file
    const [prescriptions, setPrescriptions] = useState(prescriptionData.prescriptions);

    // Global states for alerts
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [type, setType] = useState('success');

    // Handle prescription editing
    // const handleSave = (id, updatedText) => {
    //     const updatedPrescriptions = prescriptions.map((item) =>
    //         item._id === id ? { ...item, llmPrescription: updatedText } : item
    //     );
    //     setPrescriptions(updatedPrescriptions);
    //     setType('success');
    //     setAlertMessage('Prescription updated successfully!');
    //     setShowAlert(true);
    // };

    // // Handle pharmacist notes
    // const handleSaveNotes = (id, notes) => {
    //     if (!notes.trim()) {
    //         setType('error');
    //         setAlertMessage('Please add a note before saving.');
    //         setShowAlert(true);
    //         return;
    //     }

    //     const updatedPrescriptions = prescriptions.map((item) =>
    //         item._id === id ? { ...item, notes } : item
    //     );
    //     setPrescriptions(updatedPrescriptions);
    //     setType('success');
    //     setAlertMessage('Note added successfully!');
    //     setShowAlert(true);
    // };

    // // Change status
    // const handleStatusChange = (id, newStatus) => {
    //     const updatedPrescriptions = prescriptions.map((item) =>
    //         item._id === id ? { ...item, status: newStatus } : item
    //     );
    //     setPrescriptions(updatedPrescriptions);
    // };

    // // Get color classes for status badges
    // const getStatusColor = (status) => {
    //     switch (status) {
    //         case 'new': return 'text-indigo-600 bg-indigo-50';
    //         case 'reviewed': return 'text-green-600 bg-green-50';
    //         case 'closed': return 'text-red-600 bg-red-50';
    //         default: return 'text-gray-600 bg-gray-50';
    //     }
    // };

    return (
        <>
            <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
                {/* Main Content */}
                <main className="flex-1 p-10 max-w-full overflow-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-4 transition-colors"
                            onClick={() => navigate('/')}
                        >
                            <ArrowLeft size={20} />
                            <span className="font-medium">Go Home</span>
                        </button>
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-indigo-900">
                                Prescription Details
                            </h1>
                            <p className="text-indigo-700 mt-1 text-sm">
                                Review and manage patient prescriptions
                            </p>
                        </div>
                    </div>

                    {/* ======= PRESCRIPTIONS LOOP ======= */}
                    <PrescriptionInfoList prescriptions={prescriptions}setAlertMessage={setAlertMessage} setPrescriptions={setPrescriptions}setShowAlert={setShowAlert}setType={setType}/>
                    {/* <div className="space-y-10">
                        {prescriptions.map((prescription) => {
                            const [isEditing, setIsEditing] = useState(false);
                            const [editedText, setEditedText] = useState(prescription.llmPrescription);
                            const [notes, setNotes] = useState(prescription.notes || '');

                            return (
                                <div key={prescription._id} className="border-b pb-10 mb-10">

                                    {/* HEADER WITH STATUS */}
                                    {/* <div className="flex items-center justify-between mb-4">
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold uppercase ${getStatusColor(prescription.status)}`}>
                                            {prescription.status}
                                        </span>
                                        <select
                                            className="border-2 border-indigo-200 rounded-lg px-4 py-2 text-sm font-medium text-indigo-900 focus:outline-none focus:border-indigo-500"
                                            value={prescription.status}
                                            onChange={(e) => handleStatusChange(prescription._id, e.target.value)}
                                        >
                                            <option value="new">Mark as New</option>
                                            <option value="reviewed">Mark as Reviewed</option>
                                            <option value="closed">Mark as Closed</option>
                                        </select>
                                    </div> */}

                                    {/* PATIENT INFO */}
                                    {/* <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-xl font-bold text-indigo-900 flex items-center space-x-2">
                                                <User size={24} className="text-indigo-600" />
                                                <span>Patient Information</span>
                                            </h2>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <Calendar size={16} />
                                                <span>{new Date(prescription.submittedDateTime).toLocaleDateString()}</span>
                                                <Clock size={16} className="ml-3" />
                                                <span>{new Date(prescription.submittedDateTime).toLocaleTimeString()}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-6 mb-6">
                                            <div className="bg-indigo-50 rounded-lg p-4">
                                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">User ID</p>
                                                <p className="text-lg font-bold text-indigo-900">{prescription.userId}</p>
                                            </div>
                                            <div className="bg-indigo-50 rounded-lg p-4">
                                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Patient Name</p>
                                                <p className="text-lg font-bold text-indigo-900">{prescription.patientName}</p>
                                            </div>
                                            <div className="bg-indigo-50 rounded-lg p-4">
                                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Age</p>
                                                <p className="text-lg font-bold text-indigo-900">{prescription.age} years</p>
                                            </div>
                                            <div className="bg-indigo-50 rounded-lg p-4">
                                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Gender</p>
                                                <p className="text-lg font-bold text-indigo-900">{prescription.gender}</p>
                                            </div>
                                        </div>

                                        {/* VITAL SIGNS */}
                                        {/* <div className="border-t border-gray-200 pt-4">
                                            <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                                                <Activity size={20} className="text-indigo-600" />
                                                <span>Vital Signs</span>
                                            </h3>
                                            <div className="grid grid-cols-4 gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500">Blood Pressure</p>
                                                    <p className="text-md font-semibold text-gray-800">{prescription.vitalSigns.bloodPressure}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Heart Rate</p>
                                                    <p className="text-md font-semibold text-gray-800">{prescription.vitalSigns.heartRate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Temperature</p>
                                                    <p className="text-md font-semibold text-gray-800">{prescription.vitalSigns.temperature}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">O2 Saturation</p>
                                                    <p className="text-md font-semibold text-gray-800">{prescription.vitalSigns.oxygenSaturation}</p>
                                                </div>
                                            </div>
                                        </div> */}
                                    {/* </section>  */}

                                    {/* ILLNESS DESCRIPTION */}
                                    {/* <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                                        <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center space-x-2">
                                            <AlertCircle size={24} className="text-indigo-600" />
                                            <span>Illness Description</span>
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            {prescription.illnessDescription}
                                        </p>

                                        <div className="border-t border-gray-200 pt-4">
                                            <h3 className="text-md font-semibold text-gray-700 mb-3">Reported Symptoms</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {prescription.symptoms.map((symptom, index) => (
                                                    <span key={index} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                                        {symptom}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </section> */}

                                    {/* PRESCRIPTION SECTION */}
                                    {/* <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-xl font-bold text-indigo-900 flex items-center space-x-2">
                                                <Pill size={24} className="text-indigo-600" />
                                                <span>Prescription</span>
                                            </h2>
                                            {!isEditing && (
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                                >
                                                    <Edit3 size={18} />
                                                    <span>Edit Prescription</span>
                                                </button>
                                            )}
                                        </div>

                                        {isEditing ? (
                                            <div>
                                                <textarea
                                                    className="w-full border-2 border-indigo-200 rounded-lg p-4 text-gray-700 font-mono text-sm leading-relaxed focus:outline-none focus:border-indigo-500 min-h-64"
                                                    value={editedText}
                                                    onChange={(e) => setEditedText(e.target.value)}
                                                />
                                                <div className="flex items-center space-x-3 mt-4">
                                                    <button
                                                        onClick={() => {
                                                            handleSave(prescription._id, editedText);
                                                            setIsEditing(false);
                                                        }}
                                                        className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                                    >
                                                        <Save size={18} />
                                                        <span>Save Changes</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsEditing(false);
                                                            setEditedText(prescription.llmPrescription);
                                                        }}
                                                        className="flex items-center space-x-2 bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                                    >
                                                        <span>Cancel</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 rounded-lg p-6 border-2 border-indigo-100">
                                                <pre className="text-gray-700 font-sans text-sm leading-relaxed whitespace-pre-wrap">
                                                    {prescription.llmPrescription}
                                                </pre>
                                            </div>
                                        )}
                                    </section> */}

                                    {/* PHARMACIST NOTES */}
                                    {/* <section className="bg-white rounded-lg shadow-md p-6">
                                        <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center space-x-2">
                                            <FileCheck size={24} className="text-indigo-600" />
                                            <span>Pharmacist's Notes</span>
                                        </h2>
                                        <textarea
                                            className="w-full border-2 border-gray-200 rounded-lg p-4 text-gray-700 text-sm leading-relaxed focus:outline-none focus:border-indigo-500 min-h-32"
                                            placeholder="Add notes for this prescription..."
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                        />
                                        <button
                                            onClick={() => handleSaveNotes(prescription._id, notes)}
                                            className="mt-3 flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            <CheckCircle size={18} />
                                            <span>Save Notes</span>
                                        </button>
                                    </section>
                                </div> */}
                            {/* );
                        })}
                    </div> */} 
                </main>
            </div>

            {/* Success / Error Alert */}
            <Alert
                message={alertMessage}
                type={type}
                isVisible={showAlert}
                onClose={() => setShowAlert(false)}
                duration={3000}
            />
        </>
    );
};

export default PrescriptionPage;
