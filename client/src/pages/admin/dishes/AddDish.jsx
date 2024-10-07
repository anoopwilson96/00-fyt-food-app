import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addDishAPI } from '../../../services/DishAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAllMenuItems } from '../../../services/menuItemsAPI';

const AddDish = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  // Define states
  const [selectedImage, setSelectedImage] = useState(null);
  // const [menuItems, setMenuItems] = useState([]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // useEffect(() => {
  //   const fetchMenuItems = async () => {
  //     try {
  //       const response = await getAllMenuItems();
  //       setMenuItems(response);
  //       console.log(response, "menuItems");
  //     } catch (error) {
  //       console.error('Failed to fetch menu items', error);
  //     }
  //   };

  //   fetchMenuItems();
  // }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append fields
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      // formData.append('menuItem', data.menuItem); // Capture the menuItem from the form

      // Append image if it exists
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await addDishAPI(formData);
      console.log(formData);
      if (response.success === true) {
        toast.success('Dish added successfully!');
        reset(); // Reset form fields
        navigate('/admin/manage-menu');
      } else {
        toast.error('Failed to add dish.');
      }
    } catch (error) {
      toast.error('An error occurred while adding the dish.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Dish</h2>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            placeholder="Enter dish name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            {...register('description')}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            placeholder="Enter dish description"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            {...register('price', { required: true })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            placeholder="Enter dish price"
          />
        </div>

        {/* Menu Items  */}
        {/* <div className="mb-4">
          <label htmlFor="menuItems" className="block text-lg font-medium">Menu Items</label>
          <select
            id="menuItems"
            defaultValue={'DEFAULT'}
            {...register('menuItem', { required: true })} // 
            className="input input-bordered w-full"
          >
          <option value="DEFAULT" disabled>Select Menu Item</option>
            {menuItems.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </div> */}

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
        >
          Add Dish
        </button>
      </form>
    </div>
  );
};

export default AddDish;
