import React, { useState } from 'react';
import { 
    Box, 
    Paper, 
    TextField, 
    Button, 
    Typography, 
    Alert,
    Link,
    InputAdornment,
    IconButton
} from '@mui/material';
import { 
    Email as EmailIcon, 
    Lock as LockIcon,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    // Sample credentials for testing
    const validCredentials = {
        'user@example.com': 'user123'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check credentials
            if (validCredentials[email] && validCredentials[email] === password) {
                // Login successful
                const userData = {
                    id: 'P001',
                    name: 'Peter Johnson',
                    email: email,
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
                
                login(userData);
                navigate('/home');
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

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
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    maxWidth: 400,
                    width: '100%',
                    borderRadius: 3,
                    bgcolor: 'white'
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        mb: 3,
                        color: '#2E7D32',
                        fontWeight: 'bold'
                    }}
                >
                    Patient Login
                </Typography>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        mb: 3,
                        color: '#666'
                    }}
                >
                    Welcome back! Please sign in to access your account.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{ mb: 3 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                            mb: 2,
                            py: 1.5,
                            bgcolor: '#4CAF50',
                            '&:hover': {
                                bgcolor: '#45a049'
                            }
                        }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                            Don't have an account?{' '}
                            <Link
                                component="button"
                                type="button"
                                onClick={handleRegisterClick}
                                sx={{
                                    color: '#4CAF50',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Register here
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            {/* Sample Credentials Info */}
            <Paper
                elevation={2}
                sx={{
                    mt: 3,
                    p: 2,
                    maxWidth: 400,
                    width: '100%',
                    bgcolor: '#E8F5E8',
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" sx={{ mb: 1, color: '#2E7D32', fontSize: '0.9rem' }}>
                    Test Credentials:
                </Typography>
                <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                    Email: user@example.com<br />
                    Password: user123
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
