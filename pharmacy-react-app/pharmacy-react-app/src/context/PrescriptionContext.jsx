import React, { createContext, useContext, useState, useEffect } from "react";

const PrescriptionHistoryContext = createContext();

export const usePrescriptionHistory = () => {
  const context = useContext(PrescriptionHistoryContext);
  if (!context) {
    throw new Error(
      "usePrescriptionHistory must be used within a PrescriptionHistoryProvider"
    );
  }
  return context;
};

export const PrescriptionHistoryProvider = ({ children }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock prescription history — replace this with API call
  useEffect(() => {
    const mockPrescriptions = [
      {
        _id: "RX001",
        userId: "P001",
        illnessDescription: "Common Cold",
        llmPrescription:
          "Take paracetamol 500mg twice daily for 3 days. Drink plenty of fluids and rest.",
        submittedDateTime: "2024-09-20T10:00:00Z",
        status: "Reviewed",
      },
      {
        _id: "RX002",
        userId: "P001",
        illnessDescription: "Seasonal Allergies",
        llmPrescription:
          "Cetirizine 10mg once daily at night. Avoid known allergens.",
        submittedDateTime: "2024-11-05T08:30:00Z",
        status: "New",
      },
      {
        _id: "RX003",
        userId: "P001",
        illnessDescription: "Mild Headache",
        llmPrescription:
          "Ibuprofen 200mg as needed every 6 hours. Do not exceed 1200mg per day.",
        submittedDateTime: "2025-01-15T14:45:00Z",
        status: "Dispensed",
      },
    ];

    // Simulate network delay
    setTimeout(() => {
      setPrescriptions(mockPrescriptions);
      setLoading(false);
    }, 1000);
  }, []);

  // Update a specific prescription
  const updatePrescription = (id, updatedFields) => {
    setPrescriptions((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, ...updatedFields } : p
      )
    );
  };

  // Add a new prescription to history
  const addPrescription = (newPrescription) => {
    setPrescriptions((prev) => [...prev, newPrescription]);
  };

  // Remove a prescription
  const removePrescription = (id) => {
    setPrescriptions((prev) => prev.filter((p) => p._id !== id));
  };

  const value = {
    prescriptions,
    loading,
    updatePrescription,
    addPrescription,
    removePrescription,
  };

  return (
    <PrescriptionHistoryContext.Provider value={value}>
      {children}
    </PrescriptionHistoryContext.Provider>
  );
};

export default PrescriptionHistoryContext;
