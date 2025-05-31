import { create } from "zustand";
import { OpdBookingPayloadSchema } from "../schemas/hospital.schema";
import toast from "react-hot-toast";
import hospital_management from "../utils/api_requests/hospital_management";
import type{ AxiosResponse } from "axios";

type HospitalStore = {
  isOpdBooking: boolean;
  hospitals: [];
  setHospitals: () => void;
  bookOpd: (payload: any, resetPayload:any) => void;
  getSlots: (date:string,departmentId:string, hospitalId:string) => Promise<AxiosResponse<any, any> | never[] | undefined>;
};
export const useHospitalStore = create<HospitalStore>((set) => ({
  isOpdBooking: false,
  hospitals: [],
  setHospitals: () => {
    set({ hospitals: [] });
  },
  bookOpd: async (payload, resetPayload) => {
    const result = OpdBookingPayloadSchema.safeParse(payload);
    if (!result.success) {
      return toast(result.error.issues[0].message,{
        icon:'⚠️'
      });
    }
    set({ isOpdBooking: true });
    try {
      await hospital_management.book_opd(payload);
      toast.success("Slot booked");
      resetPayload();
    } catch (error: any) {
      return toast.error(error?.response.data.message);
    }
    finally{
      set({isOpdBooking:false});
    }
  },

  getSlots:  async (date,departmentId,hospitalId) => {
    try {
      const data = {
        date,departmentId,hospitalId
      }
      const res = await hospital_management.get_slots(data);
      return res?.data;
    } catch (error:any) {
      return [];
    }
  }
}));
