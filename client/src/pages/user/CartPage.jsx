import React, { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); 
  const [cartDetails, setCartDetails] = useState();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosInstance({
          url: "cart/active",
          method: "GET",
          withCredentials: true,
        });
        setCartDetails(response?.data);
        setCartItems(response?.data?.cart?.items || []); 
        console.log(cartItems)
      } catch (error) {
        toast.error("Failed to load cart: Try later");
        console.log(error);
      }
    };
  
    fetchCartItems();
  }, []); 
  
  const finalCheckout = async () => {
    try {
      const response = await axiosInstance({
        url: "cart/checkout",
        method: "POST", // Ensure this method is correct
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      toast.error("Checkout Failed: Try later");
      console.log(error);
    }
  };

  const calculateTotals = (updatedItems) => {
    const subtotal = updatedItems.reduce((acc, item) => acc + (item.dish.price * item.quantity), 0);
    const tax = subtotal * 0.1; // Assuming a 10% tax rate
    const total = subtotal + tax;
  
    setCartDetails({
      ...cartDetails,
      cart: {
        ...cartDetails.cart,
        subtotal,
        tax,
        total
      }
    });
  };
  
  // Update quantity increase function
  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    calculateTotals(updatedItems); // Recalculate totals when quantity changes
  };
  
  // Update quantity decrease function
  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
    calculateTotals(updatedItems); // Recalculate totals when quantity changes
  };
  
  // Update remove item function
  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedItems);
    calculateTotals(updatedItems); // Recalculate totals when an item is removed
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {/* Cart Items */}
      <div className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b border-gray-200 py-4"
            >
              <div className="flex items-center space-x-4">
                <p className="text-lg font-semibold">{item.dish.name}</p>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Decrease quantity */}
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                >
                  <AiOutlineMinus />
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                {/* Increase quantity */}
                <button
                  onClick={() => increaseQuantity(item._id)}
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                >
                  <AiOutlinePlus />
                </button>
                {/* Delete item */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty</p>
        )}
      </div>

      {/* Total & Checkout Section */}
      {cartItems.length > 0 && (
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-lg mt-6 p-4">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Subtotal</p>
            <p className="text-lg">
              ${cartDetails?.cart?.subtotal ? cartDetails.cart.subtotal.toFixed(2) : "0.00"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">GST + HST (10%)</p>
            <p className="text-sm text-gray-500">
              ${cartDetails?.cart?.tax ? cartDetails.cart.tax.toFixed(2) : "0.00"}
            </p>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <p className="text-xl">Total</p>
            <p className="text-xl">
              ${cartDetails?.cart?.total ? cartDetails.cart.total.toFixed(2) : "0.00"}
            </p>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700"
            onClick={finalCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};
