import React, { useEffect } from 'react'
import { axiosInstance } from '../config/axiosInstance';
import { useNavigate, useLoaderData } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';


export const AdminAuth = ({children}) => {
const navigate = useNavigate()
const [admin, setAdmin] = useState();


 const checkAdmin = async()=>{
  
    try {
      const response = await axiosInstance({
        url: "/manage/check-admin",
        method: "GET",
        withCredentials:true 
      })
    console.log(response)
    setAdmin(true)
    } catch (error) {
      toast.error('Login To Continue')
      navigate('/admin/login')
      console.log(error,"======error")
      
    }

  }

  useEffect(()=>{
    checkAdmin()
  },[location.pathname])


  return admin ? children : null;

}


