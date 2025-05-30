import Hospital from "../models/hospital.model.js";
import Department from "../models/department.model.js";
import Slot from "../models/slot.model.js";
export async function handleApplyForHospital(req, res) {
  try {
    console.log("Request body:", req.body);
  } catch (error) {}
}

export async function handleGetApprovedHospitals(req, res) {
  console.log("Fetching approved hospitals...");
  try {
    const hospitals = await Hospital.find({ approve_status: true });
    const result = hospitals.map((hospital) => {
      return {
        hospital_name: hospital.hospital_name,
        hospital_id: hospital._id,
      };
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hospitals" });
  }
}
export async function getAllDepartments(req, res) {
  console.log("getting all departments...");
  try {
    const hospitalId = req.params.hospitalId;
    if (!hospitalId) {
      return res.status(400).json({ message: "hospitalId is required" });
    }
    const departments = await Department.find({ hospital: hospitalId });
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function handleBookOpd(req, res) {
  console.log("handling booking opd");
  const { userId, name, age, date, time, hospitalId, departmentId } = req.body;
  let slot = await Slot.findOne({ userId, departmentId, date });
  if (slot) {
    return res.status(400).json({
      message: "Can't book more than one Appointment in a department",
    });
  }
  slot = await Slot.findOne({ userId, date, time });
  if (slot) {
    return res
      .status(400)
      .json({ message: "Can't book different department at same time" });
  }
  try {
    const newSlot = await Slot.create(req.body);
    return res.status(200).json({ message: "Opd booking successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSlots(req, res) {
  console.log("getting slots...");
  const { date, departmentId } = req.query;
  try {
    const slots = await Slot.find({ date, departmentId });
    return res.status(200).json(slots);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message:'Internal server error'});  }
}
