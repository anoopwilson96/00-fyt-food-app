import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

export const AdminHome = () => {
  return (
    <>
      <main className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Manage Restaurants Section */}

        <Link  to={'/admin/manage-restaurant'} >
        <section className="flex flex-row justify-center items-center align-top space-x-2 bg-neutral-100 p-4 rounded-lg shadow-md">
         <h2 className="text-lg font-semibold">Manage Restaurant</h2>
          <FaArrowRight />
        </section>
        </Link> 

        {/* Another Manage Restaurant Section */}
        
        <Link  to={'/admin/manage-menu'} >
        <section className="flex flex-row justify-center items-center space-x-2 bg-neutral-100 p-4 rounded-lg shadow-md">
         <h2 className="text-lg font-semibold">Manage Menu Items</h2>
          <FaArrowRight />
        </section>
        </Link>  

        {/* Another Manage Restaurant Section */}

        <Link  to={'/admin/manage-dishes'} >
        <section className="flex flex-row justify-center items-center space-x-2 bg-neutral-100 p-4 rounded-lg shadow-md">
         <h2 className="text-lg font-semibold">Manage Dishes</h2>
          <FaArrowRight />
        </section>
        </Link> 

        {/* Manage Users Section */}

        {/* <Link  to={'/admin/manage-users'} >
        <section className="flex flex-row justify-center items-center space-x-2 bg-neutral-100 p-4 rounded-lg shadow-md">
         <h2 className="text-lg font-semibold">Manage Users</h2>
          <FaArrowRight />
        </section>
        </Link>   */}

      </main>
    </>
  );
};
