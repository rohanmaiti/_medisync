import React, { useState } from 'react'
import { Calendar, FileText, Home, LogOut, Menu, X } from "lucide-react";

interface NavLinkProps {
  children: React.ReactNode;
  active?: boolean;
  color?: string;
}
export const DoctorDashHeader = () => {
      const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <div>
        <header className="bg-gray-800 p-4 border-b border-blue-500/30 flex items-center justify-between fixed w-full">
        <div className="flex items-center space-x-2">
          <Calendar className="text-blue-400" size={24} />
          <h1 className="text-xl font-bold text-blue-400">DOCTOR DASHBOARD</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink active>
            <Home size={18} />
            Home
          </NavLink>
          <NavLink>
            <Calendar size={18} />
            Appointments
          </NavLink>
          <NavLink>
            <FileText size={18} />
            Records
          </NavLink>
          <NavLink color="red">
            <LogOut size={18} />
            Logout
          </NavLink>
        </div>

        <button
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

       {/* Mobile Menu */}
            {menuOpen && (
              <div className="md:hidden bg-gray-800 border-b border-blue-500/30">
                <NavLink active>
                  <Home size={18} />
                  Home
                </NavLink>
                <NavLink>
                  <Calendar size={18} />
                  Appointments
                </NavLink>
                <NavLink>
                  <FileText size={18} />
                  Records
                </NavLink>
                <NavLink color="red">
                  <LogOut size={18} />
                  Logout
                </NavLink>
              </div>
            )}
    </div>
  )
}


// Navigation Link Component
const NavLink: React.FC<NavLinkProps> = ({ children, active, color }) => {
  const baseClasses =
    "flex items-center space-x-2 px-4 py-3 rounded-md transition-colors";

  let colorClasses = "hover:bg-gray-700 text-gray-300 hover:text-blue-400";

  if (active) {
    colorClasses = "bg-gray-700 text-blue-400 font-medium";
  }

  if (color === "red") {
    colorClasses = "hover:bg-gray-700 text-red-500 hover:text-red-400";
  }

  return (
    <a href="#" className={`${baseClasses} ${colorClasses}`}>
      {children}
    </a>
  );
};