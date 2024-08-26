import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';


export const LoginPage = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate();
  const onSubmit = async (data) =>{
    try {
      console.log(data,'====data')
    
      const response = await axios ({
       url:"http://localhost:3000/api/v1/user/login",
      method: "POST",
      data,
      withCredentials: true,
      })
      console.log(response);
      toast.success('Login Success')
      navigate('/user')
      
    } catch (error) {
      console.log(error)
      toast.error('Login Failed')
    }




  } 





  return (

<>
<div className="hero bg-base-200 min-h-screen min-w-28 ">
  <div className="hero-content flex-col lg:flex-row-reverse max-w-2xl mx-auto">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
      Log in to access your personalized menu, track your orders, and enjoy exclusive deals. Let’s get you closer to that perfect meal!
      </p>
    </div>
    <div className="card bg-base-100 w-3xl max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password")} placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
    </>
  )
}


