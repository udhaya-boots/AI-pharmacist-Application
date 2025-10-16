// API service for pharmacist dashboard profile operations
const API_BASE_URL = 'http://localhost:5000';

export const pharmacistProfileAPI = {
    // Get pharmacist profile
    getPharmacistProfile: async (pharmacistId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/pharmacist/profile/${pharmacistId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch pharmacist profile');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching pharmacist profile:', error);
            throw error;
        }
    },

    // Update pharmacist profile
    updatePharmacistProfile: async (pharmacistId, profileData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/pharmacist/profile/${pharmacistId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });
            if (!response.ok) {
                throw new Error('Failed to update pharmacist profile');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating pharmacist profile:', error);
            throw error;
        }
    },

    // Get all prescriptions
    getAllPrescriptions: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/list-prescriptions`);
            if (!response.ok) {
                throw new Error('Failed to fetch prescriptions');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            throw error;
        }
    },

    // Update prescription
    updatePrescription: async (prescriptionData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/update-prescription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prescriptionData),
            });
            if (!response.ok) {
                throw new Error('Failed to update prescription');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating prescription:', error);
            throw error;
        }
    }
};

export default pharmacistProfileAPI;
