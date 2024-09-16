import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneMenuItem, updateMenuItemAPI, deleteMenuItemAPI } from '../../../services/menuItemsAPI';
import { axiosInstance } from '../../../config/axiosInstance';

export const EditMenuItem = () => {
  const { id } = useParams(); // Get menu item ID from the URL
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  // Hook for handling multiple dishes
  const { fields: dishFields, append: appendDish, remove: removeDish } = useFieldArray({
    control,
    name: 'dish',
  });

  const [imageFile, setImageFile] = useState(null); // Image upload state
  const [currentImage, setCurrentImage] = useState(''); // Current image URL state

  // Fetch the menu item data when the component loads
  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const menuItem = await getOneMenuItem(id); // Fetch menu item by ID

        // Reset the form with the fetched menu item data
        reset({
          name: menuItem.name,
          description: menuItem.description,
          restaurant: menuItem.restaurant.map((res) => ({ id: res._id })),
          dish: menuItem.dish.map((item) => ({ id: item._id, name: item.name })),
        });

        setCurrentImage(menuItem.image); // Set current image URL
      } catch (error) {
        toast.error('Failed to load menu item data');
      }
    };

    fetchMenuItem();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);

      // Append restaurant IDs
      data.restaurant.forEach((res) => {
        formData.append('restaurant[]', res.id);
      });

      // Append dish IDs
      data.dish.forEach((dish) => {
        formData.append('dish[]', dish.id);
      });

      if (imageFile) {
        formData.append('image', imageFile);
      }

      console.log('Form Data being submitted:', formData);

      const response = await updateMenuItemAPI(formData, id);
      console.log(response, 'Menu item updated successfully');

      toast.success('Menu item updated successfully');
      navigate('/admin/manage-menu');
    } catch (error) {
      toast.error('Failed to update menu item, try later');
      console.log(error, '=== failed to update');
    }
  };

  // Delete menu item
  const deleteThis = async (id) => {
    try {
      const response = await deleteMenuItemAPI(id);
      console.log(response);
      toast.success('Menu item deleted');
      navigate('/admin/manage-menu');
    } catch (error) {
      toast.error('Failed to delete menu item');
      console.log(error, '=== delete failed');
    }
  };

  return (
    <div className="max-w-lg mt-10 mb-10 p-10 mx-auto shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6">Edit Menu Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Menu Item Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Menu item name is required' })}
            placeholder="Enter menu item name"
            className={`input input-bordered w-full ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            placeholder="Enter description"
            className={`input input-bordered w-full ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-medium">Menu Item Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImageFile(e.target.files[0])} // Capture the uploaded image file
            className="input input-bordered w-full"
          />
          {currentImage && (
            <div className="mt-2">
              <p>Current Image:</p>
              <img src={currentImage} alt="Current Menu Item" className="w-32 h-32 object-cover" />
            </div>
          )}
        </div>

        {/* Restaurant IDs */}
        <div className="mb-4">
          <label htmlFor="restaurant" className="block text-lg font-medium">Restaurant (IDs)</label>
          <input
            type="text"
            id="restaurant"
            {...register('restaurant[0].id', { required: 'At least one restaurant is required' })}
            placeholder="Enter restaurant ID"
            className={`input input-bordered w-full ${errors.restaurant ? 'border-red-500' : ''}`}
          />
          {errors.restaurant && <p className="text-red-500 text-sm">{errors.restaurant.message}</p>}
        </div>

        {/* Dishes (Multiple) */}
        <div className="mb-4">
          <label htmlFor="dish" className="block text-lg font-medium">Dishes</label>
          {dishFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                {...register(`dish.${index}.id`, { required: 'Dish ID is required' })}
                placeholder="Enter dish ID"
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => removeDish(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendDish({ id: '' })}  // Append a blank object with 'id' property
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
          >
            Add Dish
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
          >
            Update Menu Item
          </button>
        </div>
      </form>

      {/* Delete Button */}
      <button onClick={() => deleteThis(id)} className="w-40 btn bg-red-700 text-black mt-10">
        DELETE MENU ITEM
      </button>
    </div>
  );
};
