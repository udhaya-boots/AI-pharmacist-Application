import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    bgcolor: '#f6f6daff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                }}
            >
                <CircularProgress size={60} sx={{ color: '#4CAF50', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#2E7D32' }}>
                    Loading...
                </Typography>
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
