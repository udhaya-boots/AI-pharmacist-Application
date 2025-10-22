import { useEffect, useState } from "react";

const useGeneratePrescription = () => {
  const [symptoms, setSymptoms] = useState("");
  const [notificationMsg, setNotificationMsg] = useState(false);
  const [error, setError] = useState(null);
  const [prescriptionId, setPrescriptionId] = useState(null);
  const [prescription, setPrescription] = useState(null);

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
      setNotificationMsg(true);
      setPrescriptionId(data._id);
      setSymptoms("");
    } catch (e) {
      setError(e.message || "Error submitting symptoms");
    }
  };

  // Polling effect (must be outside handleSubmit)
  useEffect(() => {
    if (!prescriptionId) return;

    const maxPollingTime = 120000; // 2 minutes
    const intervalTime = 30000; // 30 seconds
    let elapsedTime = 0;

    const interval = setInterval(async () => {
      try {
        const checkResponse = await fetch(
          `http://127.0.0.1:5000/check-prescription?id=${prescriptionId}`
        );

        if (checkResponse.ok) {
          const checkData = await checkResponse.json();
          if (checkData.prescription) {
            setPrescription(checkData.prescription);
            clearInterval(interval);
          }
        }
      } catch (error) {
        // Optional: handle error
        console.error("Error checking prescription:", error);
      }

      elapsedTime += intervalTime;
      if (elapsedTime >= maxPollingTime) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [prescriptionId]);

  return {
    symptoms,
    setSymptoms,
    notificationMsg,
    error,
    prescription,
    handleSubmit,
    setPrescription
  };
};

export default useGeneratePrescription;
