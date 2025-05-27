import express from 'express';
const router = express.Router();
import {handleApplyForHospital, handleGetApprovedHospitals,getAllDepartments} from '../controllers/hospital.controller.js';
import {getDoctorviewslot,DoctorVisited,fetchPatientHistory,ChangeVisibilityOfPatientHistory} from "../controllers/doctor.controller.js"

router.post("/applyForHospital",handleApplyForHospital);
router.get("/getApprovedHospitals",handleGetApprovedHospitals);
router.get("/departments/:hospitalId",getAllDepartments)

router.post("/doctor/slot",getDoctorviewslot)
router.post("/doctor/visited",DoctorVisited);
router.post("/patientHistory",fetchPatientHistory)
router.post("/patient/changevisible",ChangeVisibilityOfPatientHistory)

export default router;