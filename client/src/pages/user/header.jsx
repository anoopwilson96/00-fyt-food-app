import React from 'react';
import { DarkMode } from '../../UI/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { UserLogout } from '../../services/userAPI';
import { axiosInstance } from '../../config/axiosInstance';
import { useState, useEffect } from 'react';

export const Header = () => {
const navigate = useNavigate()
const [user,setUser] = useState({})

//logout
const logout =async ()=>{
await UserLogout();
navigate("/")}

//fetch user profile pic in header

const fetchUser = async ()=>{
  try {
    const  response = await axiosInstance({
      url: "/user/profile" ,
      method: "GET",
      withCredentials: true 
    })
  setUser(response?.data?.data)
  } catch (error) {
    console.log("Error fetching profile pic")
  }
}


useEffect(()=>{
  fetchUser()
},[])

  return (
<main className='mx-auto bg-base-300 '>

<div className="navbar  flex  flex-row items-center justify-around max-w-6xl mx-auto text-gray-800">
  <Link to={'/user'}>
  <img className='h-20 lg:h-24 min-w-20 ' src="https://res.cloudinary.com/aw96/image/upload/v1724584697/fyt_bfgnpm.png" alt="" />
  </Link>


  <div className='hidden md:flex flex-row gap-5 px-5'>
     <div className="form-control">
         <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-44"/>
      </div>

      <select className="bg-white select select-ghost max-w-50" defaultValue="">
            <option disabled>Choose location</option>
            <option>Whistler</option>
            <option>Vancouver</option>
            <option>Burnaby</option>
       </select>
  </div>


 <DarkMode/>

 {/* <button className="btn btn-outline btn-primary">Sign Up</button>

 <button className="btn btn-outline">Login</button> */}

  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
      <div className="indicator text-slate-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6  lg:h-8 lg:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="badge badge-sm indicator-item">8</span>
      </div>
    </div>
    <div
      tabIndex={0}
      className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
    >
      <div className="card-body">
        <span className="text-lg font-bold">8 Items</span>
        <span className="text-info">Subtotal: $999</span>
        <div className="card-actions">
          <Link to={'/user/cart'}>
          <button className="btn btn-primary btn-block">View cart</button>
           </Link>
        </div>
      </div>
    </div>
  </div>

  <div className="dropdown dropdown-end">
    <div
      tabIndex={0}
      role="button"
      className="btn btn-ghost btn-circle avatar"
    >
      <div className="w-10 rounded-full">
        <img
          alt="Profile avatar"
          src={user?.image ||"https://res.cloudinary.com/aw96/image/upload/v1723432338/depositphotos_137014128-stock-illustration-user-profile-icon_a3ghy1.webp" }
        />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    >
      <li>
        <Link to={'/user/my-profile'} className="justify-between">
          Profile
         </Link>
      </li>
      <li>
        <Link to={'/user/my-profile'} className="justify-between">Orders </Link>
      </li>
      <li>
        <Link onClick={logout} >Logout </Link>
      </li>
      
    </ul>
  </div>

</div>

<div className='header3  md:hidden flex flex-row justify-center py-5 mx-auto gap-5'>
<div className="form-control">
    <input
      type="text"
      placeholder="Search"
      className="input input-bordered w-24 md:w-44"
    />
  </div>

  <select className="select select-ghost max-w-50" defaultValue="">
     <option disabled>Choose location</option>
     <option>Whistler</option>
     <option>Vancouver</option>
     <option>Burnaby</option>
  </select>
</div>
</main>

  );
};




