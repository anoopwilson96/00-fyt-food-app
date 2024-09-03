import React from 'react'

export const MenuItemsCard = ({items}) => {



  return (
    <>
      <div className='MenuItems mb-10 avatar flex flex-col items-center align-middle justify-center'>
            <div className=" w-24 rounded-full object-cover mb-3 ">
               <img src= {items?.image} />
            </div>
            <p className='text-lg text-nowrap font-semibold flex items-center '>{items?.name}</p>
        </div>
        
    </>
  )
}
