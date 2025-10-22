import { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Grid,
    Chip,
    Collapse,
    IconButton,
    Divider,
    Button,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    LocalPharmacy as PharmacyIcon,
    CalendarToday as CalendarIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Description as DescriptionIcon,
    AssignmentTurnedIn as StatusIcon,
    PictureAsPdf as PdfIcon,
    ArrowLeft,
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { usePrescriptionHistory } from "../context/PrescriptionContext";
import { API_BASE_URL } from "../services/userProfileAPI";


const PrescriptionHistory = () => {
    const { prescriptions, loading } = usePrescriptionHistory();
    const [expandedId, setExpandedId] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const handleToggleExpand = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };
    // const [expandedRows, setExpandedRows] = useState({});
    // const toggleExpand = (id) => {
    //     setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    // };
    // const truncateText = (text, limit = 120) => {
    //     if (text.length <= limit) return text;
    //     return text.slice(0, limit) + "...";
    // };
    // const handleDownloadPDF = async (prescriptionId) => {
    //     try {
    //         setDownloading(true);

    //         const response = await fetch(
    //             `https://${API_BASE_URL}/api/prescriptions/pdf/${prescriptionId}`,
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/pdf",
    //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                 },
    //             }
    //         );

    //         if (!response.ok) {
    //             throw new Error("Failed to fetch PDF");
    //         }

    //         // Convert response to Blob and trigger download
    //         const blob = await response.blob();
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = `prescription_${prescriptionId}.pdf`;
    //         document.body.appendChild(a);
    //         a.click();
    //         a.remove();
    //         window.URL.revokeObjectURL(url);
    //     } catch (error) {
    //         console.error("Error downloading PDF:", error);
    //         alert("Failed to download PDF. Please try again later.");
    //     } finally {
    //         setDownloading(false);
    //     }
    // };
    const navigate = useNavigate();
    if (loading) {
        return (
            <Typography align="center" sx={{ mt: 4, color: "gray" }}>
                Loading prescription history...
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                px: { xs: 2, sm: 4 },
                py: { xs: 3, sm: 4 },
                bgcolor: "#f6f6daff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    mb: 3,
                    gap: 2,

                }}
            >
                <Typography
                    variant={isMobile ? "h4" : "h3"}
                    sx={{
                        fontWeight: "bold",
                        color: "#223322",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <PharmacyIcon sx={{ color: "#223322", fontSize: 50 }} />
                    Prescription History
                </Typography>
                <Button
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800  transition-colors"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Go Home</span>
                </Button>
            </Box>

            {/* List of prescriptions */}
            {prescriptions.length === 0 ? (
                <Paper
                    elevation={2}
                    sx={{
                        p: 4,
                        textAlign: "center",
                        color: "gray",
                        borderRadius: 3,
                        bgcolor: "#f5f5f5",
                        width: "100%",
                        maxWidth: 800,
                    }}
                >
                    <Typography variant="body1">No prescription history found.</Typography>
                </Paper>
            ) : (
                <Grid container spacing={3} sx={{ width: "100%", maxWidth: 900 }}>
                    {prescriptions.map((p) => {
                        const isExpanded = expandedId === p._id;

                        return (
                            <Grid item xs={12} key={p._id}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        bgcolor: "#FFFFFF",
                                        borderLeft: `6px solid ${p.status.toUpperCase() === "NEW"
                                            ? "#0077ffff"
                                            : p.status.toUpperCase() === "REVIEWED"
                                                ? "#4CAF50"
                                                : "#ab1414ff"
                                            }`,
                                        transition: "transform 0.3s",
                                        "&:hover": { transform: "scale(1.03)" },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Box>

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
                                                <DescriptionIcon sx={{ color: "black" }} />
{/* 
                                                {expandedRows[p._id]
                                                    ? p.illnessDescription
                                                    : truncateText(p.illnessDescription, 90)}
                                                {p.illnessDescription.length > 90 && (
                                                    <Button
                                                        className="text-indigo-500 text-xs ml-1 hover:underline"
                                                        onClick={() => toggleExpand(p._id)}
                                                    >
                                                        {expandedRows[p._id] ? "Show Less" : "Show More"}
                                                    </Button>
                                                )} */}
                                                {p.symptoms}
                                            </Typography>

                                            <Box sx={{ display: "flex", alignItems: "center", mt: 1, }}>
                                                <CalendarIcon
                                                />
                                                <Typography variant="body2" sx={{ mx: 1 }}
                                                    color="textPrimary">
                                                    {new Date(p.submittedDateTime).toLocaleDateString()}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: "flex", alignItems: "center", mt: 1, }}>
                                                <StatusIcon
                                                    sx={{ color: "black", fontSize: "1rem", mr: 1 }}
                                                />
                                                <Chip
                                                    label={p.status.toUpperCase()}
                                                    color={
                                                        p.status.toUpperCase() === "NEW"
                                                            ? "info"
                                                            : p.status.toUpperCase() === "REVIEWED"
                                                                ? "success"
                                                                : "error"
                                                    }
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Box>
                                        </Box>
                                        {/* <span>

                                            <Button
                                                variant="contained"
                                                color="success"
                                                startIcon={<PdfIcon />}
                                                // onClick={() => handleDownloadPDF(p._id)}
                                                disabled={downloading}
                                                sx={{ textTransform: "none", fontWeight: "bold" }}
                                            >
                                                {downloading ? "Downloading..." : "Download PDF"}
                                            </Button>
                                            </span> */}
                                        {/* <IconButton onClick={() => handleToggleExpand(p._id)}>
                                            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </IconButton> */}
                                    </Box>

                                    <Divider sx={{ my: 2 }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            whiteSpace: "pre-wrap",
                                            lineHeight: 1.6,
                                            color: "black",
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                whiteSpace: "pre-wrap",
                                                lineHeight: 1.6,
                                                color: "black",
                                                fontSize: "1.34rem",
                                            }}><b>Prescription Details:</b></Typography>
                                        {p.llmPrescription}
                                    </Typography>
                                    {/* <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                    </Collapse> */}
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Box>
    );
};

export default PrescriptionHistory;