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
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status and load pharmacist data
    useEffect(() => {
        const loadPharmacistData = () => {
            const authStatus = localStorage.getItem('pharmacistAuth');
            const savedPharmacistData = localStorage.getItem('pharmacistData');
            
            if (authStatus === 'true' && savedPharmacistData) {
                try {
                    const parsedData = JSON.parse(savedPharmacistData);
                    setPharmacist(parsedData);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Error parsing pharmacist data:', error);
                    // Clear corrupted data
                    localStorage.removeItem('pharmacistAuth');
                    localStorage.removeItem('pharmacistData');
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        loadPharmacistData();
    }, []);

    const updatePharmacist = (updatedData) => {
        const updatedPharmacist = { ...pharmacist, ...updatedData };
        setPharmacist(updatedPharmacist);
        
        // Update localStorage
        localStorage.setItem('pharmacistData', JSON.stringify(updatedPharmacist));
    };

    const logout = () => {
        setPharmacist(null);
        setIsAuthenticated(false);
        
        // Clear localStorage
        localStorage.removeItem('pharmacistAuth');
        localStorage.removeItem('pharmacistData');
    };

    const value = {
        pharmacist,
        setPharmacist,
        updatePharmacist,
        logout,
        loading,
        isAuthenticated
    };

    return (
        <PharmacistContext.Provider value={value}>
            {children}
        </PharmacistContext.Provider>
    );
};

export default PharmacistContext;
