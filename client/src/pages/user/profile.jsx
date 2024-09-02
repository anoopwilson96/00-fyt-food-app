import React from 'react'

export const Profile = () => {







  return (
<div className='bg-base-200 p-10 '>
<div className="max-w-md mb-10 mt-10 mx-auto bg-base-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">User's Profile</h2>
      
      <div className="flex flex-col items-center">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile" />
          </div>
        </div>
        
        <div className="mt-10 mb-10 text-left">
          <p className="text-gray-600 text-lg font-medium">User's Name</p>
          <p className="text-gray-600 text-lg font-medium">User's Phone</p>
          <p className="text-gray-600 text-lg font-medium">User's Email</p>
        </div>
        
        <button className="btn btn-primary mb-5">Edit Details</button>
      </div>
    </div>
</div>

  )
}
