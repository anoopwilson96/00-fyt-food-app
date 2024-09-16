import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { AddMenuItemsAPI } from '../../../services/menuItemsAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddMenuItems = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const navigate = useNavigate()
  const { fields: restaurantFields, append: appendRestaurant } = useFieldArray({
    control,
    name: 'restaurant',
  });
  const { fields: dishFields, append: appendDish } = useFieldArray({
    control,
    name: 'dish',
  });

  const [selectedImage, setSelectedImage] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append('name', data.name);
      formData.append('description', data.description);

      // Append restaurant and dish arrays
      data.restaurant.forEach((restaurantId) => formData.append('restaurant', restaurantId));
      data.dish.forEach((dishId) => formData.append('dish', dishId));

      // Append image file if exists
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      // Call API to add the menu item
      const response = await AddMenuItemsAPI(formData);

      if (response?.data?.success) {
        toast.success('Menu item added successfully!');
        reset();  // Reset form fields
        navigate('/admin/manage-menu/add-menu')
        
        setSelectedImage(null);  // Clear the selected image
      } else {
        toast.error('Failed to add menu item.');
      }
    } catch (error) {
      toast.error('An error occurred while adding the menu item.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Menu Item</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            placeholder="Enter menu item name"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            placeholder="Enter menu item description"
          />
        </div>

        {/* Restaurants */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Restaurants</label>
          {restaurantFields.map((item, index) => (
            <div key={item.id} className="flex items-center mb-2">
              <input
                type="text"
                {...register(`restaurant.${index}`, { required: true })}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                placeholder="Enter restaurant ID"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendRestaurant('')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Restaurant
          </button>
        </div>

        {/* Dishes */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Dishes</label>
          {dishFields.map((item, index) => (
            <div key={item.id} className="flex items-center mb-2">
              <input
                type="text"
                {...register(`dish.${index}`, { required: true })}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                placeholder="Enter dish ID"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendDish('')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Dish
          </button>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
        >
          Add Menu Item
        </button>
      </form>
    </div>
  );
};

export default AddMenuItems;
