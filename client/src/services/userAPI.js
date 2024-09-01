import React from "react"
import { axiosInstance } from "../config/axiosInstance";



// All USER related API calls are declared here

export const userLogin = async (data)=>{
  try {
    const response = await axiosInstance ({
      url:"/user/login",
     method: "POST",
     data,
     withCredentials: true,
     })
  return response?.data ;
  } catch (error) {
    console.log(error)
  }
}


export const checkUser = async ()=>{
  try {
    const response = await axiosInstance({
      url: "/user/user-check",
      method: "GET",
    })

  } catch (error) {
    console.log(error)
  }
}