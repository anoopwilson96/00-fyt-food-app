import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";





// Admin related API calls


export const AdminLogin = async (data)=>{
  try {
   const response = await axiosInstance({
      url: '/manage/login',
      method: "POST",
      data,
      withCredentials: true
    })
  console.log(response,"===response")
  return (response?.data)
  
    
  } catch (error) {
    console.log(error,"===login axios failed")
  }
}


export const AdminLogout = async ()=>{

  try {
    const response = await axiosInstance({
      url: "/manage/logout",
      method: "POSt",
      withCredentials: true
    })
    if(response){
      console.log(response)
      toast.success('Logged out successfully')
      
    }
    return 
  } catch (error) {
    toast.error('Error: Try again')
    
  }
}


// check Admin login at "/"

export const IsAdminLoggedIn = async () => {
  try {
    const response = await axiosInstance({
      url: "/manage/check-admin",
      method: "GET",
      withCredentials: true
    });
    return response?.data; // Return the response data
  } catch (error) {
    console.log("Please Login");
    return null; // Return null in case of error
  }
};