import Employees from "../models/employee.model";
import { transporter } from "../lib/nodemailer";
import { bcryptjs } from "bcryptjs";
export function editDepartement() {}

export function getAllDepartments() {
  // will hit the response onece hospital admin click on departments
  // be will send list of dipartments or null
}

export async function addEmployee(req, res) {
  const { emp_name, emp_type, emp_email, emp_department_id, emp_phone_number } =
    req.body;
  // check if emp already exists or not
  const emp = Employees.findOne({ email: emp_email });
  if (emp) {
    return res.status(400).json({ message: "Email id already exits" });
  }

  const password = Math.floor(Math.random() * 1001);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newEmp = new Employees({
    name: emp_name,
    userType: emp_type,
    email: emp_email,
    departmentId: emp_department_id,
    phone_number: emp_phone_number,
    password: hashedPassword,
    hospital_id: req.user.hospitalId
  });
  await newEmp.save();
const empWithHospital = await Employees.findById(newEmp._id).populate('hospital_id');
const hospitalName = empWithHospital.hospital_id.hospital_name;
  await transporter.sendMail({
    from: `Hospital Admin: ${hospitalName} <rohanmaiti69@gmail.com>`,
    to: emp_email,
    subject: "Login Credentials ✔",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #007bff;">Login credentials</h2>
      <p>Your  password is</p>
      <p style="font-size: 18px; font-weight: bold; color: #d9534f;">${password}</p>
      <p>Please make sure to change it after logging in for your security.</p>
      <p>Thank you, <br> The Support Team</p>
      </div>
      `,
  });
  // send a mail via nodemailer and send him credential
}

export function editEmployee() {}

export function getAllEmployees() {}

export function scheduleEmpoyees() {}

export function editScheduleEmployee() {}

export function getAllBedPatientList() {}

export function editBedPatientDetails() {}

export function getODPDetails() {}

export function getAllInventoryDetails() {}

export function editInventoryDetails() {}
