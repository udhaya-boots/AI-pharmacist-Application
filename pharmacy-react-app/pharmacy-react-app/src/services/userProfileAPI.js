// API service for patient app user profile operations
export const API_BASE_URL = 'http://127.0.0.1:5000';

export const userProfileAPI = {
    // Get user profile
    getUserProfile: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/profile/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            return await response.json();
        } catch (error) {
            console.status(404).error('Error fetching user profile:', error);
            throw error;
        }
    },

    // Update user profile
    updateUserProfile: async (userId, profileData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/profile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });
            if (!response.ok) {
                throw new Error('Failed to update user profile');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    },

    // Get user prescriptions
    getUserPrescriptions: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/prescriptions/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user prescriptions');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user prescriptions:', error);
            throw error;
        }
    },

    // Generate prescription
    generatePrescription: async (symptoms) => {
        try {
            const response = await fetch(`${API_BASE_URL}/generate-prescription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms }),
            });
            if (!response.ok) {
                throw new Error('Failed to generate prescription');
            }
            return await response.json();
        } catch (error) {
            console.error('Error generating prescription:', error);
            throw error;
        }
    },

    // Check prescription status
    checkPrescription: async (prescriptionId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/check-prescription?id=${prescriptionId}`);
            if (!response.ok) {
                throw new Error('Failed to check prescription');
            }
            return await response.json();
        } catch (error) {
            console.error('Error checking prescription:', error);
            throw error;
        }
    }
};

export default userProfileAPI;
