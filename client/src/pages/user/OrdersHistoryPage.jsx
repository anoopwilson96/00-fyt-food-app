import React, { useEffect, useState } from "react";

export const OrderHistoryPage = () => {
 

const [history,setHistory] = useState();

useEffect(()=>{
  const getHistory = ()=>{
    try {
      console.log("Hello")
    } catch (error) {
      console.log(error,"failed to fetch")
    }
  }
},[])


  const orders = [
    {
      orderId: "12345",
      restaurant: {
        name: "Pizza Palace",
      },
      items: [
        { dishName: "Margherita Pizza", quantity: 2 },
        { dishName: "Garlic Bread", quantity: 1 },
      ],
      totalAmount: 500,
      orderDate: "2023-09-01",
    },
    {
      orderId: "12346",
      restaurant: {
        name: "Sushi World",
      },
      items: [
        { dishName: "California Roll", quantity: 2 },
        { dishName: "Miso Soup", quantity: 1 },
      ],
      totalAmount: 850,
      orderDate: "2023-09-05",
    },
  ];


  // Function to handle rebooking an order
  const handleRebook = (orderId) => {
    console.log(`Rebooking order ${orderId}`);
    // Implement your rebooking logic here, e.g., redirect to the cart with pre-filled items
  };

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-3xl font-bold text-center mb-8">Order History</h1>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-2xl mx-auto"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {order.restaurant.name}
              </h2>
              <span className="text-sm text-gray-500">
                {new Date(order.orderDate).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 py-2"
                >
                  <p className="text-md font-medium">{item.dishName}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold mt-4">
              <p>Total Payment:</p>
              <p>₹ {order.totalAmount.toFixed(2)}</p>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700"
              onClick={() => handleRebook(order.orderId)}
            >
              Rebook
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No order history available.</p>
      )}
    </div>
  );
};
