import React from 'react'
import { Link } from 'react-router-dom'

export const MenuItemsCard = ({items}) => {



  return (
    <>
      <div className='MenuItems mb-10 avatar flex flex-col items-center align-middle justify-center'>
            <div className=" w-16 rounded-full object-cover mb-3 ">
              
                <img src= {items?.image} /> 
          
            </div>
            <Link to={`menu-item/${items?._id}`}>
            <p className='text-sm text-nowrap font-semibold flex items-center  hover:text-yellow-700 transition-colors duration-300 '>{items?.name}</p>
            </Link> 
        </div>
        
    </>
  )
}
