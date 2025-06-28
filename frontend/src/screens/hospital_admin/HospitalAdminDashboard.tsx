import React from "react";
import { HospitaladminHeader } from "./components/HospitaladminHeader";
import { Outlet } from "react-router-dom";

const HospitalAdminDashboard: React.FC = () => {
 
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
        <HospitaladminHeader />

        <Outlet/>
        
  
    </div>
  );
};

export default HospitalAdminDashboard;
