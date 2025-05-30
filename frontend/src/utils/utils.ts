import { axiosInstance } from "../lib/axios"

const utils = {
    request: async ({url, method, payload}:any) => {
        switch(method){
            case 'GET' :return await axiosInstance.get(url);break;
            case 'POST' :return await axiosInstance.post(url, payload);break;
            case 'PUT' :return await axiosInstance.put(url, payload);break;
            case 'DELETE' :return await axiosInstance.delete(url, payload);break;
        }
    }
}
export default utils