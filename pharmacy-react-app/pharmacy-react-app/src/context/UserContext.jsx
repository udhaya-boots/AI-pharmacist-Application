import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock user data - replace with actual authentication logic
    useEffect(() => {
        // Simulate loading user data
        const mockUser = {
            id: 'P001',
            name: 'Peter Johnson',
            email: 'peter.johnson@email.com',
            phone: '+1 (555) 123-4567',
            dateOfBirth: '1990-05-15',
            gender: 'Male',
            bloodType: 'O+',
            address: '123 Main Street, City, State 12345',
            emergencyContact: 'Jane Johnson - +1 (555) 987-6543',
            allergies: ['Penicillin', 'Peanuts'],
            chronicConditions: ['Hypertension'],
            lastVisit: '2024-10-10',
            profilePicture: null,
            role: 'patient'
        };

        setTimeout(() => {
            setUser(mockUser);
            setLoading(false);
        }, 1000);
    }, []);

    const updateUser = (updatedData) => {
        setUser(prevUser => ({ ...prevUser, ...updatedData }));
    };

    const logout = () => {
        setUser(null);
        // Add logout logic here (clear tokens, redirect, etc.)
    };

    const value = {
        user,
        setUser,
        updateUser,
        logout,
        loading
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
