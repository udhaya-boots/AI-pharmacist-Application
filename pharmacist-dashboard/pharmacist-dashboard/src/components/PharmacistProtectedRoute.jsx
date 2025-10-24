import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';

const PharmacistProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication status
        const checkAuth = () => {
            const authStatus = localStorage.getItem('pharmacistAuth');
            const pharmacistData = localStorage.getItem('pharmacistData');
            
            if (authStatus === 'true' && pharmacistData) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="animate-spin">
                            <ClipboardList size={48} className="text-indigo-600" />
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PharmacistProtectedRoute;
