import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SIgnupPage";
import { HospitalRegistrationForm } from "./pages/HospitalRegistrationPage";
import { BookOpdPage } from "./pages/BookOpdPage";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import HospitalAdminDashboard from "./screens/hospital_admin/HospitalAdminDashboard";
import PatientHistoryPage from "./pages/PatientHistory";
import DoctorDashboard from "./screens/doctor/DoctorDashboard";
import { HospitalAdminHome } from "./screens/hospital_admin/components/HospitalAdminHome";
import HospitalAdminPage from "./screens/hospital_admin/HospitalAdminPage";

function App() {
  const { checkAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route element={!authUser ? <Outlet /> : <Navigate to="/" />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route element={authUser ? <Outlet /> : <PleaseLogin />}>
          <Route
            path="/hospitaladmin/dashboard"
            element={<HospitalAdminPage />}
          >
            <Route  index element={<HospitalAdminHome/>} />
            <Route path="About"  element={<h1>About page</h1>} />
            <Route path="contact"  element={<h1>Contact page</h1>} />
            <Route path="*" element={<h1>Not valid endpoint</h1>} />
          <Route />
          </Route>
        </Route>

        <Route
          path="/registration-form"
          element={<HospitalRegistrationForm />}
        />
        <Route path="/book-opd-form" element={<BookOpdPage />} />
        <Route
          path="/profile"
          element={
            <div className="w-screen h-screen flex justify-center items-center">
              <h1>Profile page</h1>
            </div>
          }
        />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/patient/history" element={<PatientHistoryPage />} />
        <Route
          path="*"
          element={
            <div className="w-screen h-screen flex justify-center items-center text-4xl">
              <h1>404 Page Not found</h1>
            </div>
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;

function PleaseLogin() {
  useEffect(() => {
    toast("Please Login to continue");
  }, []);
  return <Navigate to="/login" />;
}
