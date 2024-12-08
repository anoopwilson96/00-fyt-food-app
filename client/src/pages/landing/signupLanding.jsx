import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../services/userAPI';
import toast from 'react-hot-toast';
import { IoMdClose } from "react-icons/io";


export const SignupLanding = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  // Watch password fields for confirmation validation
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await signUpUser(data);
      if (response.success === true) {
        toast.success('Account Created');
        navigate('/user');
      }

      if (response.sameAccount === true) {
        toast.success('Already Exist');
        navigate('/login');
      }

    } catch (error) {
      console.log(error, "Failed to sign up");
      toast.error("Failed; Try later");
    }
  };

  const [warningShow,setWarningShow]= useState(true)

  useEffect(()=>{
    if (warningShow){
      const timer = setInterval(()=>{
        setWarningShow(false);
      },8000)
    }
  },[warningShow])



  return (
<main>
  
<div className='bg-base-200 flex flex-col justify-center items-center'>
  { 
warningShow &&  (
  <div className=' flex  bg-red-600 p-4  flex-col justify-end mx-0 m-auto max-w-3xl relative'>
  {/* Close Icon */}
  <IoMdClose 
    className='absolute top-2 right-2 text-white text-2xl cursor-pointer'
    onClick={() => setWarningShow(false)} 
  />
  
  {/* Content */}
  <div className='text-white flex flex-col items-center'>
    <h3 className='text-xl mb-2 font-semibold'>
      Kindly note
    </h3>
    <p className='text-wrap p-4 text-center'>
      The Database server is taking a longer time to connect.
    </p>
  </div>
</div>
)
  } 
</div>


<div className="hero bg-base-200 min-h-screen">




      <div className="hero-content flex-col lg:flex-row-reverse lg:m-16 lg:gap-40">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up Now!</h1>
          <p className="py-6 text-wrap">
            Join Fill Your Tummy and explore a world of delicious meals delivered right to your door. Sign up today and satisfy your cravings anytime, anywhere!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" {...register("name")} placeholder="Name" className="input input-bordered" required />
            </div>
            
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" {...register("email",{
                required: "Email is required",
                pattern:{
                  value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter proper Email"
                }
              })} placeholder="Email" className="input input-bordered" required />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Mobile Number (10 digits validation) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <input 
                type="tel" 
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Mobile number must be 10 digits"
                  }
                })} 
                placeholder="Mobile Number" 
                className="input input-bordered" 
                required 
              />
              {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                {...register("password", { required: "Password is required" })} 
                placeholder="Password" 
                className="input input-bordered" 
                required 
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input 
                type="password" 
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: value => value === password || "Passwords do not match"
                })} 
                placeholder="Confirm Password" 
                className="input input-bordered" 
                required 
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit */}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    </main>

  );
};
