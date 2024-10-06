import { axiosInstance } from '../../config/axiosInstance';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCart, fetchCart } from '../../services/cartSlice';

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartDetails, setCartDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Apply coupon function
  const applyCoupon = (couponCode) => {
    const selectedCoupon = coupons.find((coupon) => coupon.code === couponCode);

    if (!selectedCoupon) {
      toast.error("Invalid coupon");
      return;
    }

    const discountValue = (cartDetails?.cart?.subtotal * selectedCoupon.discount) / 100;
    setAppliedCoupon(selectedCoupon);
    setDiscountAmount(discountValue);

    toast.success(`${selectedCoupon.code} applied! You get ${selectedCoupon.discount}% off.`);
    calculateTotals(cartItems, discountValue);
  };

  // Remove coupon function
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    calculateTotals(cartItems, 0); // Recalculate totals without discount
  };

  // Function to update totals
  const calculateTotals = (updatedItems, discount = discountAmount) => {
    const subtotal = updatedItems.reduce(
      (acc, item) => acc + item.dish.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1; // Assuming a 10% tax rate
    const total = subtotal + tax - discount; // Apply discount here

    setCartDetails({
      ...cartDetails,
      cart: {
        ...cartDetails.cart,
        subtotal,
        tax,
        total: total > 0 ? total : 0, // Ensure total doesn't go negative
      },
    });
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axiosInstance({
          url: '/coupon/active',
          method: 'GET',
          withCredentials: true,
        });
        setCoupons(response?.data?.coupons);
      } catch (error) {
        toast.error('Failed to load coupons: Try later');
      }
    };
    fetchCoupons();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosInstance({
          url: 'cart/active',
          method: 'GET',
          withCredentials: true,
        });
        setCartDetails(response?.data);
        setCartItems(response?.data?.cart?.items || []);
        setUserDetails(response?.data?.cart?.user);
      } catch (error) {
        toast.error('Failed to load cart: Try later');
      }
    };
    fetchCartItems();
  }, []);

  // Update cart on the server
  const updateCartOnServer = async (updatedItems) => {
    try {
      await axiosInstance({
        url: '/cart/update',
        method: 'PUT',
        data: { items: updatedItems },
        withCredentials: true,
      });
      dispatch(fetchCart())
    } catch (error) {
      toast.error('Failed to update cart: Try later');
    }
  };

  // Increase quantity
  const increaseQuantity = async (id) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    calculateTotals(updatedItems); // Recalculate totals
    await updateCartOnServer(updatedItems); // Sync with backend
  };

  // Decrease quantity
  const decreaseQuantity = async (id) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
    calculateTotals(updatedItems); // Recalculate totals
    await updateCartOnServer(updatedItems); // Sync with backend
  };

  // Remove item
  const removeItem = async (id) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedItems);
    calculateTotals(updatedItems); // Recalculate totals
    await updateCartOnServer(updatedItems); // Sync with backend
  };

  // Payment handling function
  const handlePayment = async () => {
    try {
      const orderResponse = await axiosInstance({
        url: '/payment/create-order',
        method: 'POST',
        data: {
          amount: cartDetails?.cart?.total, // Send discounted total to create the order
          coupon: appliedCoupon?._id, // Send the applied coupon
        },
        withCredentials: true,
      });

      const { id: order_id, amount, currency } = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: 'Fill Your Tummy',
        description: 'Your food order payment',
        order_id: order_id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          try {
            const verifyResponse = await axiosInstance.post('/payment/verify-payment', {
              payment_id: razorpay_payment_id,
              order_id: razorpay_order_id,
              signature: razorpay_signature,
            });

            if (verifyResponse.data.status === 'success') {
              toast.success('Payment successful!');
              await checkout();
            } else {
              toast.error('Payment verification failed.');
            }
          } catch (error) {
            toast.error('Payment verification error');
          }
        },
        prefill: {
          name: userDetails?.name || 'Guest',
          email: userDetails?.email || 'guest@example.com',
          contact: userDetails?.mobile || '9999999999',
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error('Payment error: Try later');
    }
  };

  const checkout = async () => {
    try {
      await updateCartOnServer(cartItems);
      const response = await axiosInstance({
        url: '/cart/checkout',
        method: 'POST',
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success('Checkout successful!');
      } else {
        toast.error('Checkout failed');
      }
    } catch (error) {
      toast.error('Error during checkout: Try later');
    }
  
    navigate('/user/order-history');
    location.reload()
  };

  const addressExists = userDetails && userDetails.address;

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-600">Your Cart</h1>

      {/* Cart Items */}
      <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-6 mb-8">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between gap-4 items-center border-b border-gray-300 py-4"
            >
              <div className="flex items-center space-x-6">
                <p className="text-lg font-semibold text-gray-700">{item.dish.name}</p>
                <p className="text-sm  text-gray-600">₹ {item.dish.price.toFixed(2)} </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="bg-gray-300 p-2 rounded-full hover:bg-gray-400"
                >
                  <AiOutlineMinus />
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item._id)}
                  className="bg-gray-300 p-2 rounded-full hover:bg-gray-400"
                >
                  <AiOutlinePlus />
                </button>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-600 hover:text-red-700"
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
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-6">
          <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-bold text-blue-700">Available Coupons</h3>
            {coupons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {coupons.map((coupon) => (
                  <button
                    key={coupon._id}
                    className={`border p-3 text-sm rounded-lg transition-all duration-200 ${
                      appliedCoupon?.code === coupon.code
                        ? 'bg-green-200 border-green-500 text-green-800'
                        : 'bg-blue-50 border-blue-200 hover:bg-blue-200'
                    }`}
                    onClick={() => applyCoupon(coupon.code)}
                  >
                    <span className="font-semibold">{coupon.code}</span> - {coupon.discount}% OFF
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No coupons available</p>
            )}
            {appliedCoupon && (
              <button
                onClick={removeCoupon}
                className="mt-4 text-red-500 hover:underline"
              >
                Remove Coupon
              </button>
            )}
          </div>

          <div className="flex justify-between mb-2">
            <p className="text-lg font-semibold text-gray-700">Subtotal</p>
            <p className="text-lg text-gray-800">
              ₹ {cartDetails?.cart?.subtotal ? cartDetails.cart.subtotal.toFixed(2) : '0.00'}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-500">GST + HST (10%)</p>
            <p className="text-sm text-gray-500">
              ₹ {cartDetails?.cart?.tax ? cartDetails.cart.tax.toFixed(2) : '0.00'}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-500">Discount</p>
            <p className="text-sm text-gray-500">
              ₹ {discountAmount.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between font-bold text-xl mb-4">
            <p>Total</p>
            <p>
              ₹ {cartDetails?.cart?.total ? cartDetails.cart.total.toFixed(2) : '0.00'}
            </p>
          </div>

          {/* Address Section */}
          <div className="mt-6 p-4 border rounded-lg border-gray-300 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
            {addressExists ? (
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-gray-700">{userDetails.address}</span>
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
            className={`w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition duration-200 ${
              !addressExists ? 'opacity-50 cursor-not-allowed' : ''
            }`}
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
