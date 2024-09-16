import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneRestaurant, updateRestaurantAPI } from '../../../services/restaurantAPI';
import { axiosInstance } from '../../../config/axiosInstance';

export const EditRestaurant = () => {
  const { id } = useParams(); // Get restaurant ID from the URL
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  // Hook for handling multiple menu items
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'menuItems',
  });

  const [imageFile, setImageFile] = useState(null); // Image upload state
  const [currentImage, setCurrentImage] = useState(''); // Current image URL state

  // Fetch the restaurant data when the component loads
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const restaurant = await getOneRestaurant(id); // Fetch restaurant by ID

        // Reset the form with the fetched restaurant data
        reset({
          name: restaurant.name,
          cuisine: restaurant.cuisine,
          location: restaurant.location,
          phone: restaurant.phone,
          rating: restaurant.rating,
          menuItems: restaurant.menuItems.map((item) => ({ menuItem: item })),
        });

        setCurrentImage(restaurant.image); // Set current image URL
      } catch (error) {
        toast.error('Failed to load restaurant data');
      }
    };

    fetchRestaurant();
  }, [id, reset]);

 
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('cuisine', data.cuisine);
      formData.append('location', data.location);
      formData.append('phone', data.phone);
      formData.append('rating', data.rating);
  
      if (imageFile) {
        formData.append('image', imageFile);
      }
  
      // Ensure `menuItems` is formatted correctly
      data.menuItems.forEach((item) => {
        // Assuming `item.menuItem` is a string representation of an `ObjectId`
        formData.append('menuItems[]', item.menuItem);
      });
  
      console.log('Form Data being submitted:', formData);
  
      const response = await updateRestaurantAPI(formData, id);
      console.log(response, 'Restaurant updated successfully');
  
      toast.success('Restaurant updated successfully');
      navigate('/admin/manage-restaurant');
    } catch (error) {
      toast.error('Failed to update restaurant, try later');
      console.log(error, '=== failed to update');
    }
  };
  
  //Delete restaurant

  const deleteThis = async(id) =>{
    try {

      const response= await axiosInstance({
        url: 'restaurant/delete',
        method: "POST",
        withCredentials: true,
        data: {id}
      })
    console.log(response)
    toast.success("Restaurant deleted")
    navigate('/admin/manage-restaurant')
    
    } catch (error) {
      toast.error("Failed to delete")
      console.log(error,"=== delete axios failed")
    }
  }


  return (
    <div className="max-w-lg mt-10 mb-10  p-10 mx-auto  shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6">Edit Restaurant</h2>
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
          {currentImage && (
            <div className="mt-2">
              <p>Current Image:</p>
              <img src={currentImage} alt="Current Restaurant" className="w-32 h-32 object-cover" />
            </div>
          )}
        </div>

{/* Menu Items (Multiple) */}
<div className="mb-4">
  <label htmlFor="menuItems" className="block text-lg font-medium">Menu Items</label>
  {fields.map((field, index) => (
    <div key={field.id} className="flex items-center space-x-2 mb-2">
      <input
        type="text"
        {...register(`menuItems.${index}.menuItem.name`, { required: 'Menu item is required' })} // Extract 'name' or appropriate property
        placeholder="Enter menu item name"
        className="input input-bordered w-full"
      />
      <button
        type="button"
        onClick={() => remove(index)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => append({ menuItem: { name: '' } })}  // Append a blank object with 'name' property
    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
  >
    Add Menu Item
  </button>
</div>
<div className='flex flex-col'>

<button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
        >
          Update Restaurant
        </button>
</div>



      </form>
      <button onClick={() => deleteThis(id)} className=' w-40 btn bg-red-700 text-black mt-10'>
          DELETE RESTAURANT
        </button>
  
    </div>
  );
};
