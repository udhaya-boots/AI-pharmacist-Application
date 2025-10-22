import prescriptionData from "../data/prescription";
import { useState } from "react";
import useHandleOperations from "../hooks/useHandleOperations";
export const PrescriptionTable = () => {
    const [prescriptions, setPrescriptions] = useState(
        prescriptionData.prescriptions
    );
    const [editingId, setEditingId] = useState(null);
    const [expandedRows, setExpandedRows] = useState({});
    const [llmPrescriptionText, setLlmPrescriptionText] = useState("");
    const { handleEdit, handleSave, handleStatusChange } = useHandleOperations(
        prescriptions,
        setPrescriptions,
        setEditingId,
        llmPrescriptionText,
        setLlmPrescriptionText
    );
    const toggleExpand = (id) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const truncateText = (text, limit = 120) => {
        if (text.length <= limit) return text;
        return text.slice(0, limit) + "...";
    };

    //   const handleEdit = (p) => {
    //     setEditingId(p._id);
    //     setLlmPrescriptionText(p.llmPrescription);
    //   };

    //   const handleSave = (id) => {
    //     const updatedPrescriptions = prescriptions.map((p) =>
    //       p._id === id ? { ...p, llmPrescription: llmPrescriptionText } : p
    //     );
    //     setPrescriptions(updatedPrescriptions);
    //     setEditingId(null);
    //     setLlmPrescriptionText("");
    //   };

    //   const handleStatusChange = (id, newStatus) => {
    //     const updatedPrescriptions = prescriptions.map((p) =>
    //       p._id === id ? { ...p, status: newStatus } : p
    //     );
    //     setPrescriptions(updatedPrescriptions);
    //   };

    return (
        <section className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border border-gray-200">
                    <thead className="bg-indigo-100 text-indigo-900 uppercase font-semibold">
                        <tr>
                            <th className="py-2 px-3 border border-indigo-200">User ID</th>
                            <th className="py-2 px-3 border border-indigo-200">Illness</th>
                            <th className="py-2 px-3 border border-indigo-200 max-w-[150px] sm:max-w-xs">
                                Prescription
                            </th>
                            <th className="py-2 px-3 border border-indigo-200">Time</th>
                            <th className="py-2 px-3 border border-indigo-200">Status</th>
                            {/* <th className="py-2 px-3 border border-indigo-200">Resource</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {prescriptions.map((p, index) => (
                            <tr
                                key={p._id}
                                className={`${index % 2 === 0 ? "bg-white" : "bg-indigo-50"}`}
                            >
                                <td className="py-2 px-3 border border-indigo-200">{p.userId}</td>
                                <td className="py-2 px-3 border border-indigo-200 break-words">
                                    {expandedRows[p._id]
                                        ? p.illnessDescription
                                        : truncateText(p.illnessDescription, 90)}
                                    {p.illnessDescription.length > 90 && (
                                        <button
                                            className="text-indigo-500 text-xs ml-1 hover:underline"
                                            onClick={() => toggleExpand(p._id)}
                                        >
                                            {expandedRows[p._id] ? "Show Less" : "Show More"}
                                        </button>
                                    )}
                                </td>
                                <td className="py-2 px-3 border border-indigo-200 break-words">
                                    {expandedRows[p._id]
                                        ? p.llmPrescription
                                        : truncateText(p.llmPrescription, 100)}
                                    {p.llmPrescription.length > 100 && (
                                        <button
                                            className="text-indigo-500 text-xs ml-1 hover:underline"
                                            onClick={() => toggleExpand(p._id)}
                                        >
                                            {expandedRows[p._id] ? "Show Less" : "Show More"}
                                        </button>
                                    )}
                                </td>
                                <td className="py-2 px-3 border border-indigo-200">
                                    {new Date(p.submittedDateTime).toLocaleString()}
                                </td>
                                <td className="py-2 px-3 border border-indigo-200">

                                    <p>
                                        <span
                                            className={`text-sm ${p.status.toUpperCase() === "NEW"
                                                    ? "text-blue-500"
                                                    : p.status.toUpperCase() === "REVIEWED"
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }`}
                                        >
                                            {p.status.toUpperCase()}
                                        </span>
                                    </p>

                                </td>
 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
