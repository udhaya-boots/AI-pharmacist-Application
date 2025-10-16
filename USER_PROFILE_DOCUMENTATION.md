# User Profile System Documentation

## Overview
This document describes the user profile system implementation for both the Patient App and Pharmacist Dashboard in the AI Pharmacy Application.

## Features Implemented

### 🏥 Patient App Features
- **User Profile Management**: Complete patient profile with medical information
- **Context-based Navigation**: User context throughout the application
- **Profile Display**: Comprehensive view of patient information including:
  - Personal details (name, age, contact info)
  - Medical information (blood type, allergies, chronic conditions)
  - Emergency contact information
  - Recent activity tracking

### 👨‍⚕️ Pharmacist Dashboard Features
- **Pharmacist Profile Management**: Professional profile management
- **Enhanced Navigation**: Profile integration in sidebar with user context
- **Professional Information Display**:
  - Contact and personal information
  - Professional credentials and certifications
  - Work schedule and department info
  - Languages spoken
  - Activity status tracking

## File Structure

### Patient App (`pharmacy-react-app/`)
```
src/
├── components/
│   ├── Header.jsx              # Navigation header with user menu
│   └── UserProfile.jsx         # Patient profile component
├── context/
│   └── UserContext.jsx         # User state management
├── services/
│   └── userProfileAPI.js       # API service for user operations
├── App.js                      # Main app with routing and context
└── Home.jsx                    # Updated home page with user context
```

### Pharmacist Dashboard (`pharmacist-dashboard/`)
```
src/
├── components/
│   └── PharmacistProfile.jsx   # Pharmacist profile component
├── context/
│   └── PharmacistContext.jsx   # Pharmacist state management
├── services/
│   └── pharmacistProfileAPI.js # API service for pharmacist operations
├── App.jsx                     # Main app with routing and context
├── SideBar.jsx                 # Updated sidebar with user info
└── Home.jsx                    # Updated home page
```

### Backend (`pharmacist-backend/`)
```
app.py                          # Updated with new profile endpoints
```

## API Endpoints

### User Profile Endpoints
- `GET /user/profile/<user_id>` - Get patient profile
- `PUT /user/profile/<user_id>` - Update patient profile
- `GET /user/prescriptions/<user_id>` - Get user's prescriptions

### Pharmacist Profile Endpoints
- `GET /pharmacist/profile/<pharmacist_id>` - Get pharmacist profile
- `PUT /pharmacist/profile/<pharmacist_id>` - Update pharmacist profile

## Key Components

### 1. User Context (Patient App)
- Manages patient state throughout the application
- Provides user data to all components
- Handles authentication state (mock implementation)

### 2. Pharmacist Context (Dashboard)
- Manages pharmacist state in the dashboard
- Provides professional information access
- Handles logout functionality

### 3. Navigation Components
- **Header.jsx**: Patient app navigation with user menu
- **SideBar.jsx**: Dashboard navigation with pharmacist info

### 4. Profile Components
- **UserProfile.jsx**: Comprehensive patient profile display
- **PharmacistProfile.jsx**: Professional pharmacist profile with edit capabilities

## Setup Instructions

### 1. Install Dependencies
```bash
# Patient App
cd pharmacy-react-app/pharmacy-react-app
npm install react-router-dom

# Pharmacist Dashboard
cd pharmacist-dashboard/pharmacist-dashboard
npm install react-router-dom
```

### 2. Database Collections
The backend now uses three MongoDB collections:
- `user_prescriptions` - Existing prescription data
- `users` - Patient profile data
- `pharmacists` - Pharmacist profile data

### 3. Running the Applications

#### Start Backend
```bash
cd pharmacist-backend/pharmacist-backend
python app.py
```

#### Start Patient App
```bash
cd pharmacy-react-app/pharmacy-react-app
npm start
```

#### Start Pharmacist Dashboard
```bash
cd pharmacist-dashboard/pharmacist-dashboard
npm run dev
```

## Navigation Flow

### Patient App
1. **Login** → **Home Page** (with header navigation)
2. **Header Menu** → **Profile Page** → **Edit Profile**
3. **Header Menu** → **Prescription History**
4. **Header Menu** → **Logout**

### Pharmacist Dashboard
1. **Login** → **Dashboard Home** (with sidebar navigation)
2. **Sidebar** → **Profile Page** → **Edit Profile**
3. **Sidebar** → **Prescriptions** → **Reports** → **Settings**
4. **Sidebar** → **Logout**

## Mock Data
Currently using mock data for demonstration purposes. The system is designed to easily integrate with actual authentication and database systems.

### Sample Patient Data
- ID: P001
- Name: Peter Johnson
- Medical info: Blood type O+, allergies to Penicillin and Peanuts
- Emergency contact: Jane Johnson

### Sample Pharmacist Data
- ID: PH001
- Name: Dr. John Peter
- License: PH-12345
- Specialization: Clinical Pharmacy
- Experience: 8 years

## Integration Points

### Authentication Integration
- Replace mock user data in contexts with actual auth tokens
- Add login/logout API calls
- Implement route protection

### Database Integration
- User profiles automatically created on first API call
- Profile updates saved to MongoDB
- Prescription history linked to user profiles

## Future Enhancements
1. **Profile Picture Upload**: File upload functionality
2. **Medical History**: Detailed medical records
3. **Appointment Scheduling**: Integration with calendar system
4. **Notification System**: Real-time updates for profile changes
5. **Security**: Role-based access control and data encryption

## Troubleshooting

### Common Issues
1. **Routing Issues**: Ensure react-router-dom is installed
2. **Context Errors**: Check that components are wrapped in providers
3. **API Errors**: Verify backend server is running on correct ports
4. **MongoDB Connection**: Ensure MongoDB is running locally

### Development Notes
- Patient app runs on port 3000
- Pharmacist dashboard runs on Vite dev server (typically 5173)
- Backend API runs on port 5000
- MongoDB should be running on default port 27017
