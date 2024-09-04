import React from 'react'
import { Link } from 'react-router-dom'

export const MenuItemsCard = ({items}) => {



  return (
    <>
      <div className='MenuItems mb-10 avatar flex flex-col items-center align-middle justify-center'>
            <div className=" w-24 rounded-full object-cover mb-3 ">
              <Link to={`menu-item/${items?._id}`}>
                <img src= {items?.image} /> 
              </Link> 
            </div>
            <p className='text-lg text-nowrap font-semibold flex items-center '>{items?.name}</p>
        </div>
        
    </>
  )
}
