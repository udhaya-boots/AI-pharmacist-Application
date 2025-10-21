import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./Home";
import UserProfile from "./components/UserProfile";
import { Box } from "@mui/material";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Box sx={{ minHeight: "60vh", bgcolor: "#F3E9D2" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
