import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import { FaUtensils, FaConciergeBell, FaHamburger } from 'react-icons/fa';

export const AdminHome = () => {
  return (
    <main className="mx-auto max-w-5xl grid grid-cols-1 gap-6 p-6 lg:mb-44 lg:mt-44">
      {/* Manage Restaurants Section */}
      <Link to={'/admin/manage-restaurant'}>
        <section className="flex items-center justify-between bg-white p-6 rounded-lg shadow-lg hover:bg-neutral-200 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <FaConciergeBell className="text-blue-500" size={24} />
            <h2 className="text-lg font-semibold text-gray-800">Manage Restaurant</h2>
          </div>
          <FaArrowRight className="text-blue-500" size={20} />
        </section>
      </Link>

      {/* Manage Menu Items Section */}
      <Link to={'/admin/manage-menu'}>
        <section className="flex items-center justify-between bg-white p-6 rounded-lg shadow-lg hover:bg-neutral-200 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <FaUtensils className="text-green-500" size={24} />
            <h2 className="text-lg font-semibold text-gray-800">Manage Menu Items</h2>
          </div>
          <FaArrowRight className="text-green-500" size={20} />
        </section>
      </Link>

      {/* Manage Dishes Section */}
      <Link to={'/admin/manage-dishes'}>
        <section className="flex items-center justify-between bg-white p-6 rounded-lg shadow-lg hover:bg-neutral-200 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <FaHamburger className="text-red-500" size={24} />
            <h2 className="text-lg font-semibold text-gray-800">Manage Dishes</h2>
          </div>
          <FaArrowRight className="text-red-500" size={20} />
        </section>
      </Link>

    </main>
  );
};
