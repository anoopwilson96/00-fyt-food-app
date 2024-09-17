import React, { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartDetails, setCartDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  const navigate = useNavigate();

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
        setUserDetails(response?.data?.cart?.user);
      } catch (error) {
        toast.error("Failed to load cart: Try later");
        console.log(error);
      }
    };
  
    fetchCartItems();
  }, []);

  // Function to update the cart in the backend
  const updateCartOnServer = async (updatedItems) => {
    try {
      await axiosInstance({
        url: '/cart/update',
        method: 'PUT',
        data: {
          items: updatedItems
        },
        withCredentials: true,
      });
      console.log("Cart updated successfully on server.");
    } catch (error) {
      toast.error("Failed to update cart: Try later");
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
  const increaseQuantity = async (id) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    calculateTotals(updatedItems); // Recalculate totals when quantity changes
    await updateCartOnServer(updatedItems); // Sync with the backend
  };

  // Update quantity decrease function
  const decreaseQuantity = async (id) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
    calculateTotals(updatedItems); // Recalculate totals when quantity changes
    await updateCartOnServer(updatedItems); // Sync with the backend
  };

  // Update remove item function
  const removeItem = async (id) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedItems);
    calculateTotals(updatedItems); // Recalculate totals when an item is removed
    await updateCartOnServer(updatedItems); // Sync with the backend
  };

  const handlePayment = async () => {
    try {
      // Create Razorpay order on the backend
      const orderResponse = await axiosInstance({
        url: '/payment/create-order',
        method: "POST",
        data: { amount: cartDetails?.cart?.total }, // Send the amount to create an order
        withCredentials: true,
      });

      const { id: order_id, amount, currency } = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay key
        amount: amount.toString(),
        currency: currency,
        name: "Fill Your Tummy",
        description: "Your food order payment",
        order_id: order_id, // Razorpay order ID
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          // Send payment details to the backend to verify the payment
          try {
            const verifyResponse = await axiosInstance.post("/payment/verify-payment", {
              payment_id: razorpay_payment_id,
              order_id: razorpay_order_id,
              signature: razorpay_signature,
            });

            if (verifyResponse.data.status === "success") {
              toast.success("Payment successful!");
              // Now proceed to checkout
              await checkout(); // Ensure the checkout only happens after payment success
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            toast.error("Payment verification error");
            console.error("Payment verification error:", error);
          }
        },
        prefill: {
          name: userDetails?.name || "Guest",
          email: userDetails?.email || "guest@example.com",
          contact: userDetails?.mobile || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment error: Try later");
      console.error("Payment error:", error);
    }
  };

  const checkout = async () => {
    try {
      // Ensure the cart is updated with the latest data
      await updateCartOnServer(cartItems);

      // Proceed with the checkout API call
      const response = await axiosInstance({
        url: '/cart/checkout',
        method: "POST",
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Checkout successful!");
        console.log('Checkout successful:', response.data);
      } else {
        toast.error("Checkout failed");
        console.error('Checkout failed:', response.data.message);
      }
    } catch (error) {
      toast.error("Error during checkout: Try later");
      console.error('Error during checkout:', error);
    }
    navigate('/user/order-history')
  };

  const addressExists = userDetails && userDetails.address;

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
                <p className="text-sm text-gray-500">₹ {item.dish.price.toFixed(2)}</p>
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
              ₹ {cartDetails?.cart?.subtotal ? cartDetails.cart.subtotal.toFixed(2) : "0.00"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">GST + HST (10%)</p>
            <p className="text-sm text-gray-500">
              ₹ {cartDetails?.cart?.tax ? cartDetails.cart.tax.toFixed(2) : "0.00"}
            </p>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <p className="text-xl">Total</p>
            <p className="text-xl">
              ₹ {cartDetails?.cart?.total ? cartDetails.cart.total.toFixed(2) : "0.00"}
            </p>
          </div>

          {/* Address Section */}
          <div className="mt-6 mb-4 p-4 border rounded-lg border-gray-300">
            <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
            {addressExists ? (
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">{userDetails.address}</span>
                </label>
              </div>
            ) : (
              <button
                onClick={() => navigate('/user/my-profile')}
                className="text-blue-500 hover:underline"
              >
                + Add address to proceed
              </button>
            )}
          </div>

          <button
            className={`w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 ${!addressExists ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handlePayment}
            disabled={!addressExists}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};
