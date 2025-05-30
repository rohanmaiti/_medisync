import { axiosInstance } from "../../lib/axios";
import utils from "../utils";
const hospital_management = {
    get_approve_hospitals: ()=> {
        return utils.request({
            url: '/hospital/getApprovedHospitals',
            method:'GET'
        })
    },
    get_departments : (data:string)=> {
        return utils.request({
            url:`/hospital/departments/${data}`,
            method:'GET'
        })
    }
}

export default hospital_management;