import mongoose from "mongoose";
import Slot from "../models/slot.model.js"; 
import User from "../models/user.model.js"; 
import PatientHistory from "../models/patienthistory.model.js"; // adjust path if needed
import Hospital from '../models/hospital.model.js';
import Department from '../models/department.model.js';

export async function getDoctorviewslot(req, res) {
  const { hospitalId, departmentId, date, slot_time } = req.body;

//  console.log(req.body)

  if (!hospitalId || !departmentId || !date || !slot_time) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    // Step 1: Find the slot
    const slot = await Slot.findOne({
      hospital: hospitalId,
      department: departmentId,
      date,
      slot_time
    });

    if (!slot) {
      return res.status(404).json({ message: "No booking found for this slot." });
    }

    // Step 2: Find the patient from User model using patient ID from slot
    const patient = await User.findById(slot.patient)
    console.log(patient)

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    return res.status(200).json({
      patient_details:patient,
      slot_id:slot._id
    });

  } catch (error) {
    console.error("Error fetching slot or patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


export async function DoctorVisited(req, res) {
  try {
    const { userid, slotId, disease, medicines } = req.body;
    if (!userid || !slotId || !disease || !medicines) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newVisit = new PatientHistory({
      user: userid,
      slot: slotId,
      disease: disease,
      medicine: medicines,
      visit_status: true,
      secure: false  // or true if confidential
    });

    const savedVisit = await newVisit.save();
    console.log("Saved visit:", savedVisit);

    return res.status(201).json({ message: "Visit recorded successfully", data: savedVisit });

  } catch (err) {
    console.error("DoctorVisited error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}




export async function fetchPatientHistory(req,res) {
    const {userID} =req.body;
  try {
    // Find patient history by user ID
    const patientHistories = await PatientHistory.find({ user:userID })
      .populate({
        path: 'slot',
        populate: {
          path: 'hospital',
          model: 'hospitals',  // Populate hospital details
        }
      })
      .populate({
        path: 'slot',
        populate: {
          path: 'department',
          model: 'Department',  // Populate department details
        }
      })
      .exec();
    //   console.log(patientHistories)

    if (!patientHistories || patientHistories.length === 0) {
      return {
        success: false,
        message: 'No patient history found for the given user.',
      };
    }
    console.log(patientHistories)
    // Map the response to include only the required fields
    const historyData = patientHistories.map(item => ({
      historyID:item._id,
      hospitalName: item.slot.hospital.hospital_name, // Extract hospital name
      departmentName: item.slot.department.dept_name, // Extract department name
      date: item.createdAt.toISOString().split('T')[0], // Date in YYYY-MM-DD format
      disease: item.disease, // Disease
      medicine: item.medicine, // Medicine
      visit_status: item.visit_status, // Visit status (boolean)
      secure: item.secure, // Secure status (boolean)
    }));

    return res.status(200).json({
        success: true,
        data: historyData,
      });
  } catch (err) {
    console.error('Error fetching patient history:', err);
    return res.status(500).json({
      success: false,
      message: 'Error fetching patient history.',
    });
    }
}

export async function ChangeVisibilityOfPatientHistory(req, res) {
  try {
    const { historyID } = req.body;

    if (!historyID) {
      return res.status(400).json({ success: false, message: "Missing historyID" });
    }

    // Find the history document
    const history = await PatientHistory.findById(historyID);

    if (!history) {
      return res.status(404).json({ success: false, message: "Patient history not found" });
    }

    // Toggle the secure field
    history.secure = !history.secure;

    // Save the updated document
    await history.save();

    return res.status(200).json({
      success: true,
      message: `Secure status updated to ${history.secure}`,
      secure: history.secure,
    });

  } catch (error) {
    console.error("Error changing visibility:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}