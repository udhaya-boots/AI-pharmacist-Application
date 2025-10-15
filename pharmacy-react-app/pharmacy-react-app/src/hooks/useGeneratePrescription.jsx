import { useEffect,useState } from "react";

// Submit handler
export const handleSubmit = async () => {
      const [symptoms, setSymptoms] = useState("");
      const [notificationMsg, setNotificationMsg] = useState(false);
        const [error, setError] = useState(null);
        const [prescriptionId, setPrescriptionId] = useState(null);
      
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
      setNotificationMsg(true); // Show notification popup
      setPrescriptionId(data._id); // Save ID for polling (assuming API returns an ID)
      setSymptoms(""); // Clear form
    } catch (e) {
      setError(e.message || "Error submitting symptoms");
    }
    useEffect(() => {
    if (!prescriptionId) return;
  
    const maxPollingTime = 120000; // 2 minutes in milliseconds
    const intervalTime = 30000; // 30 seconds
    let elapsedTime = 0;
  
    const interval = setInterval(async () => {
      try {
        const checkResponse = await fetch(`http://127.0.0.1:5000/check-prescription?id=${prescriptionId}`);
        if (checkResponse.ok) {
          const checkData = await checkResponse.json();
          if (checkData.prescription) {
            setPrescription(checkData.prescription);
            clearInterval(interval); // Stop polling on success
          }
        }
      } catch (error) {
        // Optional: Handle fetch error
      }
  
      elapsedTime += intervalTime;
      if (elapsedTime >= maxPollingTime) {
        clearInterval(interval); // Stop polling after 2 minutes
      }
    }, intervalTime);
  
    return () => clearInterval(interval);
  }, [prescriptionId]);
  };
  
  