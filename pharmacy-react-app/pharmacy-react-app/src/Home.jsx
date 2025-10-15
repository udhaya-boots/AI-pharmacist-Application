// import React from 'react';
import { TextField, Button, Snackbar, Alert, Box, Typography, Paper } from "@mui/material";
import { handleSubmit } from "./hooks/useGeneratePrescription";
import { useState } from "react";
const Home = () => {
      const [symptoms, setSymptoms] = useState("");
    const [error, setError] = useState(null);
    const [notificationMsg, setNotificationMsg] = useState(false);
    const [prescription, setPrescription] = useState(null);
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

    )
}
export default Home;