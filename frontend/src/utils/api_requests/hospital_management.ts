import {z} from "zod/v4"
import { OpdBookingPayloadSchema } from "../../schemas/hospital.schema";
import utils from "../utils";
type OpdPayloadType = z.infer<typeof OpdBookingPayloadSchema>

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
    },
    book_opd : (data:OpdPayloadType) => {
        return utils.request({
            url:'/hospital/book-opd',
            method:'POST',
            payload:data
        })
    },
    get_slots: (data:{date:string, departmentId:string}) => {
        return utils.request({
            url:'/hospital/get-slots',
            method:'GET',
            payload:data
        })
    }
}

export default hospital_management;