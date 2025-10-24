import { useState } from 'react';
import {
  FileCheck,
  FileClock,
  FileX,
  LogOut,
} from "lucide-react";
import useHandleOperations from './hooks/useHandleOperations';
import { usePharmacist } from './context/PharmacistContext';
import { PrescriptionTable } from './components/PrescriptionTable';

const Home = ({ loggedIn, setloggedIn }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { logout, isAuthenticated } = usePharmacist();
  const [llmPrescriptionText, setLlmPrescriptionText] = useState("");
  const {  summary } = useHandleOperations(
    prescriptions,
    setPrescriptions,
    setEditingId,
    llmPrescriptionText,
    setLlmPrescriptionText
  );

  const handleLogout = () => {
    logout();
    // Redirect will be handled by the protected route
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 w-full min-h-screen bg-gray-50 overflow-x-auto">
      {/* Header */}
      <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-900">
            Prescriptions Overview
          </h1>
          <p className="text-indigo-700 text-sm sm:text-base mt-1">
            Manage and review patient prescriptions efficiently.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-1 text-sm sm:text-base text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
        >
          <LogOut size={18} />
          <span>{isAuthenticated ? 'Logout' : 'Sign Up'}</span>
        </button>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
          <FileClock className="text-indigo-500 flex-shrink-0" size={32} />
          <div>
            <h3 className="text-gray-400 uppercase text-xs font-semibold">New</h3>
            <p className="text-2xl font-bold">{summary.new}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
          <FileCheck className="text-green-500 flex-shrink-0" size={32} />
          <div>
            <h3 className="text-gray-400 uppercase text-xs font-semibold">Reviewed</h3>
            <p className="text-2xl font-bold">{summary.reviewed}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
          <FileX className="text-red-500 flex-shrink-0" size={32} />
          <div>
            <h3 className="text-gray-400 uppercase text-xs font-semibold">Closed</h3>
            <p className="text-2xl font-bold">{summary.closed}</p>
          </div>
        </div>
      </section>

      {/* Prescriptions Table */}
      {/* <section className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border border-gray-200">
            <thead className="bg-indigo-100 text-indigo-900 uppercase font-semibold">
              <tr>
                <th className="py-2 px-3 border border-indigo-200">User ID</th>
                <th className="py-2 px-3 border border-indigo-200">Illness</th>
                <th className="py-2 px-3 border border-indigo-200 max-w-[150px] sm:max-w-xs">Prescription</th>
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
                  <td className="py-2 px-3 border border-indigo-200 break-words">{p.illnessDescription}</td>
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
      </section> */}
      <PrescriptionTable/>
    </div>
  );
};

export default Home;
