export const prescriptionData = {
  prescriptions: [
    {
      _id: "RX001",
      userId: "U001",
      patientName: "Sarah Johnson",
      age: 34,
      gender: "Female",
      illnessDescription: "Patient presents with persistent dry cough for 5 days, mild fever (99.5°F), fatigue, and slight chest discomfort. No shortness of breath. Patient reports recent exposure to cold weather.",
      symptoms: [
        "Persistent cough",
        "Mild fever",
        "Fatigue",
        "Chest discomfort"
      ],
      vitalSigns: {
        bloodPressure: "120/80",
        heartRate: "78 bpm",
        temperature: "99.5°F",
        oxygenSaturation: "98%"
      },
      llmPrescription: "1. Amoxicillin 500mg - Take 1 capsule three times daily (every 8 hours) for 7 days\n2. Dextromethorphan 15mg - Take 1 tablet every 6 hours as needed for cough\n3. Acetaminophen 500mg - Take 1-2 tablets every 6 hours as needed for fever\n4. Vitamin C 500mg - Take 1 tablet daily\n\nInstructions:\n- Complete the full course of antibiotics\n- Rest and stay hydrated (8-10 glasses of water daily)\n- Avoid cold exposure\n- Return if symptoms worsen or persist beyond 5 days",
      submittedDateTime: "2025-10-16T09:30:00.000Z",
      status: "new",
      notes: ""
    },
    {
      _id: "RX002",
      userId: "U002",
      patientName: "Michael Chen",
      age: 45,
      gender: "Male",
      illnessDescription: "Patient complains of severe migraine headaches occurring 3-4 times per week for the past month. Associated with nausea and sensitivity to light. Pain intensity 8/10. No history of head trauma.",
      symptoms: [
        "Severe headache",
        "Nausea",
        "Photophobia",
        "Throbbing pain"
      ],
      vitalSigns: {
        bloodPressure: "135/85",
        heartRate: "82 bpm",
        temperature: "98.6°F",
        oxygenSaturation: "99%"
      },
      llmPrescription: "1. Sumatriptan 50mg - Take 1 tablet at onset of migraine, may repeat once after 2 hours if needed\n2. Metoclopramide 10mg - Take 1 tablet for nausea as needed\n3. Propranolol 40mg - Take 1 tablet twice daily for prevention\n\nInstructions:\n- Maintain a headache diary\n- Identify and avoid triggers (stress, certain foods, lack of sleep)\n- Stay hydrated\n- Follow up in 2 weeks to assess medication effectiveness\n- Seek immediate care if experiencing worst headache of life or neurological symptoms",
      submittedDateTime: "2025-10-15T14:15:00.000Z",
      status: "reviewed",
      notes: "Patient has been educated about migraine triggers. Scheduled follow-up appointment."
    },
    {
      _id: "RX003",
      userId: "U003",
      patientName: "Emma Williams",
      age: 28,
      gender: "Female",
      illnessDescription: "Patient presents with allergic rhinitis symptoms including sneezing, runny nose, itchy eyes, and nasal congestion for the past week. Symptoms worse in the morning. Recent exposure to pollen.",
      symptoms: [
        "Sneezing",
        "Runny nose",
        "Itchy eyes",
        "Nasal congestion"
      ],
      vitalSigns: {
        bloodPressure: "118/75",
        heartRate: "72 bpm",
        temperature: "98.4°F",
        oxygenSaturation: "99%"
      },
      llmPrescription: "1. Cetirizine 10mg - Take 1 tablet daily in the evening\n2. Fluticasone nasal spray - 2 sprays in each nostril once daily\n3. Artificial tears - Use as needed for eye irritation\n\nInstructions:\n- Take antihistamine consistently, not just when symptoms occur\n- Keep windows closed during high pollen days\n- Shower before bedtime to remove pollen\n- Consider using air purifier\n- Return if symptoms persist beyond 2 weeks",
      submittedDateTime: "2025-10-14T11:45:00.000Z",
      status: "closed",
      notes: "Treatment completed successfully. Patient reports significant improvement."
    },
    {
      _id: "RX004",
      userId: "U004",
      patientName: "Robert Martinez",
      age: 52,
      gender: "Male",
      illnessDescription: "Patient with type 2 diabetes presents for routine medication refill. Blood glucose levels have been stable. Reports good compliance with diet and exercise regimen. Last HbA1c was 6.8%.",
      symptoms: [
        "Type 2 Diabetes (controlled)",
        "Mild fatigue"
      ],
      vitalSigns: {
        bloodPressure: "128/82",
        heartRate: "76 bpm",
        temperature: "98.6°F",
        oxygenSaturation: "98%"
      },
      llmPrescription: "1. Metformin 1000mg - Take 1 tablet twice daily with meals\n2. Glipizide 5mg - Take 1 tablet once daily before breakfast\n3. Atorvastatin 20mg - Take 1 tablet once daily at bedtime\n\nInstructions:\n- Continue monitoring blood glucose daily (fasting and post-prandial)\n- Maintain current diet and exercise plan\n- Schedule HbA1c test in 3 months\n- Watch for signs of hypoglycemia\n- Annual eye and foot examination recommended",
      submittedDateTime: "2025-10-13T10:20:00.000Z",
      status: "reviewed",
      notes: "Routine refill. Patient doing well on current regimen."
    },
    {
      _id: "RX005",
      userId: "U005",
      patientName: "Lisa Anderson",
      age: 31,
      gender: "Female",
      illnessDescription: "Patient presents with acute bronchitis. Productive cough with yellowish sputum for 4 days, chest tightness, and shortness of breath on exertion. Low-grade fever. Recent upper respiratory infection.",
      symptoms: [
        "Productive cough",
        "Chest tightness",
        "Shortness of breath",
        "Low-grade fever",
        "Wheezing"
      ],
      vitalSigns: {
        bloodPressure: "122/78",
        heartRate: "84 bpm",
        temperature: "100.2°F",
        oxygenSaturation: "96%"
      },
      llmPrescription: "1. Azithromycin 500mg - Take 1 tablet daily for 5 days\n2. Albuterol inhaler - 2 puffs every 4-6 hours as needed for wheezing\n3. Guaifenesin 400mg - Take 1 tablet every 4 hours to help with mucus\n4. Ibuprofen 400mg - Take 1 tablet every 6 hours as needed for pain/fever\n\nInstructions:\n- Rest and increase fluid intake\n- Use humidifier at night\n- Avoid smoking and secondhand smoke\n- Return if fever persists beyond 3 days or breathing worsens\n- Complete full antibiotic course",
      submittedDateTime: "2025-10-12T16:00:00.000Z",
      status: "new",
      notes: ""
    },
    {
      _id: "RX006",
      userId: "U006",
      patientName: "David Thompson",
      age: 67,
      gender: "Male",
      illnessDescription: "Patient with hypertension and mild osteoarthritis in knees. Blood pressure has been elevated at home readings (145/92 average). Experiencing increased joint pain with weather changes.",
      symptoms: [
        "Elevated blood pressure",
        "Knee pain",
        "Morning stiffness",
        "Limited mobility"
      ],
      vitalSigns: {
        bloodPressure: "148/94",
        heartRate: "70 bpm",
        temperature: "98.6°F",
        oxygenSaturation: "98%"
      },
      llmPrescription: "1. Lisinopril 20mg - Take 1 tablet once daily in the morning\n2. Amlodipine 5mg - Take 1 tablet once daily\n3. Meloxicam 15mg - Take 1 tablet once daily with food\n4. Glucosamine/Chondroitin 1500/1200mg - Take daily for joint support\n\nInstructions:\n- Monitor blood pressure daily and keep log\n- Reduce sodium intake (less than 2000mg/day)\n- Gentle exercise: swimming or water aerobics recommended\n- Apply heat to joints before activity\n- Follow up in 2 weeks to reassess blood pressure\n- Consider physical therapy for knee pain",
      submittedDateTime: "2025-10-11T13:30:00.000Z",
      status: "reviewed",
      notes: "Adjusted antihypertensive medication. Patient counseled on lifestyle modifications."
    }
  ]
};

export default prescriptionData;