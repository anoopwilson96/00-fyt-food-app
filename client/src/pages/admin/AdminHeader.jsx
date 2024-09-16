import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminLogout } from '../../services/adminAPI';
import toast from 'react-hot-toast';

export const AdminHeader = () => {

const navigate = useNavigate()
const logout = async ()=>{
  try {
  await AdminLogout()
  navigate("/")
    
  } catch (error) {
    toast.error("Failed to Logout,Try later")
    console.log(error,"===error to login");
    
  }
}

  return (
    <div className="bg-neutral pt-5 pb-5">
      <header className="bg-neutral text-primary-content mx-auto p-4 max-w-5xl ">
        {/* Main navigation section */}
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <Link to={'/admin'}>
          <div className="flex items-center space-x-2">
            <span className="text-white font-extrabold text-4xl">FYT</span>
            <span className="text-xl text-gray-400">Fill Your Tummy</span>
          </div>
          </Link>


          {/* Main buttons */}
          <div className="flex gap-4  ">
            <Link to={'/admin'} >
              <button className="bg-primary text-white px-4 py-2 rounded-lg">Home</button>
            </Link>
            
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
          </div>
        </div>
      </header>
    </div>
  );
};
