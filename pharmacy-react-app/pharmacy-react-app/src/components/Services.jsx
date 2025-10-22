import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Button,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { usePrescriptionHistory } from "../context/PrescriptionContext";



export const LatestPrescriptions = ({ isMobile }) => {
   const { prescriptions, loading } = usePrescriptionHistory();
  // Get the latest 4 prescriptions sorted by submission date
  const latestPrescriptions = [...prescriptions]
    .sort(
      (a, b) =>
        new Date(b.submittedDateTime) - new Date(a.submittedDateTime)
    )
    .slice(0, 4);

  return (
    <>
      {/* Header */}
      <Typography
        variant={isMobile ? "h4" : "h3"}
        align="center"
        sx={{ mt: 2, color: "#223322", fontWeight: 600, letterSpacing: 0.2 }}
      >
        Latest Prescriptions
      </Typography>

      <Typography
        variant={isMobile ? "h6" : "h5"}
        align="center"
        sx={{
          color: "#223322",
          fontWeight: 400,
          letterSpacing: 0.2,
          mb: 4,
        }}
      >
        Review the most recent prescriptions issued by your doctors.
      </Typography>

      {/* Cards Grid */}
      <Box
        sx={{
          mt: 6,
          px: { xs: 2, sm: 4, md: 8 },
          minWidth: "100%",
          minHeight: "40vh",
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {latestPrescriptions.map((rx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={rx._id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <DescriptionIcon sx={{ color: "#388E3C" }} />
                    <Typography
                      variant="h6"
                      component="div"
                      fontWeight={700}
                      noWrap
                    >
                      {rx.patientName}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 1 }}
                    noWrap
                  >
                    {rx.illnessDescription}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <CalendarTodayIcon
                      sx={{ fontSize: 16, color: "#4CAF50" }}
                    />
                    <Typography variant="caption">
                      {new Date(rx.submittedDateTime).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <AssignmentTurnedInIcon
                      sx={{ fontSize: 16, color: "#81C784" }}
                    />
                    <Chip
                      label={rx.status.toUpperCase()}
                      color={
                        rx.status.toUpperCase() === "NEW"
                          ? "warning"
                          : rx.status.toUpperCase() === "REVIEWED"
                          ? "error"
                          : "success"
                      }
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: 2,
                    }}
                    onClick={() => alert(`Viewing ${rx.patientName}'s prescription`)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default LatestPrescriptions;
