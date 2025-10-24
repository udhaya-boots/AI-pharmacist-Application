# AI-pharmacy-Application

A comprehensive AI-powered pharmacy application with separate interfaces for patients and pharmacists, featuring complete authentication systems.

## 🏗️ Architecture Overview

This application consists of three main components:

1. **Patient App** (`pharmacy-react-app/`) - React application for patients/users
2. **Pharmacist Dashboard** (`pharmacist-dashboard/`) - React application for pharmacists  
3. **Backend API** (`pharmacist-backend/`) - Flask backend serving both applications

## 🔐 Authentication System

### Features Implemented:
- ✅ **Separate Registration and Login** for both user types
- ✅ **Protected Routes** - No direct access without authentication
- ✅ **Session Management** - Login persistence using localStorage
- ✅ **Automatic Redirects** - Users redirected to appropriate dashboards after login
- ✅ **Sample Test Credentials** provided for easy testing

### Authentication Flow:
1. **New Users**: Must register first → Cannot access main page directly → Must login to enter
2. **Returning Users**: Must login to access respective dashboards
3. **Successful Login Redirects**:
   - **Patients** → Patient Portal (`http://localhost:3000/home`)
   - **Pharmacists** → Pharmacist Dashboard (`http://localhost:5173/dashboard`)

## 🧪 Test Credentials

### Patient Login:
- **Email**: `user@example.com`
- **Password**: `user123`

### Pharmacist Login:
- **Email**: `pharmacist@example.com`  
- **Password**: `pharm123`

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.7+
- MongoDB (optional - uses mock data)

### 1. Start the Backend Server
```bash
cd pharmacist-backend/pharmacist-backend
python app.py
```
Backend will run on: `http://localhost:5000`

### 2. Start the Patient Application
```bash
cd pharmacy-react-app/pharmacy-react-app
npm install
npm start
```
Patient app will run on: `http://localhost:3000`

### 3. Start the Pharmacist Dashboard
```bash
cd pharmacist-dashboard/pharmacist-dashboard
npm install
npm run dev
```
Pharmacist dashboard will run on: `http://localhost:5173`

### 4. Open the Landing Page
Open `index.html` in your browser to access the main landing page with links to both applications.

## 📱 Application Features

### Patient App Features:
- 🔑 **User Registration & Login**
- 🏠 **Home Dashboard** with symptom input
- 👤 **User Profile Management** 
- 📋 **Prescription History**
- 🎤 **Voice Input** for symptoms
- 🔊 **Text-to-Speech** for prescriptions

### Pharmacist Dashboard Features:
- 🔑 **Pharmacist Registration & Login**
- 📊 **Dashboard Overview** with prescription statistics
- 📝 **Prescription Management** (approve, reject, edit)
- 👨‍⚕️ **Professional Profile Management**
- 📈 **Real-time Updates** and notifications

## 🛡️ Security Features

- **Protected Routes**: All main application routes require authentication
- **Session Management**: Login state persisted across browser sessions
- **Input Validation**: Form validation on registration and login
- **Secure Logout**: Complete session cleanup on logout

## 🗂️ Project Structure

```
AI-pharmacist-Application/
├── index.html                          # Landing page
├── pharmacy-react-app/                 # Patient Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx              # Patient login
│   │   │   ├── Register.jsx           # Patient registration
│   │   │   ├── ProtectedRoute.jsx     # Route protection
│   │   │   └── ...
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Authentication state
│   │   │   └── UserContext.jsx        # User data management
│   │   └── App.js                     # Main app with routing
├── pharmacist-dashboard/               # Pharmacist Application  
│   ├── src/
│   │   ├── components/
│   │   │   ├── PharmacistLogin.jsx    # Pharmacist login
│   │   │   ├── PharmacistRegister.jsx # Pharmacist registration
│   │   │   ├── PharmacistProtectedRoute.jsx # Route protection
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── PharmacistContext.jsx  # Pharmacist state management
│   │   └── App.jsx                    # Main app with routing
└── pharmacist-backend/                # Backend API
    └── app.py                         # Flask server
```

## 🔄 Navigation Flow

### Patient App Flow:
1. **Landing Page** → **Patient Login**
2. **New User** → **Registration** → **Login** → **Home Dashboard**
3. **Returning User** → **Login** → **Home Dashboard**
4. **Authenticated Navigation**: Home → Profile → Prescription History

### Pharmacist Dashboard Flow:
1. **Landing Page** → **Pharmacist Login**
2. **New Pharmacist** → **Registration** → **Login** → **Dashboard**
3. **Returning Pharmacist** → **Login** → **Dashboard**
4. **Authenticated Navigation**: Dashboard → Prescriptions → Profile

## 🔧 Technical Implementation

### Authentication Stack:
- **Frontend**: React with React Router for routing
- **State Management**: React Context API for global state
- **Persistence**: localStorage for session management
- **UI Components**: Material-UI (Patient) + Tailwind CSS (Pharmacist)
- **Form Validation**: Built-in validation with error handling

### Key Components:
- **AuthContext**: Manages authentication state and user data
- **ProtectedRoute**: HOC that redirects unauthenticated users
- **Login/Register Forms**: Full form validation and error handling
- **Session Persistence**: Automatic login on app refresh

## 📝 Development Notes

### Code Quality:
- Clear documentation and comments added throughout
- Consistent naming conventions
- Error handling implemented
- Responsive design for mobile/tablet
- Loading states and user feedback

### Future Enhancements:
- JWT token-based authentication
- Email verification for registration
- Password reset functionality
- Two-factor authentication
- Role-based permissions
- API integration with real backend

## 🐛 Troubleshooting

### Common Issues:
1. **Port Conflicts**: Ensure ports 3000, 5173, and 5000 are available
2. **Dependencies**: Run `npm install` in both React app directories
3. **Backend**: Ensure Python dependencies are installed
4. **Browser Storage**: Clear localStorage if experiencing login issues

### Getting Help:
- Check browser console for error messages
- Verify all servers are running on correct ports
- Ensure test credentials are entered correctly

---

**Note**: This implementation uses mock authentication for demonstration. In production, integrate with a proper authentication service and database.
