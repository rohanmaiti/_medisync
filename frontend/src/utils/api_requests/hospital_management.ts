import {z} from "zod/v4"
import { OpdBookingPayloadSchema } from "../../schemas/hospital.schema";
type OpdPayloadType = z.infer<typeof OpdBookingPayloadSchema>

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
    },
    book_opd : (data:OpdPayloadType) => {
        return utils.request({
            url:'',
            method:'POST',
            data:data
        })
    }
}

export default hospital_management;