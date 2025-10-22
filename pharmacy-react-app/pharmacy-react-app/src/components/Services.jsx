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
import { useState } from "react";



export const LatestPrescriptions = ({ isMobile }) => {
  const { prescriptions, loading } = usePrescriptionHistory();
  // Get the latest 4 prescriptions sorted by submission date
  const latestPrescriptions = [...prescriptions]
    .sort(
      (a, b) =>
        new Date(b.submittedDateTime) - new Date(a.submittedDateTime)
    )
    .slice(0, 4);
    const [expandedRows, setExpandedRows] = useState({});
    const toggleExpand = (id) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const truncateText = (text, limit = 120) => {
        if (text.length <= limit) return text;
        return text.slice(0, limit) + "...";
    };
  return (
    <>
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
          mt: 4,
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
                    <Typography
                      variant="h6"
                      component="div"
                      fontWeight={700}
                      noWrap
                    >
                      {rx.patientName}
                    </Typography>
                  </Box>

                  {/* <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 1 }}
                    noWrap
                  >
                    {rx.illnessDescription}
                  </Typography> */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >

                    {expandedRows[rx._id]
                      ? rx.illnessDescription
                      : truncateText(rx.illnessDescription, 90)}
                    {rx.illnessDescription.length > 90 && (
                      <Button
                        className="text-indigo-500 text-xs ml-1 hover:underline"
                        onClick={() => toggleExpand(rx._id)}
                      >
                        {expandedRows[rx._id] ? "Show Less" : "Show More"}
                      </Button>
                    )}
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
                          ? "info"
                          : rx.status.toUpperCase() === "REVIEWED"
                            ? "success"
                            : "error"
                      }
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>


              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default LatestPrescriptions;
