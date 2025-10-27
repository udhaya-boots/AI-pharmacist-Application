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
    IconButton,
    MenuItem
} from '@mui/material';
import { 
    Person as PersonIcon,
    Email as EmailIcon, 
    Lock as LockIcon,
    Phone as PhoneIcon,
    Visibility,
    VisibilityOff,
    CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        bloodType: '',
        address: '',
        emergencyContact: '',
        allergies: '',
        chronicConditions: '',
        lastVisit: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate();

    // Get today's date in YYYY-MM-DD format for date restrictions
    const today = new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.dateOfBirth || 
            !formData.gender || !formData.bloodType || !formData.address || 
            !formData.emergencyContact || !formData.password || !formData.confirmPassword) {
            return 'All required fields must be filled';
        }
        
        if (formData.password !== formData.confirmPassword) {
            return 'Passwords do not match';
        }
        
        if (formData.password.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return 'Please enter a valid email address';
        }
        
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate successful registration
            setSuccess(true);
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    if (success) {
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
                        bgcolor: 'white',
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                            color: '#4CAF50',
                            fontWeight: 'bold'
                        }}
                    >
                        Registration Successful!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 2,
                            color: '#666'
                        }}
                    >
                        Your account has been created successfully. You will be redirected to the login page shortly.
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#999'
                        }}
                    >
                        Please log in to access your account.
                    </Typography>
                </Paper>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: '#f6f6daff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                px: 4,
                py: 4
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: '1200px',
                    borderRadius: 3,
                    bgcolor: 'white'
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        mb: 2,
                        color: '#2E7D32',
                        fontWeight: 'bold'
                    }}
                >
                    Patient Registration
                </Typography>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        mb: 4,
                        color: '#666'
                    }}
                >
                    Create your account to access our pharmacy services.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                            gap: '32px',
                            mb: 4
                        }}
                    >
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
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
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarIcon color="action" />
                                </InputAdornment>
                            ),
                            inputProps: {
                                max: today
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        select
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        select
                        label="Blood Type"
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>
                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>
                        <MenuItem value="AB+">AB+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        multiline
                        rows={2}
                        placeholder="123 Main Street, City, State ZIP"
                    />

                    <TextField
                        fullWidth
                        label="Emergency Contact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        required
                        placeholder="Contact Name - Phone Number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        placeholder="e.g., Penicillin, Peanuts (separate with commas)"
                        helperText="List any known allergies separated by commas. Leave blank if none."
                    />

                    <TextField
                        fullWidth
                        label="Chronic Conditions"
                        name="chronicConditions"
                        value={formData.chronicConditions}
                        onChange={handleChange}
                        placeholder="e.g., Hypertension, Diabetes (separate with commas)"
                        helperText="List any chronic medical conditions separated by commas. Leave blank if none."
                    />

                    <TextField
                        fullWidth
                        label="Last Visit"
                        name="lastVisit"
                        type="date"
                        value={formData.lastVisit}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarIcon color="action" />
                                </InputAdornment>
                            ),
                            inputProps: {
                                max: today
                            }
                        }}
                        helperText="Date of your last medical visit (optional)"
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        required
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

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                mb: 2,
                                py: 1.5,
                                px: 8,
                                bgcolor: '#4CAF50',
                                '&:hover': {
                                    bgcolor: '#45a049'
                                }
                            }}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>

                        <Typography variant="body2" color="textSecondary">
                            Already have an account?{' '}
                            <Link
                                component="button"
                                type="button"
                                onClick={handleLoginClick}
                                sx={{
                                    color: '#4CAF50',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Sign in here
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Register;
