import React from "react";

import { HospitalAdminHome } from "./components/HospitalAdminHome";
import { HospitaladminHeader } from "./components/HospitaladminHeader";
import { Outlet, Route, Routes } from "react-router-dom";

const HospitalAdminDashboard: React.FC = () => {
  // Toggle menu
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="min-w-screen min-h-screen mx-auto rounded-lg overflow-hidden border border-emerald-500/30">
        {/* Header */}
        <HospitaladminHeader />
        {/* Main Content */}
        <Outlet/>
        
  
      </div>
    </div>
  );
};

export default HospitalAdminDashboard;
