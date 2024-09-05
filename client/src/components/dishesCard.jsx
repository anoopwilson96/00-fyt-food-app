import React, { useState } from 'react';
import { MdLocalOffer, MdDeliveryDining } from 'react-icons/md';

export const DishesCard = ({dish}) => {
  const [quantity, setQuantity] = useState(1);



  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className=" mx-auto bg-white shadow-lg rounded-lg overflow-hidden sm:flex sm:flex-col md:flex-col max-w-full">
      <img
        className="w-96 h-48 object-cover "
        src={dish?.image}
        alt={dish?.name}
      />
      
      <div className="p-4 flex flex-col align-middle items-center justify-between flex-1">
        <div>
          <h3 className="text-xl font-semibold">{dish?.name}</h3>
          <p className="text-gray-700 font-light mt-2">{dish?.description}</p>
        </div>
        
        <div className="mt-4 space-y-2  flex flex-col items-center">
          <div className="gap-5 flex justify-between items-center">
            <p className="flex items-center gap-1 mb-2 text-gray-800 font-bold">
            ₹ {(dish?.price).toFixed(2)}
            </p>

          </div>

          <div className="flex  justify-between items-center">
            <div className="flex items-center space-x-2">
              <button
                className="btn btn-outline btn-sm btn-square"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="btn btn-outline btn-sm btn-square"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>


          </div>
          <button className="btn btn-error rounded-full mt-4 px-3">
            Add to Cart
              {/* Cart  {(dish?.price * quantity).toFixed(2)} */}
            </button>
        </div>
      </div>
    </div>
  );
};
