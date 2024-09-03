// Restaurant related API calls

import { axiosInstance } from "../config/axiosInstance"


//Get All restaurants
export const getAllRestaurants = async ()=>{
  try {
    const response = await axiosInstance({
      url: "/restaurant/all" ,
      method:"GET"
    })
  return response?.data?.data
  } catch (error) {
   console.log(error,"failed to fetch");

  }
}