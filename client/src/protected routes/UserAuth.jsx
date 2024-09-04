import React, { useEffect } from 'react'
import { axiosInstance } from '../config/axiosInstance';
import { useNavigate, useLoaderData } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';


export const UserAuth = ({children}) => {
const navigate = useNavigate()
const [user, setUser] = useState();


 const checkUser = async()=>{
  
    try {
      const response = await axiosInstance({
        url: "/user/check-user",
        method: "GET",
        withCredentials:true 
      })
    setUser(true)
    } catch (error) {
      toast.error('Login To Continue')
      navigate('/login')
      console.log(error,"======error")
      
    }

  }

  useEffect(()=>{
    checkUser()
  },[location.pathname])


  return user ? children : null;

}


