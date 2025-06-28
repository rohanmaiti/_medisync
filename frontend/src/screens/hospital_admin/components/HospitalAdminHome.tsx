import React, { useState } from "react";
import {
  Users,
  BedDouble,
  Plus,
  ClipboardList,
  Settings,
  Edit,
  UserPlus,
  Calendar,
  FileText,
  BarChart2,
  Activity
} from "lucide-react";

type SlideType = {
  id: number;
  content: string;
};
type ColorOption = "emerald" | "amber" | "olive" | "blue" | "purple" | "red";
type ActionButtonProps = {
  icon: React.ReactNode;
  text: string;
  color?: ColorOption;
  fullWidth?: boolean;
};
export const HospitalAdminHome = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);  const handleSlideChange = (index: number): void => {
    setActiveSlide(index);
  };
  // Slide content for the image carousel
  const slides: SlideType[] = [
    { id: 1, content: "Hospital Overview" },
    { id: 2, content: "Staff Performance" },
    { id: 3, content: "Patient Statistics" },
  ];
  return (
    <>
      <main className='min-h-screen bg-gray-100/40 '>
        {/* Left Column - Carousel */}
        

        {/* Right Column - Actions */}
       
      </main>
    </>
  );
};

// Action Button Component
const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
  color = "emerald",
  fullWidth = false,
}) => {
  // Color mapping for Tailwind classes
  const colorMap: Record<ColorOption, string> = {
    emerald: "bg-emerald-700 hover:bg-emerald-600 text-emerald-100",
    amber: "bg-amber-700 hover:bg-amber-600 text-amber-100",
    olive: "bg-green-800 hover:bg-green-700 text-green-100", // Using green as a substitute for olive
    blue: "bg-blue-700 hover:bg-blue-600 text-blue-100",
    purple: "bg-purple-700 hover:bg-purple-600 text-purple-100",
    red: "bg-red-700 hover:bg-red-600 text-red-100",
  };

  const colorClasses =
    colorMap[color] || "bg-gray-700 hover:bg-gray-600 text-gray-100";

  return (
    <button
      className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer ${colorClasses} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </button>
  );
};
