import axios from 'axios';
import { axiosInstance } from '../config/axiosInstance';
import { useParams } from 'react-router-dom';


// Get all dishes
export const getAllDishesAPI = async () => {
  const response = await axiosInstance({
    url:"dish/all",
    method: "GET"
  })
  return response.data;
};

// Get a single dish by ID
export const getDishAPI = async (id) => {
  console.log(id)
  const response = await axiosInstance({
    url: `/dish/get/${id}`,
    method: "GET",
  })
  return response.data;
};

// Add a new dish
export const addDishAPI = async (dishData) => {

  try {
    console.log(dishData)
    const response = await axiosInstance({
      url: "dish/add",
      method:"POST",
      data: dishData,
      withCredentials:true
    })
    return response.data;
  } catch (error) {
    console.log(error,"Axios failed to add dish")
  }


};

// Update a dish by ID
export const updateDishAPI = async (id, dishData) => {
  try {
    console.log(dishData)
    const response = await axiosInstance({
      url:`/dish/update/${id}`,
      method:"PATCH",
      data: dishData,
      withCredentials:true
    })
    return response.data;
    
  } catch (error) {
    console.log("AXIOS ERROR",error)
  }

};

// Delete a dish by ID
export const deleteDishAPI = async (id) => {
  const response = await axiosInstance({
    url: `/dish/delete/${id}`,
    method:"DELETE",
    withCredentials: true
  })
  return response.data;
};
