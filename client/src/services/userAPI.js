import React from "react"
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



// All USER related API calls are declared here

export const userLogin = async (data)=>{
  try {
    const response = await axiosInstance ({
      url:"/user/login",
     method: "POST",
     data,
     withCredentials: true,
     })
  return response?.data
  } catch (error) {
    console.log(error)
  }
}



//Signup user

export const signUpUser = async (data)=>{
  try {
  const response = await axiosInstance({
    url: "/user/add",
    method: "POST",
    data,
    withCredentials: true
  })
  console.log(response)
  return response?.data ; 
  } catch (error) {
   console.log(error,"Failed request to sign up") 
  }
}




export const UserLogout = async ()=>{

  try {
    const response = await axiosInstance({
      url: "/user/logout",
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

//fetch user data 

export const fetchUser = async ()=>{
  try {
    const  response = await axiosInstance({
      url: "/user/profile" ,
      method: "GET",
      withCredentials: true 
    })
 console.log(response,"====response")
  return response?.data?.data;
  } catch (error) {
    console.log("Error fetching user data")
  }
}


// check user login at "/"

  export const IsLoggedIn = async () => {
    try {
      const response = await axiosInstance({
        url: "/user/check-user",
        method: "GET",
        withCredentials: true
      });
      return response?.data; // Return the response data
    } catch (error) {
      console.log("Please Login");
      return null; // Return null in case of error
    }
  };


  //Update user
  export const updateUser = async (formData) => {
    try {
      const response = await axiosInstance({
        url: '/user/update',
        method: 'PATCH',
        data: formData,
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log(error, "=== Update profile axios failed");
      throw error;
    }
  };
  