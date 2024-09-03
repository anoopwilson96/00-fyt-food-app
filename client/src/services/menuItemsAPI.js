//All Menu Item API calls

import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance"


export const getAllMenuItems = async ()=>{
try {
  const response = await  axiosInstance({
    url:'/menu-item/all',
    method:'GET'
  })
return response?.data?.data   
} catch (error) {
  console.log(error);
}
}
  

