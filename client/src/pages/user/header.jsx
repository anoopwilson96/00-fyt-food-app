import React, { useState, useEffect } from 'react';
import { DarkMode } from '../../UI/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { UserLogout } from '../../services/userAPI';
import { axiosInstance } from '../../config/axiosInstance';

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  // Logout Functionality
  const logout = async () => {
    await UserLogout();
    navigate('/');
  };

  // Fetch User Profile
  const fetchUser = async () => {
    try {
      const response = await axiosInstance({
        url: '/user/profile',
        method: 'GET',
        withCredentials: true,
      });
      setUser(response?.data?.data);
    } catch (error) {
      console.log('Error fetching profile pic');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);




  
  const handleAddressChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === 'addAddress') {
      navigate('/user/my-profile'); // Navigate to add address section
    }
  };

  return (
    <main className="mx-auto bg-base-300">
      {/* Main Navbar */}
      <div className="navbar flex flex-row items-center justify-around max-w-6xl mx-auto text-gray-800">
        {/* Logo */}
        <Link to={'/user'}>
          <img
            className="h-20 lg:h-24 min-w-20"
            src="https://res.cloudinary.com/aw96/image/upload/v1724584697/fyt_bfgnpm.png"
            alt="FYT Logo"
          />
        </Link>

        {/* Search and Location (Hidden on small screens) */}
        <div className="hidden md:flex flex-row gap-5 px-5">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-44"
            />
          </div>
          <select
      className="bg-white select select-ghost max-w-50"
      defaultValue="default"
      onChange={handleAddressChange}
    >
      {/* User's current address */}
      {user?.address ? (
        <option value="default" disabled>
          {user.address}
        </option>
      ) : (
        <option value="default" disabled>
          No Address Available
        </option>
      )}

      {/* Add Address option */}
      <option value="addAddress">Add Address</option>
    </select>
  


        </div>

        {/* Dark Mode Toggle */}
        <DarkMode />

        {/* Cart Icon with Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 lg:h-8 lg:w-8"
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
          <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-slate-800 font-medium">Subtotal: $999</span>
              <div className="card-actions">
                <Link to={'/user/cart'}>
                  <button className="btn btn-primary text-white btn-block">View cart</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile with Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Profile avatar"
                src={
                  user?.image ||
                  'https://res.cloudinary.com/aw96/image/upload/v1723432338/depositphotos_137014128-stock-illustration-user-profile-icon_a3ghy1.webp'
                }
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
              <Link to={'/user/order-history'} className="justify-between">
                Orders
              </Link>
            </li>
            <li>
              <Link onClick={logout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Search and Location for Mobile */}
      <div className="header3 md:hidden flex flex-row justify-center py-5 mx-auto gap-5">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-44"
          />
        </div>
        <select
    className="bg-white select select-ghost max-w-40"
    defaultValue="default"
    onChange={handleAddressChange}
  >
    {/* User's current address */}
    <option value="default" disabled>
      {user?.address ? user.address : 'No Address Available'}
    </option>

    {/* Add Address option */}
    <option value="addAddress">Add Address</option>
  </select>

      </div>
    </main>
  );
};
