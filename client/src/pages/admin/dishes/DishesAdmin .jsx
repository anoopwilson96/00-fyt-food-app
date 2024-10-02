import React, { useState, useEffect } from 'react';
import { MdOutlineRestaurantMenu } from "react-icons/md";  
import { Link } from 'react-router-dom';
import { getAllDishesAPI } from '../../../services/DishAPI';

export const DishesAdmin = () => {
  const [dishes, setDishes] = useState([]);

  // Fetch all dishes when the component mounts
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await getAllDishesAPI();
        setDishes(response); 
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };
    fetchDishes();
  }, []);

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8">
      {/* Add Dish Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-700">Add Dish</h2>
        <MdOutlineRestaurantMenu className="text-6xl text-green-600" />
        <Link to={'/admin/manage-dishes/add-dish'}>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all">
            Add New Dish
          </button>
        </Link>
      </section>

      {/* Existing Dishes Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Existing Dishes</h2>

        {/* Dish List */}
        <div className="space-y-4">
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <article key={dish._id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-600">{dish.name}</h3>
                <Link to={`/admin/manage-dishes/${dish._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all">
                    Edit
                  </button>
                </Link>
              </article>
            ))
          ) : (
            <p>No dishes found.</p>
          )}
        </div>
      </section>
    </main>
  );
};
