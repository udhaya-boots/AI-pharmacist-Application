import prescriptionData from "../data/prescription";
import { useState } from "react";
import useHandleOperations from "../hooks/useHandleOperations";
export const PrescriptionTable=()=>{
     const [prescriptions, setPrescriptions] = useState(
    prescriptionData.prescriptions
  );
  const [editingId, setEditingId] = useState(null);
  const [llmPrescriptionText, setLlmPrescriptionText] = useState("");
  const { handleEdit, handleSave, handleStatusChange } = useHandleOperations(
    prescriptions,
    setPrescriptions,
    setEditingId,
    llmPrescriptionText,
    setLlmPrescriptionText
  );

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
              <th className="py-2 px-3 border border-indigo-200">Actions</th>
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
                  {p.illnessDescription}
                </td>
                <td className="py-2 px-3 border border-indigo-200 break-words max-w-[150px] sm:max-w-xs whitespace-normal">
                  {editingId === p._id ? (
                    <textarea
                      className="w-full rounded border border-gray-300 p-1 sm:p-2 text-xs sm:text-sm"
                      rows={3}
                      value={llmPrescriptionText}
                      onChange={(e) => setLlmPrescriptionText(e.target.value)}
                    />
                  ) : (
                    p.llmPrescription
                  )}
                </td>
                <td className="py-2 px-3 border border-indigo-200">
                  {new Date(p.submittedDateTime).toLocaleString()}
                </td>
                <td className="py-2 px-3 border border-indigo-200">
                  <select
                    className="border rounded px-2 py-1 text-xs sm:text-sm"
                    value={p.status}
                    onChange={(e) => handleStatusChange(p._id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="py-2 px-3 border border-indigo-200">
                  {editingId === p._id ? (
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="bg-green-600 text-white rounded px-3 py-1 text-xs hover:bg-green-700 transition"
                        onClick={() => handleSave(p._id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-300 text-gray-800 rounded px-3 py-1 text-xs hover:bg-gray-400 transition"
                        onClick={() => {
                          setEditingId(null);
                          setLlmPrescriptionText("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-indigo-600 text-white rounded px-3 py-1 text-xs hover:bg-indigo-700 transition"
                      onClick={() => handleEdit(p)}
                    >
                      Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
