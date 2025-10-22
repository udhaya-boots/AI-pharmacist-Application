import {
    ClipboardList,
    FileCheck,
    FileClock,
    User,
    Settings,
    LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePharmacist } from "../context/PharmacistContext";

const SideBar = ({ loggedIn }) => {
    const navigate = useNavigate();
    const { pharmacist, logout } = usePharmacist();

    
    const handlePrescriptionsClick = () => {
        navigate('/prescriptions');
    };
    
    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <>
            <aside className="w-72 bg-indigo-900 text-white p-8 flex flex-col">
                <div className="flex items-center mb-12 space-x-3">
                    <ClipboardList size={32} />
                    <h2 className="text-2xl font-semibold tracking-wide">Pharmacy Dashboard</h2>
                </div>

                <nav className="space-y-6 flex flex-col text-lg flex-1">
                    <button
                        className="flex items-center space-x-3 hover:text-indigo-300 transition-colors duration-200 text-left"
                        onClick={handlePrescriptionsClick}
                    >
                        <FileClock size={20} />
                        <span>Prescriptions</span>
                    </button>

                    <button
                        className="flex items-center space-x-3 hover:text-indigo-300 transition-colors duration-200 text-left"
                        onClick={handleProfileClick}
                    >
                        <User size={20} />
                        <span>Profile</span>
                    </button>

                    <button className="flex items-center space-x-3 hover:text-indigo-300 transition-colors duration-200 text-left">
                        <FileCheck size={20} />
                        <span>Reports</span>
                    </button>

                    <button className="flex items-center space-x-3 hover:text-indigo-300 transition-colors duration-200 text-left">
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                </nav>

                {/* User Info Section */}
                {loggedIn && (<div className="mt-auto pt-6 border-t border-indigo-700">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {pharmacist?.name
                                ? pharmacist.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                : 'XO'}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">
                                {pharmacist?.name || 'Dr. John Peter'}
                            </p>
                            <p className="text-xs text-indigo-300">
                                {pharmacist?.specialization || 'Clinical Pharmacy'}
                            </p>
                        </div>
                    </div>
                </div>
                )}

            </aside>
        </>

    );
};

export default SideBar;