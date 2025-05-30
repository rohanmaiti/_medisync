import mongoose from "mongoose";
const slotSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',   
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',    
    required: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department', 
    required: true
  },
  date: {
    type: String,
    required: true
  },
  slot_time: {
    type: String,
    required: true
  },
  visit_status:{
    type:Boolean,
    default: false
  }
}, { timestamps: true });

const Slot= mongoose.model('Slot', slotSchema);
export default Slot;