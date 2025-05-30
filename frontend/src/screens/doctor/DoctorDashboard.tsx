import React, { useState } from "react";
import {
  Search,
  MinusCircle,
  PlusCircle,
  Calendar,
  Clock,
  User,
  FileText,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
  Pill,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { DoctorDashHeader } from "./components/DoctorDashHeader";

// Type definitions
interface Medicine {
  id: number;
  name: string;
  quantity: number;
}

interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  patientId: string;
  profilePicture: string;
}

interface NavLinkProps {
  children: React.ReactNode;
  active?: boolean;
  color?: string;
}

const DoctorDashboard: React.FC = () => {
  const [searchMedicine, setSearchMedicine] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string>("");
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);
  const [medicineOptions, setMedicineOptions] = useState<Medicine[]>([
    { id: 1, name: "Amoxicillin 500mg", quantity: 0 },
    { id: 2, name: "Paracetamol 650mg", quantity: 0 },
    { id: 3, name: "Aspirin 75mg", quantity: 0 },
    { id: 4, name: "Cetirizine 10mg", quantity: 0 },
    { id: 5, name: "Omeprazole 20mg", quantity: 0 },
  ]);
  const [showMedicineDropdown, setShowMedicineDropdown] =
    useState<boolean>(false);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Generate time slots from 10 AM to 3 PM in 15-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 15; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        // Skip 3:15, 3:30, 3:45
        if (hour === 15 && minute > 0) continue;

        const ampm = hour >= 12 ? "PM" : "AM";
        const hourDisplay = hour > 12 ? hour - 12 : hour;
        const minuteDisplay = minute.toString().padStart(2, "0");
        slots.push(`${hourDisplay}:${minuteDisplay} ${ampm}`);
      }
    }
    return slots;
  };

  const appointmentTimes = generateTimeSlots();

  const patientInfo: PatientInfo = {
    name: "John Smith",
    age: 42,
    gender: "Male",
    patientId: "PT-7842",
    profilePicture: "/api/placeholder/64/64",
  };

  // Functions
  const handleAddMedicine = (): void => {
    if (searchMedicine.trim() !== "") {
      const newMedicine: Medicine = {
        id: Date.now(),
        name: searchMedicine,
        quantity: quantity,
      };
      setSelectedMedicines([...selectedMedicines, newMedicine]);
      setSearchMedicine("");
      setQuantity(1);
    }
  };

  const handleRemoveMedicine = (id: number): void => {
    setSelectedMedicines(
      selectedMedicines.filter((medicine) => medicine.id !== id)
    );
  };

  const incrementQuantity = (): void => setQuantity((prev) => prev + 1);
  const decrementQuantity = (): void =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleTimeSelect = (time: string): void => setSelectedTime(time);

  const handleMedicineSelect = (medicine: Medicine): void => {
    setSearchMedicine(medicine.name);
    setShowMedicineDropdown(false);
  };

  const markVisited = (): void => {
    // Logic to mark patient as visited
    console.log("Patient marked as visited");
    alert("Patient marked as visited successfully!");
  };

  const filteredOptions = medicineOptions.filter((med) =>
    med.name.toLowerCase().includes(searchMedicine.toLowerCase())
  );

  return (
    <div className="w-full bg-gray-900 text-gray-200">
      {/* Navigation Bar */}
      <DoctorDashHeader/>

     
      <main className="grid md:grid-cols-5 gap-4   pt-24 max-h-screen overflow-y-auto">
        {/* Left Column - Appointment Selection */}
        <div className="md:col-span-1  rounded-lg border border-gray-700 p-4 flex flex-col">
          <div className="mb-6 ">
            <label className="block text-gray-300 mb-2">Appointment ID</label>
            <input
              type="text"
              value={appointmentId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAppointmentId(e.target.value)
              }
              placeholder="Enter appointment ID"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 hidden sm:flex pb-3 w-full  flex-col h-full">
            <h3 className="text-gray-300 mb-2 flex items-center">
              <Clock size={16} className="mr-2 text-blue-400" />
              Time Slots
            </h3>
            <div className="overflow-y-auto h-[425px] flex flex-col gap-2">
              {appointmentTimes.map((time, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(time)}
                  className={`w-[90%] p-2 rounded-lg text-gray-200 ${
                    selectedTime === time
                      ? "bg-blue-500"
                      : "bg-gray-600 hover:bg-gray-500 hover:cursor-pointer "
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Added Medicines List */}
        <div className="pb-3 col-span-1 bg-gray-800/80  overflow-y-scroll  rounded-lg border border-gray-700 p-4">
          <h3 className="text-gray-300 mb-2 flex items-center">
            <Pill size={16} className="mr-2 text-blue-400" />
            Prescribed Medicines
          </h3>
          <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 max-h-[560px] overflow-y-scroll">
            {selectedMedicines.length > 0 ? (
              <ul className="space-y-2">
                {selectedMedicines.map((medicine) => (
                  <li
                    key={medicine.id}
                    className="flex items-center justify-between bg-gray-800 p-2 rounded"
                  >
                    <div>
                      <span className="text-blue-400">{medicine.name}</span>
                      <span className="text-gray-400 text-sm ml-2">
                        × {medicine.quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveMedicine(medicine.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X size={16} />
                      <p className="hidden" >hidden</p>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500 text-center py-2">
                Add medicines to the prescription
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-3">
          {/* Patient Info */}
          <div className="bg-gray-800/80 rounded-lg border border-gray-700 p-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  <UserCircle size={48} className="text-blue-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-medium text-white truncate">
                  {patientInfo.name}
                </h2>
                <div className="flex flex-wrap text-sm text-gray-400">
                  <span className="mr-4">Age: {patientInfo.age}</span>
                  <span>Gender: {patientInfo.gender}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium text-blue-400">
                  {patientInfo.patientId}
                </div>
              </div>
            </div>
          </div>

          {/* Prescription Area */}
          <div className=" rounded-lg border border-gray-700 p-4 min-h-[510px]">
            {/* Medicine Search */}
            <div className="mb-4 relative">
              <label className="block text-gray-300 mb-2">
                Search Medicine
              </label>
              <div className="flex">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchMedicine}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSearchMedicine(e.target.value);
                      setShowMedicineDropdown(true);
                      setSelectedIndex(-1);
                    }}
                    onFocus={() => setShowMedicineDropdown(true)}
                    onKeyDown={(e) => {
                      const target = e.target as HTMLInputElement;
                      const filteredOptions = medicineOptions.filter((med) =>
                        med.name
                          .toLowerCase()
                          .includes(searchMedicine.toLowerCase())
                      );

                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setSelectedIndex((prev) =>
                          prev < filteredOptions.length - 1 ? prev + 1 : 0
                        );
                      } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setSelectedIndex((prev) =>
                          prev > 0 ? prev - 1 : filteredOptions.length - 1
                        );
                      } else if (e.key === "Enter") {
                        e.preventDefault();
                        if(selectedIndex >=0 )
                        handleMedicineSelect(filteredOptions[selectedIndex]);
                        else
                        handleAddMedicine();
                        setShowMedicineDropdown(false);
                      }
                    }}
                    placeholder="Search medicine name"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                  <Search
                    className="absolute right-3 top-3 text-gray-400"
                    size={20}
                  />

                  {/* Dropdown for medicine selection */}
                  {showMedicineDropdown && searchMedicine && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {filteredOptions.map((medicine, index) => (
                        <div
                          key={medicine.id}
                          className={`p-2 cursor-pointer ${
                            selectedIndex === index
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-600"
                          }`}
                          onClick={() => handleMedicineSelect(medicine)}
                        >
                          {medicine.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Control */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="p-2 bg-gray-700 border border-gray-600 rounded-l-lg hover:bg-gray-600 cursor-pointer"
                >
                  <MinusCircle size={20} />
                  <p className="hidden" >hidden</p>
                </button>
                <input type="number" className="px-4 py-1.5 bg-gray-700 border-y border-gray-600 text-center" onChange={(e)=>{const target = e.target as HTMLInputElement; setQuantity(parseInt(target.value))}} value={quantity} />
                
                <button
                  onClick={incrementQuantity}
                  className="p-2 bg-gray-700 border border-gray-600 rounded-r-lg hover:bg-gray-600 cursor-pointer"
                >
                  <PlusCircle size={20} />
                  <p className="hidden" >hidden</p>
                </button>

                <button
                  onClick={handleAddMedicine}
                  className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                placeholder="Write prescription instructions and notes"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 lg:min-h-48"
              />
            </div>

            {/* Mark Visited Button */}
            <div className="text-right flex justify-end">
              <button
                onClick={markVisited}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 flex items-center hover:cursor-pointer"
              >
                <CheckCircle2 size={18} className="mr-2" />
                Mark as Visited
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

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

export default DoctorDashboard;
