import React from 'react'
import { DarkMode } from '../../UI/DarkMode'
import { Link } from 'react-router-dom'


export const HeaderLanding = () => {
  return (
  <>      
    <header className="w-full bg-base-200">
      <div className="navbar flex flex-row items-center justify-between p-4">
      <img
        className="h-14"
        src="https://res.cloudinary.com/aw96/image/upload/v1724584697/fyt_bfgnpm.png"
        alt="FYT Logo"
      />

      <div className=" sm:flex space-x-4">
        <button className="btn btn-outline btn-primary">Sign Up</button>
        <Link to={'/login'}>
        <button  className="btn btn-outline">Login</button>
        </Link>
        
      </div>

      <div className="flex ">
        <DarkMode/>
      </div>
      </div>
    </header>
  </>
  )
}
