import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    Award,
    Edit3,
    Save,
    X,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/SuccessAlert';
import Home from '../Home';

const PharmacistProfile = ({ loggedIn, setloggedIn }) => {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const [pharmacistData, setPharmacistData] = useState({
        id: 'PH001',
        name: 'Dr. John Peter',
        email: 'john.peter@pharmacy.com',
        phone: '+1 (555) 234-5678',
        licenseNumber: 'PH-12345',
        specialization: 'Clinical Pharmacy',
        experience: '8 years',
        department: 'General Medicine',
        address: '456 Medical Center Drive, City, State 12345',
        dateJoined: '2016-03-15',
        lastActive: new Date().toISOString(),
        certifications: ['PharmD', 'Clinical Pharmacy Specialist', 'Medication Therapy Management'],
        languages: ['English', 'Spanish', 'French'],
        workSchedule: 'Monday - Friday, 9:00 AM - 6:00 PM',
    });

    const [editData, setEditData] = useState({ ...pharmacistData });
    const [alertMessage, setAlertMessage] = useState('');
    const [type, setType] = useState('success');
    const [showAlert, setShowAlert] = useState(false);
    console.log(showAlert);
    
    const handleEdit = () => {
        setIsEditing(true);
        setEditData({ ...pharmacistData });
    };

    const handleSave = () => {
        setType('success');
        setAlertMessage('Profile updated successfully!');
        setShowAlert(true);
        setPharmacistData({ ...editData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({ ...pharmacistData });
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <>
            {loggedIn ? (
                <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
                    {/* Back Button */}
                    <button
                        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800  transition-colors"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium">Go Home</span>
                    </button>

                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <div className="flex flex-wrap items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {pharmacistData.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="border rounded px-3 py-1 text-2xl"
                                            />
                                        ) : (
                                            pharmacistData.name
                                        )}
                                    </h1>
                                    <p className="text-indigo-600 font-semibold text-lg">
                                        {pharmacistData.specialization}
                                    </p>
                                    <p className="text-gray-600">
                                        License: {pharmacistData.licenseNumber}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2 mt-4 sm:mt-0">
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        <Edit3 size={18} />
                                        <span>Edit Profile</span>
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <Save size={18} />
                                            <span>Save</span>
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            <X size={18} />
                                            <span>Cancel</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Contact Info */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                <User size={24} className="text-indigo-600" />
                                <span>Contact Information</span>
                            </h2>
                            <div className="space-y-4">
                                {/* Email */}
                                <div className="flex items-center space-x-3">
                                    <Mail size={20} className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={editData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            <p className="font-semibold">{pharmacistData.email}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center space-x-3">
                                    <Phone size={20} className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={editData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            <p className="font-semibold">{pharmacistData.phone}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start space-x-3">
                                    <MapPin size={20} className="text-gray-500 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        {isEditing ? (
                                            <textarea
                                                value={editData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                className="border rounded px-2 py-1 w-full"
                                                rows={2}
                                            />
                                        ) : (
                                            <p className="font-semibold">{pharmacistData.address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Info */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                <Shield size={24} className="text-indigo-600" />
                                <span>Professional Information</span>
                            </h2>
                            <div className="space-y-3">
                                <p><span className="text-sm text-gray-500">Department:</span> <span className="font-semibold">{pharmacistData.department}</span></p>
                                <p><span className="text-sm text-gray-500">Experience:</span> <span className="font-semibold">{pharmacistData.experience}</span></p>
                                <p><span className="text-sm text-gray-500">Work Schedule:</span> <span className="font-semibold">{pharmacistData.workSchedule}</span></p>
                                <div className="flex items-center space-x-3">
                                    <Calendar size={20} className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Date Joined</p>
                                        <p className="font-semibold">
                                            {new Date(pharmacistData.dateJoined).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                            <Award size={24} className="text-indigo-600" />
                            <span>Certifications</span>
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {pharmacistData.certifications.map((cert, index) => (
                                <span
                                    key={index}
                                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {cert}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Languages</h2>
                        <div className="flex flex-wrap gap-2">
                            {pharmacistData.languages.map((lang, index) => (
                                <span
                                    key={index}
                                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Activity Status */}
                    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Activity Status</h2>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-green-600 font-semibold">Active</span>
                            <span className="text-gray-500">
                                • Last active: {new Date(pharmacistData.lastActive).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Success Alert */}
                    <Alert
                        message={alertMessage}
                        type={type}
                        isVisible={showAlert}
                        onClose={() => setShowAlert(false)}
                        duration={3000}
                    />
                </div>
            ) : (
                <>

                    <Alert
                        message="You must be logged in to view your profile."
                        type="warning"
                        isVisible={showAlert}
                        onClose={() => setShowAlert(false)}
                        duration={2000}
                    />
                    <Home loggedIn={loggedIn} setloggedIn={setloggedIn} />
                </>
            )}
        </>
    );
};

export default PharmacistProfile;
