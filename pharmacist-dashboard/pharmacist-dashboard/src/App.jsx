import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PharmacistProvider } from "./context/PharmacistContext";
import Home from "./Home";
import PharmacistProfile from "./components/PharmacistProfile";
import SideBar from "./SideBar";

function App() {
  return (
    <PharmacistProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
          <SideBar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<PharmacistProfile />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </PharmacistProvider>
  );
}

export default App;