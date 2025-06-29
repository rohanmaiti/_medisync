import mongoose, { Schema } from "mongoose";
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["doctor", "inventory_manager", "hospital_admin", "receptionist"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hospitalId:{
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'Hospitals',
    require: true
  },
  departmentId: {
    default: null,
    type: String,
    required: false
  }
}, { timestamps: true });

const Employees = mongoose.model("Employee", EmployeeSchema);
export default Employees;
