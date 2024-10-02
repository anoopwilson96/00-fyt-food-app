import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddMenuItemsAPI, getAllMenuItems } from '../../../services/menuItemsAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAllRestaurants } from '../../../services/restaurantAPI';
import { getAllDishesAPI } from '../../../services/DishAPI';

const AddMenuItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const [allRestaurants, setAllRestaurants] = useState([]); // Initialized as empty array
  const [allDishes, setAllDishes] = useState([]); // Initialized as empty array
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]); 
  const [selectedDishes, setSelectedDishes] = useState([]); 
  const navigate = useNavigate();

  // Fetch restaurants
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRestaurants();
        setAllRestaurants(response || []); // Ensure it's set to an array
      } catch (error) {
        console.log("Error fetching Restaurant list", error);
      }
    }

    
    fetchData();
  }, []);

  // Fetch dishes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDishesAPI();
        setAllDishes(response|| []); // Ensure it's set to an array
      } catch (error) {
        console.log("Error fetching Dishes list", error);
      }
    };
    fetchData();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Handle restaurant selection
  const handleRestaurantChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedRestaurants(selectedOptions);
  };

  // Handle dish selection
  const handleDishChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedDishes(selectedOptions);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append('name', data.name);
      formData.append('description', data.description);

      // Append restaurant and dish arrays
      selectedRestaurants.forEach((restaurantId) => formData.append('restaurant', restaurantId));
      selectedDishes.forEach((dishId) => formData.append('dish', dishId));

      // Append image file if exists
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      // Call API to add the menu item
      const response = await AddMenuItemsAPI(formData);

      if (response?.data?.success) {
        toast.success('Menu item added successfully!');
        reset(); 
        navigate('/admin/manage-menu');
        setSelectedImage(null);  
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

        {/* Restaurants */}
        <div className="mb-4">
          <label htmlFor="restaurants" className="block text-lg font-medium">Choose Restaurants</label>
          <select
            multiple
            id="restaurants"
            onChange={handleRestaurantChange}
            className="input input-bordered w-full h-40"
          >
            {Array.isArray(allRestaurants) && allRestaurants.length > 0 ? (
              allRestaurants.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))
            ) : (
              <option disabled>No Restaurants available</option>
            )}
          </select>

          {/* Display selected Restaurants */}
          {selectedRestaurants.length > 0 && (
            <div className="mt-2">
              <h4 className="font-medium">Selected Restaurants:</h4>
              <ul className="list-disc list-inside">
                {selectedRestaurants.map((itemId) => {
                  const item = allRestaurants.find((item) => item._id === itemId);
                  return <li key={itemId}>{item?.name}</li>;
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Dishes */}
        <div className="mb-4">
          <label htmlFor="dishes" className="block text-lg font-medium">Choose Dishes</label>
          <select
            multiple
            id="dishes"
            onChange={handleDishChange}
            className="input input-bordered w-full h-40"
          >
            {Array.isArray(allDishes) && allDishes.length > 0 ? (
              allDishes.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))
            ) : (
              <option disabled>No Dishes available</option>
            )}
          </select>

          {/* Display selected Dishes */}
          {selectedDishes.length > 0 && (
            <div className="mt-2">
              <h4 className="font-medium">Selected Dishes:</h4>
              <ul className="list-disc list-inside">
                {selectedDishes.map((itemId) => {
                  const item = allDishes.find((item) => item._id === itemId);
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
          Add Menu Item
        </button>
      </form>
    </div>
  );
};

export default AddMenuItems;
