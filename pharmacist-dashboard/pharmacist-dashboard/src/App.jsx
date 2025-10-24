import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import PrescriptionPage from "./pages/Prescription";
import SideBar from "./components/SideBar";
import { PharmacistProvider } from "./context/PharmacistContext";
import { useState } from "react";
import PharmacistProfile from "./pages/PharmacistProfile";
import PharmacistLogin from "./components/PharmacistLogin";
import PharmacistRegister from "./components/PharmacistRegister";
import PharmacistProtectedRoute from "./components/PharmacistProtectedRoute";

function App() {
  const [loggedIn, setloggedIn] = useState(true);

  return (
    <BrowserRouter>
      <PharmacistProvider>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Public routes */}
          <Route path="/login" element={<PharmacistLogin />} />
          <Route path="/register" element={<PharmacistRegister />} />
          
          {/* Protected routes with layout */}
          <Route path="/dashboard" element={
            <PharmacistProtectedRoute>
              <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
                <SideBar loggedIn={loggedIn} />
                <main className="flex-1">
                  <Home loggedIn={loggedIn} setloggedIn={setloggedIn} />
                </main>
              </div>
            </PharmacistProtectedRoute>
          } />
          
          <Route path="/prescriptions" element={
            <PharmacistProtectedRoute>
              <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
                <SideBar loggedIn={loggedIn} />
                <main className="flex-1">
                  <PrescriptionPage />
                </main>
              </div>
            </PharmacistProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <PharmacistProtectedRoute>
              <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
                <SideBar loggedIn={loggedIn} />
                <main className="flex-1">
                  <PharmacistProfile loggedIn={loggedIn} />
                </main>
              </div>
            </PharmacistProtectedRoute>
          } />
        </Routes>
      </PharmacistProvider>
    </BrowserRouter>
  );
}

export default App;
