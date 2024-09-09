import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const DishesCard = ({ dish, restaurantId }) => {
  const [quantity, setQuantity] = useState(0); 
  const navigate = useNavigate()
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    if (quantity <= 0) {
      toast.error('Please select at least 1 item');
      return;
    }

    try {
      // Fetch the active cart to check for restaurant conflict
      const cartResponse = await axiosInstance.get('/cart/active', { withCredentials: true });
      const currentCart = cartResponse.data.cart;

      // Check if the cart exists and if it's from a different restaurant
      if (currentCart && currentCart.restaurant && currentCart.restaurant !== restaurantId) {
        // Warn the user and ask for confirmation
        const confirmClear = window.confirm(
          'Another Restaurant items in cart.Continuing will empty those items. Proceed? '
        );

        if (!confirmClear) {
        navigate(`/user/restaurant/${currentCart.restaurant}`)
          return; // Exit if the user cancels
        }
      }

      // Prepare data to send to the backend
      const data = {
        dishId: dish._id,
        quantity: quantity,
        restaurantId: restaurantId
      };

      // Add to cart request
      const response = await axiosInstance.post('/cart/add', data, { withCredentials: true });

      if (response.data.success) {
        toast.success('Dish added to cart!');
      } else {
        toast.error(response.data.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error adding to cart. Please try again.');
    }
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden sm:flex sm:flex-col md:flex-col max-w-full">
      <img className="w-96 h-48 object-cover" src={dish?.image} alt={dish?.name} />
      <div className="p-4 flex flex-col align-middle items-center justify-between flex-1">
        <div>
          <h3 className="text-xl font-semibold">{dish?.name}</h3>
          <p className="text-gray-700 font-light mt-2">{dish?.description}</p>
        </div>

        <div className="mt-4 space-y-2 flex flex-col items-center">
          <div className="gap-5 flex justify-between items-center">
            <p className="flex items-center gap-1 mb-2 text-gray-800 font-bold">
              ₹ {(dish?.price).toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button className="btn text-2xl btn-outline btn-sm btn-square" onClick={handleDecrease}>
                -
              </button>
              <span className="font-semibold text-lg">{quantity}</span>
              <button className="btn text-xl btn-outline btn-sm btn-square" onClick={handleIncrease}>
                +
              </button>
            </div>
          </div>
          <button onClick={addToCart} className="btn btn-primary rounded-full mt-4 px-3">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
