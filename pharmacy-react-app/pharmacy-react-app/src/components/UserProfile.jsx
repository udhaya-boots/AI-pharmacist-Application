import React, { useState, useEffect } from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Avatar, 
    Box, 
    Chip, 
    Grid, 
    Paper,
    IconButton,
    Button
} from '@mui/material';
import { 
    Edit as EditIcon, 
    Email as EmailIcon, 
    Phone as PhoneIcon, 
    LocationOn as LocationIcon,
    CalendarToday as CalendarIcon,
    Person as PersonIcon,
    LocalHospital as MedicalIcon
} from '@mui/icons-material';
import { useUser } from '../context/UserContext';

const UserProfile = ({ onEdit }) => {
    // Mock user data - replace with actual user data from context/props

    const {user,setUser}=useUser();
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            {/* Header Card */}
            <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#C7D3B0', borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                        sx={{ 
                            width: 80, 
                            height: 80, 
                            mr: 3, 
                            bgcolor: '#A7C4A0',
                            fontSize: '2rem'
                        }}
                    >
                        {user.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                            {user.name}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: '#1B5E20', mt: 1 }}>
                            Patient ID: {user.id}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#388E3C', mt: 0.5 }}>
                            Age: {calculateAge(user.dateOfBirth)} years • {user.gender}
                        </Typography>
                    </Box>
                    <IconButton 
                        onClick={onEdit}
                        sx={{ 
                            bgcolor: '#A7C4A0', 
                            color: 'white',
                            '&:hover': { bgcolor: '#8BC34A' }
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </Box>
            </Paper>

            {/* Contact Information */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#2E7D32', fontWeight: 'bold' }}>
                    Contact Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EmailIcon sx={{ color: '#4CAF50', mr: 2 }} />
                            <Box>
                                <Typography variant="body2" color="textSecondary">Email</Typography>
                                <Typography variant="body1">{user.email}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PhoneIcon sx={{ color: '#4CAF50', mr: 2 }} />
                            <Box>
                                <Typography variant="body2" color="textSecondary">Phone</Typography>
                                <Typography variant="body1">{user.phone}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                            <LocationIcon sx={{ color: '#4CAF50', mr: 2, mt: 0.5 }} />
                            <Box>
                                <Typography variant="body2" color="textSecondary">Address</Typography>
                                <Typography variant="body1">{user.address}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* Medical Information */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#2E7D32', fontWeight: 'bold' }}>
                    Medical Information
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                Blood Type
                            </Typography>
                            <Chip 
                                label={user.bloodType} 
                                color="error" 
                                variant="outlined"
                                sx={{ fontWeight: 'bold' }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                Date of Birth
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarIcon sx={{ color: '#4CAF50', mr: 1, fontSize: 'small' }} />
                                <Typography variant="body1">
                                    {new Date(user.dateOfBirth).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            Allergies
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {user.allergies.map((allergy, index) => (
                                <Chip 
                                    key={index}
                                    label={allergy}
                                    color="warning"
                                    size="small"
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            Chronic Conditions
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {user.chronicConditions.map((condition, index) => (
                                <Chip 
                                    key={index}
                                    label={condition}
                                    color="info"
                                    size="small"
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* Emergency Contact */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#2E7D32', fontWeight: 'bold' }}>
                    Emergency Contact
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ color: '#4CAF50', mr: 2 }} />
                    <Typography variant="body1">{user.emergencyContact}</Typography>
                </Box>
            </Paper>

            {/* Recent Activity */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#2E7D32', fontWeight: 'bold' }}>
                    Recent Activity
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MedicalIcon sx={{ color: '#4CAF50', mr: 2 }} />
                    <Box>
                        <Typography variant="body2" color="textSecondary">Last Consultation</Typography>
                        <Typography variant="body1">
                            {new Date(user.lastVisit).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ mt: 2 }}
                    onClick={() => window.location.href = '/'}
                >
                    View Prescription History
                </Button>
            </Paper>
        </Box>
    );
};

export default UserProfile;
