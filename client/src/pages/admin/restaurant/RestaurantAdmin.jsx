import React, { useState, useEffect } from 'react';
import { MdOutlineAddBusiness } from "react-icons/md";
import { axiosInstance } from '../../../config/axiosInstance'; // Ensure axiosInstance is properly configured
import { getAllRestaurants } from '../../../services/restaurantAPI';
import { Link } from 'react-router-dom';

export const RestaurantAdmin = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getAllRestaurantsAdmin = async () => {
      try {
        const response = await getAllRestaurants(); 
        setRestaurants(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
    getAllRestaurantsAdmin();
  }, []);

  return (
    <>
      <main className="mx-auto max-w-4xl p-6 space-y-8">
        {/* Add Restaurant Section */}
        <section className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-700">Add Restaurant</h2>
          <MdOutlineAddBusiness className="text-6xl text-green-600" />
          <Link to={'/admin/manage-restaurant/add-restaurant'}>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all">
            Add New Restaurant
          </button>
          </Link>
        </section>

        {/* Existing Restaurants Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Existing Restaurants</h2>

          {/* Restaurant List */}
          <div className="space-y-4">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <article
                  key={restaurant._id} // Assuming each restaurant has a unique `id`
                  className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-600">{restaurant.name}</h3>
                  <Link to={`/admin/manage-restaurant/${restaurant._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all">
                    Edit
                  </button>
                  </Link>

                </article>
              ))
            ) : (
              <p>No restaurants found.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};
