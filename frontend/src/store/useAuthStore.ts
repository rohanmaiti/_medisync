import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { Logintype } from "../types/auth.type";
import user_management from "../utils/api_requests/user_management";

interface AuthUser {
  _id: string;
  name: string;
  email: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIng: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  hasParkingSlot?: string;
  userType?: string;

  setUserType: (type: string) => void;
  checkAuth: () => Promise<void>;
  signup: (data: any, navigate: NavigateFunction) => Promise<void>;
  login: (data: Logintype, navigate: NavigateFunction) => void;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  hasParkingSlot: undefined,
  userType: undefined,

  setUserType: (type) => {
    set({ userType: type });
  },
  getUserDetail: async () => {

  },
  checkAuth: async () => {
    try {
      const res = await user_management.getuser();
      set({ authUser: res?.data });
    } catch (error: any) {
      console.log("Error in checkAuth", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data, navigate) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      setTimeout(()=>{
        navigate("/");
      },2000);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data, navigate) => {
    try {
      set({ isLoggingIng: true });
      const res = await user_management.login(data);
      set({ authUser: res?.data });
      toast.success("Logged in successfully");
      if(res?.data.userType == "user")
      navigate("/");
      else if(res?.data.userType == "doctor")
      navigate("/doctor/dashboard");
      else if(res?.data.userType == "inventory manager")
      navigate("/inventory/dashboard");
      else if(res?.data.userType == "receptionist")
      navigate("/receptionist/dashboard");
      else if(res?.data.userType == "hospital admin")  
      navigate("/hospitaladmin/dashboard");
      else if(res?.data.userType == "super_admin")
      navigate("/superadmindashboard");
      
    } catch (error:any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIng: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.log("error in update profile:", error);
      toast.error("Error in updating profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
}));
