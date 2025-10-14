import React, { useState, useEffect } from "react";
import { TextField, Button, Snackbar, Alert, Box, Typography, Paper } from "@mui/material";

function App() {
  const [symptoms, setSymptoms] = useState("");
  const [submitMsg, setSubmitMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState(false);
  const [prescription, setPrescription] = useState(null);
  const [error, setError] = useState(null);
  const [prescriptionId, setPrescriptionId] = useState(null);

  // Submit handler
  const handleSubmit = async () => {
    if (!symptoms.trim()) {
      setError("Please enter your symptoms");
      return;
    }
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/generate-prescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });
      if (!response.ok) throw new Error("Prescription generation failed");
      const data = await response.json();
      setNotificationMsg(true); // Show notification popup
      setPrescriptionId(data._id); // Save ID for polling (assuming API returns an ID)
      setSymptoms(""); // Clear form
    } catch (e) {
      setError(e.message || "Error submitting symptoms");
    }
  };

  useEffect(() => {
  if (!prescriptionId) return;

  const maxPollingTime = 120000; // 2 minutes in milliseconds
  const intervalTime = 30000; // 30 seconds
  let elapsedTime = 0;

  const interval = setInterval(async () => {
    try {
      const checkResponse = await fetch(`http://127.0.0.1:5000/check-prescription?id=${prescriptionId}`);
      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        if (checkData.prescription) {
          setPrescription(checkData.prescription);
          clearInterval(interval); // Stop polling on success
        }
      }
    } catch (error) {
      // Optional: Handle fetch error
    }

    elapsedTime += intervalTime;
    if (elapsedTime >= maxPollingTime) {
      clearInterval(interval); // Stop polling after 2 minutes
    }
  }, intervalTime);

  return () => clearInterval(interval);
}, [prescriptionId]);


  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F3E9D2", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3 }}>
      <Paper elevation={10} sx={{ p: 4, width: 400, bgcolor: "#C7D3B0", borderRadius: 5, boxShadow: "0 0 20px #A7C4A0" }}>
        <Typography variant="h5" component="h1" sx={{ mb: 3, textAlign: "center" }}>Hello Peter</Typography>
        <TextField
          label="Tell me how are you feeling today"
          multiline
          fullWidth
          minRows={3}
          value={symptoms}
          onChange={e => setSymptoms(e.target.value)}
          sx={{ bgcolor: "#E9F1DD", borderRadius: 2 }}
        />
        <Button variant="contained" sx={{ mt: 2, bgcolor: "#A7C4A0", fontWeight: "bold" }} onClick={handleSubmit}>Submit</Button>
        {error && <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>{error}</Alert>}
      </Paper>
      <Snackbar open={notificationMsg} autoHideDuration={12000} onClose={() => setNotificationMsg(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="info" sx={{ width: "100%" }}>You will be notified when the prescription is ready</Alert>
      </Snackbar>
      <Snackbar open={!!prescription} autoHideDuration={8000} onClose={() => setPrescription(null)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success" sx={{ width: "100%" }}>{prescription}</Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
