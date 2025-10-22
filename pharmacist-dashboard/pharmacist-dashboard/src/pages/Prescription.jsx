import { useState } from 'react';
import {
    ArrowLeft,
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
                    <div className="mb-2">
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
