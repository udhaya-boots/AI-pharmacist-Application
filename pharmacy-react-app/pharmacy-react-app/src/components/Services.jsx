import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

export const Services = ({ isMobile }) => {
  return (
    <>
      {/* Header Text */}
      <Typography
        variant={isMobile ? 'h4' : 'h3'}
        align="center"
        sx={{ mt: 2, color: '#223322', fontWeight: 600, letterSpacing: 0.2 }}
      >
        Book an appointment for an in-clinic consultation
      </Typography>

      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        align="center"
        sx={{ color: '#223322', fontWeight: 400, letterSpacing: 0.2, mb: 4 }}
      >
        Find experienced doctors across all specialities.
      </Typography>

      {/* Card Section */}
      <Box
        sx={{
          mt: 6,
          px: { xs: 2, sm: 4, md: 8 },
          minWidth: '100%',
          minHeight: '40vh',
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {/* Dentist */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <CardMedia
                sx={{ height: { xs: 160, sm: 200 } }}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xpJvboXsSpc1diJXN_7-CKlCPR3GxlPQ2g&s"
                title="Dentist"
              />
              <CardContent>
                <Typography variant="h6" component="div" fontWeight={700}>
                  Dentist
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Schedule a dental checkup
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Gynecologist */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <CardMedia
                sx={{ height: { xs: 160, sm: 200 } }}
                image="https://images.pexels.com/photos/7089018/pexels-photo-7089018.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                title="Gynecologist/Obstetrician"
              />
              <CardContent>
                <Typography variant="h6" component="div" fontWeight={700}>
                  Gynecologist/Obstetrician
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Explore for women's health, pregnancy, and infertility treatments.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Dietician */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <CardMedia
                sx={{ height: { xs: 160, sm: 200 } }}
                image="https://www.shutterstock.com/image-photo/health-beauty-professional-dietician-doctor-600nw-2574231063.jpg"
                title="Dietician/Nutrition"
              />
              <CardContent>
                <Typography variant="h6" component="div" fontWeight={700}>
                  Dietician/Nutrition
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Get guidance on eating, weight, and sports nutrition.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* General Surgeon */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <CardMedia
                sx={{ height: { xs: 160, sm: 200 } }}
                image="https://img.freepik.com/free-photo/surgeon-team-uniform-performs-operation-patient-cardiac-surgery-clinic-modern-medicine-professional-team-surgeons-health_657921-62.jpg?semt=ais_hybrid&w=740&q=80"
                title="General Surgeon"
              />
              <CardContent>
                <Typography variant="h6" component="div" fontWeight={700}>
                  General Surgeon
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Need to get operated? Find the right surgeon.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
