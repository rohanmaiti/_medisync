import utils from "../utils";
import { Logintype } from "../../types/auth.type";
const user_management = {
    login: (data:Logintype) => {
         return utils.request({
            url:'/auth/login',
            method:'POST',
            payload:data
        })
    },
    getuser: () => {
        return utils.request({
            url:'/auth/check',
            method:'GET'
        })
    }
}

export default user_management;