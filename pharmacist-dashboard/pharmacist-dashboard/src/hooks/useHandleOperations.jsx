import { useMemo } from "react";

const useHandleOperations = (prescriptions, setPrescriptions, setEditingId, llmPrescriptionText, setLlmPrescriptionText) => {

  const handleEdit = (prescription) => {
    setEditingId(prescription._id);
    setLlmPrescriptionText(prescription.llmPrescription);
  };

  const handleSave = async (id) => {
    const prescriptionToSave = prescriptions.find((p) => p._id === id);
    if (!prescriptionToSave) return;

    const updatedPrescription = {
      ...prescriptionToSave,
      llmPrescription: llmPrescriptionText,
      status: "reviewed",
      submittedDateTime: prescriptionToSave.submittedDateTime,
    };

    try {
      const response = await fetch("http://localhost:5000/update-prescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPrescription),
      });

      if (!response.ok) throw new Error("Failed to save prescription");

      const resData = await response.json();
      const newId = resData.inserted_id || id;

      setPrescriptions(
        prescriptions.map((p) =>
          p._id === id ? { ...updatedPrescription, _id: newId } : p
        )
      );
      setEditingId(null);
      setLlmPrescriptionText("");
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert("Failed to save prescription.");
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setPrescriptions(
      prescriptions.map((p) =>
        p._id === id ? { ...p, status: newStatus } : p
      )
    );
  };

  const summary = useMemo(() => ({
    new: prescriptions.filter((p) => p.status === "open").length,
    reviewed: prescriptions.filter((p) => p.status === "reviewed").length,
    closed: prescriptions.filter((p) => p.status === "closed").length,
  }), [prescriptions]);

  return { handleEdit, handleSave, handleStatusChange, summary };
};

export default useHandleOperations;