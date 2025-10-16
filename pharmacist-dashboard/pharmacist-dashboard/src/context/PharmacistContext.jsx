import React, { createContext, useContext, useState, useEffect } from 'react';

const PharmacistContext = createContext();

export const usePharmacist = () => {
    const context = useContext(PharmacistContext);
    if (!context) {
        throw new Error('usePharmacist must be used within a PharmacistProvider');
    }
    return context;
};

export const PharmacistProvider = ({ children }) => {
    const [pharmacist, setPharmacist] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock pharmacist data - replace with actual authentication logic
    useEffect(() => {
        // Simulate loading pharmacist data
        const mockPharmacist = {
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
            profilePicture: null,
            role: 'pharmacist'
        };

        setTimeout(() => {
            setPharmacist(mockPharmacist);
            setLoading(false);
        }, 1000);
    }, []);

    const updatePharmacist = (updatedData) => {
        setPharmacist(prevPharmacist => ({ ...prevPharmacist, ...updatedData }));
    };

    const logout = () => {
        setPharmacist(null);
        // Add logout logic here (clear tokens, redirect, etc.)
    };

    const value = {
        pharmacist,
        setPharmacist,
        updatePharmacist,
        logout,
        loading
    };

    return (
        <PharmacistContext.Provider value={value}>
            {children}
        </PharmacistContext.Provider>
    );
};

export default PharmacistContext;
