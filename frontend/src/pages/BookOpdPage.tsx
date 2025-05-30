import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { useNavigate } from "react-router-dom";
import hospital_management from "../utils/api_requests/hospital_management";
import { useAuthStore } from "../store/useAuthStore";
import { useHospitalStore } from "../store/useHospitalStore";
import toast from "react-hot-toast";

interface Hospital {
  hospital_id: string;
  hospital_name: string;
}

interface Department {
  dept_name: string;
  _id: string;
  name: string;
}

export const BookOpdPage = () => {
  const { authUser } = useAuthStore();
  const { bookOpd, isOpdBooking, getSlots } = useHospitalStore();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookedSlots, setBookedSlots] = useState<[]>([]);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    age: "",
    gender: "",
    hospitalId: "",
    departmentId: "",
  });

  useEffect(() => {
    fetchHospitals();
  }, []);
  useEffect(() => {
    const fetchSlots = async () => {
      if (selectedDate != "" && formData.departmentId != "") {
        const slots: any = await getSlots(selectedDate, formData.departmentId);
        setBookedSlots(slots);
      }
    };
    fetchSlots();
  }, [selectedDate, formData.departmentId]);

  const fetchHospitals = async () => {
    try {
      const res = await hospital_management.get_approve_hospitals();
      setHospitals(res?.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async (hospitalId: string) => {
    try {
      const res = await hospital_management.get_departments(hospitalId);
      setDepartments(res?.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "hospitalId") {
      fetchDepartments(value);
      setFormData((prev) => ({ ...prev, departmentId: "" }));
    }
    setFormData({ ...formData, [name]: value });
  };
  const isSlotBooked = (time: string) => {
    return bookedSlots.find((slot: any) => slot.slot_time === time);
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      date: selectedDate,
      slot_time: selectedTime,
    };
    if (!authUser) {
      return toast.error("Login to continue");
    }
    payload.patientId = authUser._id;
    payload.name = authUser?.name ? authUser.name : "";
    bookOpd(payload);
  };

  // Time slots every 5 minutes from 10:00 AM to 3:00 PM
  const timeSlots = Array.from({ length: 61 }, (_, i) => {
    const totalMinutes = 600 + i * 5;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const suffix = hours >= 12 ? "PM" : "AM";
    const displayHour = hours > 12 ? hours - 12 : hours;
    return `${displayHour}:${minutes.toString().padStart(2, "0")}${suffix}`;
  });

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full min-h-screen bg-gray-900 text-white px-4 py-6 flex items-center  justify-start">
          <div className="flex flex-col md:flex-row w-full max-w-6xl">
            <div className="md:w-[to-70%] w-full backdrop-blur-lg bg-white/3 border border-gray-700 rounded-2xl shadow-lg p-6 sm:p-10">
              <div className="">
                <button
                  className="float-left p-2 bg-gray-700 rounded hover:bg-gray-600 hover:cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  ← Back
                </button>
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
                  Book OPD Appointment
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {/* Left Section */}
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-blue-300">
                    Patient Details
                  </h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Patient Name"
                    value={authUser?.name ? authUser.name : formData.name}
                    disabled={Boolean(authUser)}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                  <input
                    type="text"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none  focus:ring-blue-600 hover:cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  <div>
                    <label className="block mb-1 text-sm text-gray-400">
                      Select Hospital
                    </label>

                    <select
                      name="hospitalId"
                      value={formData.hospitalId}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition hover:cursor-pointer"
                    >
                      <option value="" disabled>
                        Select Hospital
                      </option>
                      {hospitals.map((hosp) => (
                        <option key={hosp.hospital_id} value={hosp.hospital_id}>
                          {hosp.hospital_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm text-gray-400">
                      Select Department
                    </label>
                    <select
                      id=""
                      name="departmentId"
                      value={formData.departmentId}
                      onChange={handleChange}
                      disabled={!formData.hospitalId}
                      className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition disabled:opacity-50 hover:cursor-pointer"
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.dept_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Section */}
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-blue-300">
                    Appointment Date & Time
                  </h3>
                  <label className="hidden mb-1 text-sm text-gray-400">
                    Select Appointment Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    title="Select Appointment Date"
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />

                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      Select Time Slot
                    </p>
                    <div
                      aria-disabled={selectedDate == "" ? true : false}
                      className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
                    >
                      {timeSlots.map((time) => {
                        const booked = isSlotBooked(time);
                        return (
                          <button
                            disabled={(selectedDate === "" || booked) ? true : booked}
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg text-sm border border-gray-600 transition hover:cursor-pointer
        ${selectedDate === "" ? "opacity-50 cursor-not-allowed" : ""}
        ${selectedDate === "" ? "opacity-50 cursor-not-allowed" : ""}
  ${
    selectedTime === time
      ? "bg-blue-600 text-white ring-2 ring-blue-400"
      : formData.departmentId == "" || selectedDate == ""
      ? "opacity-50 cursor-not-allowed bg-gray-500"
      : booked
      ? "bg-red-400 text-white"
      : "bg-green-900 text-white hover:bg-green-800"
  }

        
      `}
                          >
                            {formData.departmentId == ""
                              ? "select dept"
                              : selectedDate !== ""
                              ? time
                              : "select date"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-10">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-900 hover:bg-blue-600 p-3 rounded-lg font-semibold hover:cursor-pointer transition"
                >
                  {isOpdBooking ? "Booking..." : "BOOK APPOINTMENT"}
                </button>
              </div>
            </div>
          </div>
          {/* Image Section - 35% (Hidden on Mobile) */}
          <div className="hidden md:flex md:w-[35%] items-center justify-center  px-4">
            <img
              src="doctorImageInOPDbooking.png" // Make sure the image exists in public folder or replace with full URL
              alt="Doctor"
              className="w-[350px] animate-floating drop-shadow-lg opacity-90"
            />
          </div>
        </div>
      )}
    </>
  );
};
