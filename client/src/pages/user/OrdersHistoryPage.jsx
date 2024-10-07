import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axiosInstance({
          url: "cart/get",
          method: "GET",
          withCredentials: true,
        });
  
        // Assuming 'cart' is an array of orders, no need to wrap it in another array
        const sortedOrders = (response?.data?.cart || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  
        setOrders(sortedOrders);
        console.log(response?.data); // Log the fetched data for debugging
      } catch (error) {
        console.log(error, "failed to fetch");
      }
    };
  
    getHistory();
  }, []);
  

  const handleRebook = async (orderId) => {
    try {
      console.log(`Reordering ${orderId}`);
      const response = await axiosInstance({
        url: `/cart/reorder/${orderId}`,
        method: 'POST', // Use POST if creating a new order
        withCredentials: true,
      });
  
      if (response.data.success) {
        console.log("Reordered");
        navigate('/user/cart');
      } else {
        console.log('Failed to reorder');
      }
    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      console.log(`Canceling order ${orderId}`);
      const response = await axiosInstance({
        url: `/cart/cancel/${orderId}`,
        method: 'PUT',
        withCredentials: true 
      });
      
      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "cancelled" } : order
          )
        );
      } else {
        console.log("Failed to cancel order");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  // Function to style the status based on its value
  const getStatusStyle = (status) => {
    switch (status) {
      case "ordered":
        return "bg-green-100 text-green-800 border border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-300";
      case "delivered":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  // Function to style the Reorder/Cancel buttons differently
  const getButtonStyle = (status) => {
    if (status === "ordered") {
      return "bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700";
    } else {
      return "bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700";
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.status === "ordered" ||
      order.status === "cancelled" ||
      order.status === "delivered"
  );

  return (
    <div className="p-4 lg:mt-32 lg:mb-56 md:p-10">
      <h1 className="text-3xl font-bold text-center mb-8">Order History</h1>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-2xl mx-auto"
          >
            <div className="flex justify-between items-center">
              {order.restaurant ? (
                <>
                  <h2 className="text-xl font-semibold">
                    {order.restaurant.name}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </>
              ) : (
                <h2 className="text-xl font-semibold">Restaurant not available</h2>
              )}
            </div>

            {/* Status display with custom style */}
            <div
              className={`mt-2 p-2 text-center rounded-full font-semibold ${getStatusStyle(
                order.status
              )}`}
            >
              Status: {order.status}
            </div>

            <div className="mt-4">
              {order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-200 py-2"
                  >
                    <p className="text-md font-medium">{item.dish.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹ {item.price * item.quantity}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items available for this order.</p>
              )}
            </div>

            <div className="flex justify-between font-bold mt-4">
              <p>Total Payment:</p>
              <p>₹ {order.total.toFixed(2)}</p>
            </div>

            {/* Conditional Buttons based on order status */}
            {order.status === "ordered" && (
              <button
                className={getButtonStyle(order.status)} // Ordered status will show Cancel button with specific style
                onClick={() => handleCancel(order._id)}
              >
                Cancel
              </button>
            )}

            {(order.status === "cancelled" || order.status === "delivered") && (
              <button
                className={getButtonStyle(order.status)} // Cancelled or Delivered will show Reorder button with specific style
                onClick={() => handleRebook(order._id)}
              >
                Reorder
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No order history available.</p>
      )}
    </div>
  );
};
