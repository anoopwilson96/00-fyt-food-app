import React from 'react'
import { DarkMode } from '../../UI/DarkMode'
import { Link } from 'react-router-dom'


export const HeaderLanding = () => {
  return (
  <>      
    <header className="w-full bg-base-200">
      <div className="navbar flex flex-row items-center justify-between px-5 md:px-40 ">
        <Link to={'/'}>
        <img
            className="h-20 lg:h-24 min-w-20"
            src="https://res.cloudinary.com/aw96/image/upload/v1724584697/fyt_bfgnpm.png"
            alt="FYT Logo"
          />       
        </Link>


      <div className=" sm:flex space-x-4">
        <Link to={'/signup'}>
        <button className="btn btn-outline btn-primary">Sign Up</button>
        </Link>
        
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
