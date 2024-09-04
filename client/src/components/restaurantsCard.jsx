import React from 'react'
import { Link } from 'react-router-dom';
import { StarRating } from './rating'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";

export const RestaurantsCard = ({restaurant}) => {
  return (
    <>
    
    
    {/* <div className="card  bg-base-100 shadow-lg max-h-96 max-w-96 sm:max-h-72 sm:max-w-72">
              <img className=" rounded-t-lg object-contain" src={restaurant?.image} alt="Restaurant 2" />
              <div className="p-4">
                <div className='flex flex-row justify-start gap-10 items-center'>
                <h3 className="text-lg font-semibold flex flex-row gap-3 items-center">{restaurant?.name} <FaArrowRight size={20} /></h3>
                
                <span className="text-slate-600">{restaurant?.rating} ★</span>
                </div>

                
                <div className="flex align-middle justify-between mt-2">
                  
                  <p className='flex text-nowrap items-center flex-row gap-1'> <MdDeliveryDining />  Free Delivery</p>
                  <p className='flex text-nowrap items-center flex-row gap-1' ><MdLocalOffer />  Explore Offers </p>                 
                </div>
              </div>
            </div> */}
    
    <div className="card p-5 card-compact bg-base-100 sm:max-w-92 sm:max-h-92  shadow-xl">
  <figure>
    <Link to={`restaurant/${restaurant?._id}`} >
    <img
      src={restaurant?.image}
      alt="restaurant" />
   </Link>

  </figure>
  <div className="card-body">
    
    <h2 className="card-title font-bold">{restaurant?.name}</h2>
    
    <p className='text-base font-normal'>{restaurant?.cuisine}</p>
  
    <div className="flex flex-row align-middle justify-between section">
      <div>
      <StarRating stars={restaurant?.rating} />
      <p className='text-sm font-normal mt-2'>{restaurant?.location}</p>


      </div>

    <div className="card-actions justify-end">

    <Link to={`restaurant/${restaurant?._id}`} >
    <button className="btn bg-slate-600 text-white">Menu</button></Link>
    </div>

    </div>
    
  </div>
</div>

    </>
  )
}
