import { useState } from 'react';
import {
    
    FileCheck,
    FileClock,
    FileX,
    User,
} from "lucide-react";
import useHandleOperations from './hooks/useHandleOperations';
import SideBar from './SideBar';

const Home = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [llmPrescriptionText, setLlmPrescriptionText] = useState("");
    const { handleEdit, handleSave, handleStatusChange, summary } = useHandleOperations(
        prescriptions,
        setPrescriptions,
        setEditingId,
        llmPrescriptionText,
        setLlmPrescriptionText
    );

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <main className="flex-1 p-10 max-w-full overflow-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-indigo-900">
                        Prescriptions Overview
                    </h1>
                    <p className="text-indigo-700 mt-1 text-sm">
                        Manage and review patient prescriptions efficiently.
                    </p>
                </header>

                {/* Summary Cards */}
                <section className="grid grid-cols-3 gap-8 mb-10">
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-5">
                        <FileClock className="text-indigo-500" size={36} />
                        <div>
                            <h3 className="text-gray-400 uppercase tracking-wide font-semibold">New</h3>
                            <p className="text-3xl font-bold">{summary.new}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-5">
                        <FileCheck className="text-green-500" size={36} />
                        <div>
                            <h3 className="text-gray-400 uppercase tracking-wide font-semibold">Reviewed</h3>
                            <p className="text-3xl font-bold">{summary.reviewed}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-5">
                        <FileX className="text-red-500" size={36} />
                        <div>
                            <h3 className="text-gray-400 uppercase tracking-wide font-semibold">Closed</h3>
                            <p className="text-3xl font-bold">{summary.closed}</p>
                        </div>
                    </div>
                </section>

                {/* Prescriptions Table */}
                <section className="bg-white rounded-lg shadow-md p-6 overflow-auto max-w-full">
                    <table className="w-full table-auto border-collapse border border-gray-200 text-left text-sm">
                        <thead className="bg-indigo-100 text-indigo-900 uppercase text-xs font-semibold">
                            <tr>
                                <th className="py-3 px-4 border border-indigo-200">User ID</th>
                                <th className="py-3 px-4 border border-indigo-200">Illness Description</th>
                                <th className="py-3 px-4 border border-indigo-200 max-w-xs">Prescription</th>
                                <th className="py-3 px-4 border border-indigo-200 max-w-xs">Submitted Time</th>
                                <th className="py-3 px-4 border border-indigo-200">Status</th>
                                <th className="py-3 px-4 border border-indigo-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.map((p, index) => (
                                <tr
                                    key={p._id}
                                    className={index % 2 === 0 ? "bg-white" : "bg-indigo-50"}
                                >
                                    <td className="py-3 px-4 border border-indigo-200">{p.userId}</td>
                                    <td className="py-3 px-4 border border-indigo-200 max-w-xs">{p.illnessDescription}</td>
                                    <td className="py-3 px-4 border border-indigo-200 max-w-xs break-words whitespace-normal">
                                        {editingId === p._id ? (
                                            <textarea
                                                className="w-full rounded border border-gray-300 p-2 text-sm"
                                                rows={3}
                                                value={llmPrescriptionText}
                                                onChange={(e) => setLlmPrescriptionText(e.target.value)}
                                            />
                                        ) : (
                                            p.llmPrescription
                                        )}
                                    </td>
                                    <td className="py-3 px-4 border border-indigo-200 max-w-xs">
                                        {new Date(p.submittedDateTime).toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 border border-indigo-200">
                                        <select
                                            className="border rounded px-2 py-1 text-sm"
                                            value={p.status}
                                            onChange={(e) => handleStatusChange(p._id, e.target.value)}
                                        >
                                            <option value="new">New</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </td>
                                    <td className="py-3 px-4 border border-indigo-200 space-x-3">
                                        {editingId === p._id ? (
                                            <>
                                                <button
                                                    className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
                                                    onClick={() => handleSave(p._id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="bg-gray-300 text-gray-800 rounded px-3 py-1 text-sm hover:bg-gray-400 transition"
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setLlmPrescriptionText("");
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="bg-indigo-600 text-white rounded px-4 py-1 text-sm hover:bg-indigo-700 transition"
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
                </section>
            </main>
        </div>
    );
};

export default Home;