import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCart, fetchCart } from '../services/cartSlice';


export const DishesCard = ({ dish, restaurantId }) => {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Load quantity from localStorage on component mount
  useEffect(() => {
    const storedQuantity = localStorage.getItem(`dish-${dish._id}-quantity`);
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity, 10));
    }
  }, [dish._id]);

  // Save quantity to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`dish-${dish._id}-quantity`, quantity);
  }, [quantity, dish._id]);

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
      // Fetch the active cart
      const cartResponse = await axiosInstance.get('/cart/active', { withCredentials: true });
      const currentCart = cartResponse.data.cart;

      // Check if the cart exists and if it's from a different restaurant
      if (currentCart && currentCart.items.length > 0 && currentCart.restaurant && currentCart.restaurant._id !== restaurantId) {
        console.log(restaurantId,"===!!!",currentCart.restaurant._id)
        const confirmClear = window.confirm(
          'Existing cart will be cleared. Proceed?'
        );
      
        if (!confirmClear) {
          navigate(`/user/cart`);
          return;
        }
      }

      // Check if the dish is already in the cart and update its quantity
      const existingCartItem = currentCart?.items?.find(item => item.dish._id === dish._id);

      let newQuantity = quantity;
      if (existingCartItem) {
        newQuantity = quantity; // Replace old quantity with the new quantity
      }

      // Prepare data to send to the backend
      const data = {
        dishId: dish._id,
        quantity: newQuantity,
        restaurantId: restaurantId
      };

      // Add to cart request
      console.log(data,"send 1")
      const response = await axiosInstance.post('/cart/add', data, { withCredentials: true });


      if (response.data.success) {
        toast.success('Dish added to cart!');
         dispatch(updateCart (response.data.cart));
         dispatch(fetchCart());


      
      // Clear the quantity for this dish in localStorage after adding to cart
      localStorage.removeItem(`dish-${dish._id}-quantity`);

      } else {
        toast.error(response.data.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error adding to cart. Please try again.');
    }
  };

  return (
    <div className="mx-auto  shadow-lg rounded-lg overflow-hidden sm:flex sm:flex-col md:flex-col max-w-full">
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
