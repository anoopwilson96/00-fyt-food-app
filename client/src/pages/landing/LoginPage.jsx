import React from 'react'
import { useForm } from "react-hook-form"

export const LoginPage = () => {

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm()

  // const onSubmit = (data) => console.log(data)





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


