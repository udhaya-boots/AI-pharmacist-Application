import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ClipboardList,
    Eye,
    EyeOff,
    Mail,
    Lock,
    User
} from 'lucide-react';

const PharmacistLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    // Sample credentials for testing
    const validCredentials = {
        'pharmacist@example.com': 'pharm123'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check credentials
            if (validCredentials[email] && validCredentials[email] === password) {
                // Login successful - save authentication state
                localStorage.setItem('pharmacistAuth', 'true');
                localStorage.setItem('pharmacistData', JSON.stringify({
                    id: 'PH001',
                    name: 'Dr. John Peter',
                    email: email,
                    phone: '+1 (555) 234-5678',
                    licenseNumber: 'PH-12345',
                    specialization: 'Clinical Pharmacy',
                    experience: '8 years',
                    department: 'General Medicine',
                    address: '456 Medical Center Drive, City, State 12345',
                    dateJoined: '2016-03-15',
                    lastActive: new Date().toISOString(),
                    certifications: ['PharmD', 'Clinical Pharmacy Specialist', 'Medication Therapy Management'],
                    languages: ['English', 'Spanish', 'French'],
                    workSchedule: 'Monday - Friday, 9:00 AM - 6:00 PM',
                    profilePicture: null,
                    role: 'pharmacist'
                }));
                
                navigate('/dashboard');
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Main Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <ClipboardList size={40} className="text-indigo-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pharmacist Login</h1>
                        <p className="text-gray-600">Welcome back! Please sign in to access your dashboard.</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={handleRegisterClick}
                                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                                >
                                    Register here
                                </button>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Sample Credentials Card */}
                <div className="mt-6 bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                    <h3 className="text-sm font-semibold text-indigo-800 mb-2">Test Credentials:</h3>
                    <div className="text-sm text-indigo-700">
                        <p><strong>Email:</strong> pharmacist@example.com</p>
                        <p><strong>Password:</strong> pharm123</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PharmacistLogin;
