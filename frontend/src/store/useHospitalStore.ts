import { create } from "zustand";
import { OpdBookingPayloadSchema } from "../schemas/hospital.schema";
import toast from "react-hot-toast";
import hospital_management from "../utils/api_requests/hospital_management";

type HospitalStore = {
  isOpdBooking: boolean;
  hospitals: [];
  setHospitals: () => void;
  bookOpd: (payload: any) => void;
};
export const useHospitalStore = create<HospitalStore>((set) => ({
  isOpdBooking: false,
  hospitals: [],
  setHospitals: () => {
    set({ hospitals: [] });
  },
  bookOpd: async (payload) => {
    console.log("book opd", payload);
    const result = OpdBookingPayloadSchema.safeParse(payload);
    if (!result.success) {
      console.log(result.error.issues);
      return toast.error(result.error.issues[0].message);
    }
    set({ isOpdBooking: true });
    try {
      await hospital_management.book_opd(payload);
      toast.success("Slot booked");
    } catch (error: any) {
      return toast.error(error?.message);
    }
    finally{
      set({isOpdBooking:false});
    }
  },
}));
