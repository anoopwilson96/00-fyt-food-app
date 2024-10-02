import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AddRestaurantAPI } from '../../../services/restaurantAPI';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosInstance';

export const AddRestaurant = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]); // Store selected menu items

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState(null); // Image upload state

  // Fetch menu items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance({
          url: "/menu-item/all",
          method: "GET",
        });
        setMenuItems(response?.data?.data);
        console.log(response.data.data, "menuItems");
      } catch (error) {
        console.log(error, "Axios failed to fetch menu items");
      }
    };
    fetchData();
  }, []);

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('cuisine', data.cuisine);
      formData.append('location', data.location);
      formData.append('phone', data.phone);
      formData.append('rating', data.rating);
      if (imageFile) formData.append('image', imageFile); // Add image file

      // Add all selected menu items to formData
      selectedMenuItems.forEach((item) => {
        formData.append('menuItems[]', item);
      });

      const response = await AddRestaurantAPI(formData); // API call to add restaurant
      toast.success('Restaurant added successfully');
      navigate('/admin/manage-restaurant');

    } catch (error) {

      toast.error('Failed to add restaurant, try later');
      console.log(error, '=== failed to add');
      
    }
  };


  // Handle menu item selection
  const handleMenuItemChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedMenuItems(selectedOptions); // Update selected items array
  };

  return (
    <div className="max-w-lg mx-auto p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6">Add New Restaurant</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Restaurant Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Restaurant name is required' })}
            placeholder="Enter restaurant name"
            className={`input input-bordered w-full ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Cuisine */}
        <div className="mb-4">
          <label htmlFor="cuisine" className="block text-lg font-medium">Cuisine</label>
          <input
            type="text"
            id="cuisine"
            {...register('cuisine', { required: 'Cuisine type is required' })}
            placeholder="Enter cuisine type"
            className={`input input-bordered w-full ${errors.cuisine ? 'border-red-500' : ''}`}
          />
          {errors.cuisine && <p className="text-red-500 text-sm">{errors.cuisine.message}</p>}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-lg font-medium">Location</label>
          <input
            type="text"
            id="location"
            {...register('location', { required: 'Location is required' })}
            placeholder="Enter location"
            className={`input input-bordered w-full ${errors.location ? 'border-red-500' : ''}`}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-lg font-medium">Phone</label>
          <input
            type="text"
            id="phone"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: { value: /^[0-9]+$/, message: 'Invalid phone number format' },
            })}
            placeholder="Enter phone number"
            className={`input input-bordered w-full ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-lg font-medium">Rating (0-5)</label>
          <input
            type="number"
            id="rating"
            {...register('rating', {
              required: 'Rating is required',
              min: { value: 0, message: 'Rating must be at least 0' },
              max: { value: 5, message: 'Rating must be no more than 5' },
            })}
            placeholder="Enter rating"
            className={`input input-bordered w-full ${errors.rating ? 'border-red-500' : ''}`}
            min="0"
            max="5"
          />
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-medium">Restaurant Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImageFile(e.target.files[0])} // Capture the uploaded image file
            className="input input-bordered w-full"
          />
        </div>

        {/* Menu Items (Multiple Selection) */}
        <div className="mb-4">
          <label htmlFor="menuItems" className="block text-lg font-medium">Menu Items</label>
          <select
            multiple
            id="menuItems"
            defaultValue={'DEFAULT'}
            onChange={handleMenuItemChange}
            className="input input-bordered w-full  h-40"
          >
             <option value="DEFAULT" disabled>Select menu item</option>
            {menuItems.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>

          {/* Display selected menu items */}
          {selectedMenuItems.length > 0 && (
            <div className="mt-2">
              <h4 className="font-medium">Selected Menu Items:</h4>
              <ul className="list-disc list-inside">
                {selectedMenuItems.map((itemId) => {
                  const item = menuItems.find((item) => item._id === itemId);
                  return <li key={itemId}>{item?.name}</li>;
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};
