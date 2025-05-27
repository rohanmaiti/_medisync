import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';

type PatientHistory = {
  historyID:string,
  hospitalName: string;
  departmentName: string;
  date: string;
  disease: string;
  medicine:  {
    id: number;
    name: string;
    quantity: number;
  }[];
  visit_status: boolean;
  secure: boolean;
};

const PatientHistoryPage: React.FC = () => {
  const [history, setHistory] = useState<PatientHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axiosInstance.post("/hospital/patientHistory", {
          userID: "680f6e0923ba1b0d97bc4633",
        });

        if (res.data.success && res.data.data) {
          setHistory(res.data.data);
        } else {
          setHistory([]);
        }
      } catch (err) {
        console.error("Error fetching patient history:", err);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, []);

  const handleToggleSecure = async (historyID: string) => {
    try {
      const res = await axiosInstance.post("/hospital/patient/changevisible", {
        historyID,
      });

      if (res.data.success) {
        setHistory((prev) =>
          prev.map((item) =>
            item.historyID === historyID
              ? { ...item, secure: res.data.secure }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error toggling secure status:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg text-gray-700">Loading...</div>
    );
  }

  if (!history.length) {
    return (
      <div className="text-center mt-20 text-lg text-red-500">
        No patient history found.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Patient History
      </h2>

      {history.map((item, index) => (
        <div
          key={index}
          className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-medium text-gray-800">
              {item.hospitalName}
            </h3>
            <span className="text-sm text-gray-500">{item.departmentName}</span>
          </div>

          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">📅 Date:</span>
              <span>{item.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">🦠 Disease:</span>
              <span>{item.disease}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">💊 Medicine:</span>
              <span>
                {item.medicine.map((med, i) => (
                  <span key={i} className="block">
                    {med.name} ({med.quantity})
                  </span>
                ))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">✅ Visit Status:</span>
              <span>{item.visit_status ? "Visited" : "Not Visited"}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-medium text-gray-700">🔒 Secure:</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={item.secure}
                onChange={() => handleToggleSecure(item.historyID)}
              />
              <div className="relative w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
              </div>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientHistoryPage;