import React from 'react';
import { DarkMode } from '../../UI/DarkMode';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
<main className='mx-auto max-w-4xl '>

<div className="navbar bg-base-100 flex  flex-row items-center justify-between ">
  <Link to={'/user'}>
  <img className='h-14 min-w-14 ' src="https://res.cloudinary.com/aw96/image/upload/v1724584697/fyt_bfgnpm.png" alt="" />
  </Link>


<div className="form-control">
    <input
      type="text"
      placeholder="Search"
      className="input input-bordered w-24 md:w-44"
    />
  </div>

  <select className="select select-ghost max-w-xs">
     <option disabled selected>Choose location</option>
     <option>Whistler</option>
     <option>Vancouver</option>
     <option>Burnaby</option>
  </select>

 <DarkMode/>

 {/* <button className="btn btn-outline btn-primary">Sign Up</button>

 <button className="btn btn-outline">Login</button> */}

  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
          <button className="btn btn-primary btn-block">View cart</button>
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
          src="https://res.cloudinary.com/aw96/image/upload/v1723432338/depositphotos_137014128-stock-illustration-user-profile-icon_a3ghy1.webp"
        />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    >
      <li>
        <a className="justify-between">
          Profile
         </a>
      </li>
      <li>
        <a>Settings</a>
      </li>
      <li>
        <a>Logout</a>
      </li>
    </ul>
  </div>

</div>
    </main>

  );
};
