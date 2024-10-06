import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../services/userAPI';
import toast from 'react-hot-toast';

export const SignupLanding = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()



const onSubmit = async (data)=>{
  try {
    const response = await signUpUser(data);
    console.log(data)
    if (response.success === true) {
      toast.success('Account Created');
      navigate('/user');
    }

    if (response.sameAccount === true) {
      console.log(response);
      toast.success('Already Exist');
      navigate('/login');
    }

  } catch (error) {
    console.log(error,"Failed to sign up")
    toast.error("Failed; Try later")
  }
}







  return (
    <>
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up Now!</h1>
      <p className="py-6 text-wrap">
        Join Fill Your Tummy and explore a world of delicious meals delivered right to your door. Sign up today and satisfy your cravings anytime, anywhere!
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">


      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name")}  placeholder="Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")} placeholder="Email" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Mobile Number</span>
          </label>
          <input type="tel" {...register("mobile")} placeholder="Mobile Number" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password")} placeholder="Password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>


    </div>
  </div>
</div>

    </>
  )
}


