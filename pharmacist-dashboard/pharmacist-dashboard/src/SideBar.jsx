import { ClipboardList, FileCheck, FileClock, FileX, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate=useNavigate();
    const handlePrescriptionsClick = () => {
        navigate('/prescriptions');
    }
    return (
        <aside className="w-72 bg-indigo-900 text-white p-8 flex flex-col">
            <div className="flex items-center mb-12 space-x-3">
                <ClipboardList size={32} />
                <h2 className="text-2xl font-semibold tracking-wide">Pharmacy Dashboard</h2>
            </div>
            <nav className="space-y-6 flex flex-col text-lg">
                <button className="flex items-center space-x-3 hover:text-indigo-300 transition-colors duration-200" onClick={handlePrescriptionsClick}>
                    <FileClock size={20} />
                    <span>Prescriptions</span>
                </button>
                <button className="flex items-center space-x-3 hover:text-indigo-300 transition-colors duration-200">
                    <FileCheck size={20} />
                    <span>Reports</span>
                </button>
                <button className="flex items-center space-x-3 hover:text-indigo-300 transition-colors duration-200">
                    <FileX size={20} />
                    <span>Settings</span>
                </button>
            </nav>
            <div className="mt-auto pt-6 border-t border-indigo-700 flex items-center space-x-3 text-sm font-medium">
                <User size={20} />
                <span>Dr. John Peter</span>
            </div>
        </aside>)
}
export default SideBar;