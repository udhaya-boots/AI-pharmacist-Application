import * as React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import {
    Schedule as FileClock,
    CheckCircle as FileCheck,
    Cancel as FileX,
} from '@mui/icons-material';

export const Services = () => {
    // You could later map over a list of cards for scalability
    return (
        <Box sx={{ mt: 10, minWidth: '90vw', minHeight: '40vh' }}>
            <Grid container spacing={3}>

                {/* --- New --- */}
                <Grid item xs={12} sm={4} lg={3}>
                    <Card sx={{  maxWidth: '20vw',minHeight:'40vh' }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image="https://img.freepik.com/free-photo/doctor-offering-medical-teleconsultation_23-2149329013.jpg?semt=ais_hybrid&w=740&q=80"
                            title="New Requests"
                        />
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                <FileClock sx={{ fontSize: 36, color: '#6366f1' }} />
                                <Typography variant="h5" component="div" fontWeight={700}>
                                    Video Consultation
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Connect within 60 seconds
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" >View</Button>
                            <Button size="small">Details</Button>
                        </CardActions>
                    </Card>
                </Grid>

                {/* --- Reviewed --- */}
                <Grid item xs={12} sm={4} lg={3}>
                    <Card sx={{  maxWidth: '20vw',minHeight:'40vh' }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image="https://images.pexels.com/photos/9629677/pexels-photo-9629677.jpeg?cs=srgb&dl=pexels-ivan-samkov-9629677.jpg&fm=jpg"
                            title="New Requests"
                        />
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                <FileClock sx={{ fontSize: 36, color: '#6366f1' }} />
                                <Typography variant="h5" component="div" fontWeight={700}>
                                    Lab Tests
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                               Safe and trusted lab sets 
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" >View</Button>
                            <Button size="small">Details</Button>
                        </CardActions>
                    </Card>
                </Grid>

                {/* --- Closed --- */}
                <Grid item xs={12} sm={4} lg={3}>
                    <Card sx={{  maxWidth: '20vw',minHeight:'40vh' }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image="https://img.freepik.com/free-photo/doctor-offering-medical-teleconsultation_23-2149329013.jpg?semt=ais_hybrid&w=740&q=80"
                            title="New Requests"
                        />
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                <FileClock sx={{ fontSize: 36, color: '#6366f1' }} />
                                <Typography variant="h5" component="div" fontWeight={700}>
                                    Surgeries
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              Safe and Trusted surgery centers 
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" >View</Button>
                            <Button size="small">Details</Button>
                        </CardActions>
                    </Card>
                </Grid>

            </Grid>
        </Box>
    );
};
