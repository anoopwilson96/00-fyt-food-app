import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDishAPI, getDishAPI, updateDishAPI } from '../../../services/DishAPI';
import { getAllMenuItems } from '../../../services/menuItemsAPI';

const EditDish = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [dishData, setDishData] = useState();
  const [selectedImage, setSelectedImage] = useState(null); // Image upload state
  const [currentImage, setCurrentImage] = useState(''); // Current image URL state

  
  
  // Fetch dish data when the component loads
  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await getDishAPI(id);
        if (response) {
          const dishData = response;
          console.log(response);
          setDishData(response);
          reset({
            name: dishData.name,
            description: dishData.description,
            price: dishData.price,

          });

        }
      } catch (error) {
        toast.error('Failed to load dish data');
        console.error(error);
      }
    };

    // const fetchMenuItems = async () => {
    //   try {
    //     const response = await getAllMenuItems();
    //     setMenuItems(response);
    //     console.log(response, "menuItems");
    //   } catch (error) {
    //     console.error('Failed to fetch menu items', error);
    //   }
    // };

    // Call both functions
    fetchDish();
    // fetchMenuItems();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      // formData.append('menuItem', selectedMenuItem); // Pass the correct ObjectId for the menu item
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
  
      const response = await updateDishAPI(id, formData);  // Make sure 'id' is a valid ObjectId
  
      if (response.success === true) {
        toast.success('Dish updated successfully!');
        reset();  // Reset form fields
        navigate('/admin/manage-dishes');
      } else {
        toast.error('Failed to update dish.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the dish.');
      console.error(error);
    }
  };
  
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // const handleMenuItemChange = (e) => {
  //   setSelectedMenuItem(e.target.value); // Update selected menu item when a new option is selected
  // };

  // Delete Dish
  const deleteThis = async (id) => {
    try {
      const response = await deleteDishAPI(id);
      console.log(response);
      toast.success('Dish deleted');
      navigate('/admin/manage-dishes');
    } catch (error) {
      toast.error('Failed to delete Dish item');
      console.log(error, '=== delete failed');
    }
  };

  return (
    <div className="max-w-lg mt-10 mb-10 p-10 mx-auto shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6">Edit Dish</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Dish Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Dish name is required' })}
            placeholder="Enter dish name"
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

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-medium">Price</label>
          <input
            type="number"
            id="price"
            {...register('price', { required: 'Price is required' })}
            placeholder="Enter price"
            className={`input input-bordered w-full ${errors.price ? 'border-red-500' : ''}`}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>




        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-medium">Dish Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="input input-bordered w-full"
          />
          {currentImage && (
            <div className="mt-2">
              <p>Current Image:</p>
              <img src={currentImage} alt="Current Dish" className="w-32 h-32 object-cover" />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
          >
            Update Dish
          </button>
        </div>
      </form>

      {/* Delete Button */}
      <button onClick={() => deleteThis(id)} className="w-40 btn bg-red-700 text-black mt-10">
        DELETE DISH
      </button>
    </div>
  );
};

export default EditDish;
