import React from 'react'
import { StarRating } from './rating'

export const RestaurantsCard = ({restaurant}) => {
  return (
    <>
    
    
    {/* <div className="card  bg-base-100 shadow-lg max-h-96 max-w-96 sm:max-h-72 sm:max-w-72">
              <img className=" rounded-t-lg object-contain" src={restaurant?.image} alt="Restaurant 2" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{restaurant?.name}</h3>
                <p>{restaurant?.location}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★★★★★</span>
                </div>
              </div>
            </div> */}
    
    <div className="card p-5 card-compact bg-base-100 sm:max-w-92 sm:max-h-92  shadow-xl">
  <figure>
    <img
      src={restaurant?.image}
      alt="restaurant" />
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

      <button className="btn bg-slate-600 text-white">Menu</button>
    </div>

    </div>
    
  </div>
</div>

    </>
  )
}
