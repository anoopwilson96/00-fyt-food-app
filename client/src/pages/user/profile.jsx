import React, { useEffect } from 'react'
import { fetchUser } from '../../services/userAPI'
import toast from 'react-hot-toast';
import { useState} from 'react';

export const Profile =  () => {
  const [user, setUser] = useState({});


  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error(error);
        toast.error('Error in fetching data');
      }
    };

    getUserData();
  }, []);


  return (
<div className='bg-base-200 p-10 '>
<div className="max-w-md mb-10 mt-10 mx-auto bg-base-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">{user?.name}'s Profile</h2>
      
      <div className="flex flex-col items-center">
        <div className="avatar">
          <div className="w-36 rounded">
            <img src= {user?.image ||"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Profile" />
          </div>
        </div>
        
        <div className="mt-10 mb-10 text-left">
          <p className="text-gray-600 text-lg font-medium">{user?.name}</p>
          <p className="text-gray-600 text-lg font-medium">{user?.email}</p>
          <p className="text-gray-600 text-lg font-medium">{user?.mobile}</p>
        </div>
        
        <button className="btn btn-primary mb-5">Edit Details</button>
      </div>
    </div>
</div>

  )
}
