// Restaurant related API calls

import { axiosInstance } from "../config/axiosInstance"



//Get All restaurants
export const getAllRestaurants = async ()=>{
  try {
    const response = await axiosInstance({
      url: "/restaurant/all" ,
      method:"GET"
    })
  return (response?.data?.data || [])
  } catch (error) {
   console.log(error,"failed to fetch");

  }
}

// Get A Restaurant 

export const getOneRestaurant = async (id)=>{
  try {
    const response = await axiosInstance({
      url:`/restaurant/get/${id}`,
      method: "GET"
    })
    console.log(response.data.data)
    return response?.data?.data
  } catch (error) {
    console.log(error,"=== Error in axios fetching restaurant")
  }
}


// Add restaurant

export const AddRestaurantAPI = async(data)=>{
  try {
    const response = await axiosInstance({
      url: "/restaurant/add",
      method: "POST",
      data: data,
      withCredentials: true
    })
    return response
  } catch (error) {
    console.log(error,"===axios failed")
  }
}

