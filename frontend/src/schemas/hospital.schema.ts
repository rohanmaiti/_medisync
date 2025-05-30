import { z } from "zod/v4";
export  const OpdBookingPayloadSchema = z.object({
      name:z.string().min(1,"Login"),
      age:z.string().min(1,"Age require"),
      gender:z.string().min(1,"Gender require"),
      hospitalId: z.string().min(1,"Choose any hospital"),
      departmentId: z.string().min(1,"Choose department"),
      date:z.string().min(1,"Select a date").refine((val)=>{
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            const inputdate = new Date(val);
            console.log(inputdate)
            return inputdate >= today;
      },
      {
            message:"Date can't be in the past"
      }),
      slot_time:z.string().min(1,"Select a time slot"),
      patientId: z.string("Login to continue")
})