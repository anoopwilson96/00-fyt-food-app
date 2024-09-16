import React from 'react';
import { MdOutlineRestaurantMenu } from "react-icons/md";  // Dishes Icon

export const DishesAdmin = () => {
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8">
      {/* Add Dish Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-700">Add Dish</h2>
        <MdOutlineRestaurantMenu className="text-6xl text-green-600" />
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all">
          Add New Dish
        </button>
      </section>

      {/* Existing Dishes Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Existing Dishes</h2>

        {/* Dish List */}
        <div className="space-y-4">
          <article className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-600">Dish Name</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all">
              Edit
            </button>
          </article>
          
          {/* Repeat for other dishes */}
          <article className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-600">Dish Name 2</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all">
              Edit
            </button>
          </article>
        </div>
      </section>
    </main>
  );
};
