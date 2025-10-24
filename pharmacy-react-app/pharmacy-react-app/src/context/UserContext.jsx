import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const { user: authUser, updateUser: updateAuthUser, isAuthenticated } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sync user data with auth context
    useEffect(() => {
        if (isAuthenticated && authUser) {
            setUser(authUser);
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [authUser, isAuthenticated]);

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        
        // Also update the auth context
        if (updateAuthUser) {
            updateAuthUser(updatedData);
        }
    };

    const value = {
        user,
        setUser,
        updateUser,
        loading
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
