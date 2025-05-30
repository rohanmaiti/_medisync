import {create} from "zustand";
import {OpdBookingPayloadSchema} from '../schemas/hospital.schema'
import toast from "react-hot-toast";
import hospital_management from "../utils/api_requests/hospital_management";

type HospitalStoreType = {
    hospitals:[],
    setHospitals:()=> void,
    bookOpd:(payload:any)=> void,
};
export const useHospitalStore = create<HospitalStoreType>((set) => ({
   hospitals:[],
   setHospitals: ()=>{
    set({hospitals: []})
   },
   bookOpd : async (payload) => {
    console.log("book opd",payload)
        const result = OpdBookingPayloadSchema.safeParse(payload);
       if(!result.success){
        toast.error(result.error.issues[0].message);
       }
       
    const res = await hospital_management.book_opd(payload)   

   }
}));