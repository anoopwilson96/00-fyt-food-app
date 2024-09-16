import React, { useState, useEffect } from 'react';
import { MdOutlineMenuBook } from "react-icons/md";
import { getAllMenuItems } from '../../../services/menuItemsAPI'; // Make sure this API call is set up
import { Link } from 'react-router-dom';

export const MenuAdmin = () => {
  const [menuItems, setMenuItems] = useState([]);

  // Fetch all menu items when the component mounts
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await getAllMenuItems(); 
        setMenuItems(response); 
        console.log(response); 
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8">
      {/* Add Menu Item Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-700">Add Menu Item</h2>
        <MdOutlineMenuBook className="text-6xl text-green-600" />
        <Link to={'/admin/manage-menu/add-menu'}>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all">
            Add New Menu Item
          </button>
        </Link>
      </section>

      {/* Existing Menu Items Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Existing Menu Items</h2>

        {/* Menu Item List */}
        <div className="space-y-4">
          {menuItems.length > 0 ? (
            menuItems.map((menuItem) => (
              <article
                key={menuItem._id} // Assuming each menu item has a unique `_id`
                className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold text-gray-600">{menuItem.name}</h3>
                <Link to={`/admin/manage-menu/${menuItem._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all">
                    Edit
                  </button>
                </Link>
              </article>
            ))
          ) : (
            <p>No menu items found.</p>
          )}
        </div>
      </section>
    </main>
  );
};
