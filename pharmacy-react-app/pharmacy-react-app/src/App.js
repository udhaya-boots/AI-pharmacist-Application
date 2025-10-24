import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Home";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { Box } from "@mui/material";
import PrescriptionHistory from "./components/PrescriptionHistory";
import { PrescriptionHistoryProvider } from "./context/PrescriptionContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PrescriptionHistoryProvider>
          <UserProvider>
            <Box sx={{ minHeight: "60vh", bgcolor: "#F3E9D2" }}>
              <Routes>
                {/* Redirect root to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes */}
                <Route path="/home" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />
                <Route path="/history" element={
                  <ProtectedRoute>
                    <PrescriptionHistory />
                  </ProtectedRoute>
                } />
              </Routes>
            </Box>
          </UserProvider>
        </PrescriptionHistoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
