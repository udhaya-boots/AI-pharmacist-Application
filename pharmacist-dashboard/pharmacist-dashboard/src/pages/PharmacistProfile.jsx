import React, { useState, useEffect } from 'react';
import { usePharmacist } from '../context/PharmacistContext';

const PharmacistProfile = () => {
    const { isAuthenticated } = useAuth();
    const { pharmacist, updatePharmacist } = usePharmacist();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        licenseNumber: '',
        specialization: '',
        experience: '',
        profilePicture: '',
        bio: ''
    });

    useEffect(() => {
        if (pharmacist) {
            setFormData({
                firstName: pharmacist.firstName || '',
                lastName: pharmacist.lastName || '',
                email: pharmacist.email || '',
                phone: pharmacist.phone || '',
                licenseNumber: pharmacist.licenseNumber || '',
                specialization: pharmacist.specialization || '',
                experience: pharmacist.experience || '',
                profilePicture: pharmacist.profilePicture || '',
                bio: pharmacist.bio || ''
            });
        }
    }, [pharmacist]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        updatePharmacist(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (pharmacist) {
            setFormData({
                firstName: pharmacist.firstName || '',
                lastName: pharmacist.lastName || '',
                email: pharmacist.email || '',
                phone: pharmacist.phone || '',
                licenseNumber: pharmacist.licenseNumber || '',
                specialization: pharmacist.specialization || '',
                experience: pharmacist.experience || '',
                profilePicture: pharmacist.profilePicture || '',
                bio: pharmacist.bio || ''
            });
        }
        setIsEditing(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Please log in to access your profile</h2>
                    <button 
                        onClick={() => window.location.href = '/login'}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {isAuthenticated && pharmacist ? (
                <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
                    {/* Back Button */}
                    <button 
                        onClick={() => window.history.back()}
                        className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-800">Pharmacist Profile</h1>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Profile Picture */}
                        <div className="flex items-center mb-6">
                            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mr-6">
                                {formData.profilePicture ? (
                                    <img 
                                        src={formData.profilePicture} 
                                        alt="Profile" 
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                ) : (
                                    <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {formData.firstName} {formData.lastName}
                                </h2>
                                <p className="text-gray-600">{formData.specialization}</p>
                                <p className="text-blue-600 font-medium">License: {formData.licenseNumber}</p>
                            </div>
                        </div>

                        {/* Profile Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.firstName || 'Not provided'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.lastName || 'Not provided'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.email || 'Not provided'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.phone || 'Not provided'}</p>
                                    )}
                                </div>
                            </div>

                            {/* Professional Information */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Professional Information</h3>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="licenseNumber"
                                            value={formData.licenseNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.licenseNumber || 'Not provided'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                    {isEditing ? (
                                        <select
                                            name="specialization"
                                            value={formData.specialization}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Specialization</option>
                                            <option value="Clinical Pharmacy">Clinical Pharmacy</option>
                                            <option value="Hospital Pharmacy">Hospital Pharmacy</option>
                                            <option value="Community Pharmacy">Community Pharmacy</option>
                                            <option value="Industrial Pharmacy">Industrial Pharmacy</option>
                                            <option value="Pharmaceutical Research">Pharmaceutical Research</option>
                                            <option value="Regulatory Affairs">Regulatory Affairs</option>
                                        </select>
                                    ) : (
                                        <p className="text-gray-900">{formData.specialization || 'Not provided'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            min="0"
                                            max="50"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.experience ? `${formData.experience} years` : 'Not provided'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
                                    {isEditing ? (
                                        <input
                                            type="url"
                                            name="profilePicture"
                                            value={formData.profilePicture}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/profile.jpg"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.profilePicture || 'Not provided'}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Biography</h3>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Tell us about yourself, your experience, and your approach to pharmacy..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-900 leading-relaxed">
                                    {formData.bio || 'No biography provided yet.'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold mb-4">Loading profile...</h2>
                    </div>
                </div>
            )}
        </>
    );
};

export default PharmacistProfile;