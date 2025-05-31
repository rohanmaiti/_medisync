import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SIgnupPage";
import { HospitalRegistrationForm } from "./pages/HospitalRegistrationPage";
import { BookOpdPage } from "./pages/BookOpdPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import HospitalAdminDashboard from "./screens/hospital_admin/HospitalAdminDashboard";
import PatientHistoryPage from "./pages/PatientHistory";
import DoctorDashboard from "./screens/doctor/DoctorDashboard";
import { Navbar } from "./components/Navbar";
// import DocDash from './userDashboards/hospitalAdmin/doctor/DoctorDashboard'

function App() {
  const { checkAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
       <div className="fixed w-full ">
        <Navbar />
      </div>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route element={!authUser ? <Outlet/> : <Navigate to='/'/>  } >
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route
          path="/registration-form"
          element={<HospitalRegistrationForm />}
        />
        <Route path="/book-opd-form" element={<BookOpdPage />} />
        <Route
          path="/hospitaladmin/dashboard"
          element={<HospitalAdminDashboard />}
        />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/patient/history" element={<PatientHistoryPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
