import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./Home";
import UserProfile from "./components/UserProfile";
import { Box } from "@mui/material";
import PrescriptionHistory from "./components/PrescriptionHistory";
import { PrescriptionHistoryProvider } from "./context/PrescriptionContext";

function App() {
  return (
    <BrowserRouter>
      <PrescriptionHistoryProvider>

        <UserProvider>
          <Box sx={{ minHeight: "60vh", bgcolor: "#F3E9D2" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/history" element={<PrescriptionHistory />} />

            </Routes>
          </Box>
        </UserProvider>
      </PrescriptionHistoryProvider>
    </BrowserRouter>
  );
}

export default App;
