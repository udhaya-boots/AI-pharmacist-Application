import { TextField, Button, Snackbar, Alert, Box, Typography, Paper } from "@mui/material";
import { useUser } from "./context/UserContext";
import useGeneratePrescription from "./hooks/useGeneratePrescription";

const Home = () => {
  const { user } = useUser();

  // ✅ Use your custom hook
  const {
    symptoms,
    setSymptoms,
    notificationMsg,
    error,
    prescription,
    handleSubmit,
  } = useGeneratePrescription();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        bgcolor: "#F3E9D2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: 400,
          bgcolor: "#C7D3B0",
          borderRadius: 5,
          boxShadow: "0 0 20px #A7C4A0",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Hello {user?.name || "Peter"}
        </Typography>

        <TextField
          label="Tell me how are you feeling today"
          multiline
          fullWidth
          minRows={3}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          sx={{ bgcolor: "#E9F1DD", borderRadius: 2 }}
        />

        <Button
          variant="contained"
          sx={{ mt: 2, bgcolor: "#A7C4A0", fontWeight: "bold" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      {/* Notification Snackbar */}
      <Snackbar
        open={notificationMsg}
        autoHideDuration={12000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          You will be notified when the prescription is ready
        </Alert>
      </Snackbar>

      {/* Prescription Snackbar */}
      <Snackbar
        open={!!prescription}
        autoHideDuration={8000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {typeof prescription === "string"
            ? prescription
            : "Prescription generated successfully!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
