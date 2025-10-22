import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PrescriptionPage from "./pages/Prescription";
import SideBar from "./components/SideBar";
import { PharmacistProvider } from "./context/PharmacistContext";
import { useState } from "react";
import PharmacistProfile from "./pages/PharmacistProfile";

function App() {
  const [loggedIn, setloggedIn] = useState(true);

  return (
    <BrowserRouter>
      <PharmacistProvider>
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
          <SideBar loggedIn={loggedIn} />
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={<Home loggedIn={loggedIn} setloggedIn={setloggedIn} />}
              />
              <Route path="/prescriptions" element={<PrescriptionPage />} />
              <Route
                path="/profile"
                element={<PharmacistProfile loggedIn={loggedIn} />}
              />
            </Routes>
          </main>
        </div>
      </PharmacistProvider>
    </BrowserRouter>
  );
}

export default App;
