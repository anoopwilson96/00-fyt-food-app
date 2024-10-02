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
  

// Get a single menu item by ID
export const getOneMenuItem = async (id) => {
  try {
    const response = await axiosInstance.get(`/menu-item/get/${id}`);
    return (response?.data?.data || []); 

  } catch (error) {
    throw error;
  }
};

// export const updateMenuItemAPI = async (id, formData) => {
//   try {
//     const response = await axiosInstance.patch(`/menu-item/update/${id}`, formData,{withCredentials: true}, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating menu item", error);
//     throw error;
//   }
// };


// Delete a menu item by ID
export const deleteMenuItemAPI = async (id) => {
  try {

    const response = await axiosInstance({
      url:(`/menu-item/delete/${id}`),
      method:"POST",
      withCredentials:true
    })
    console.log(id,"===")
    return response.data;
  } catch (error) {
    console.log("Axios error",error)
  }
};


// Add new menu Item

export const  AddMenuItemsAPI = async (formData)=>{
  try {
    console.log(formData)
       const response = await axiosInstance({
      url: "/menu-item/add",
      method: "POST",
      data:formData,
      withCredentials: true
    })
 
    return response
  } catch (error) {
    console.error(error,"Failed Add axios")
  }
}