import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {getOneMenuItem} from "../../../services/menuItemsAPI";
import { getAllRestaurants } from "../../../services/restaurantAPI";
import { getAllDishesAPI } from "../../../services/DishAPI";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../config/axiosInstance";

const EditMenuItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const [menuData, setMenuData] = useState(null);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [removedRestaurants, setRemovedRestaurants] = useState([]);
  const [removedDishes, setRemovedDishes] = useState([]);

  // Fetch the menu item details by ID
  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const data = await getOneMenuItem(id);
        if (data) {
          setMenuData(data);
          reset({
            name: data.name,
            description: data.description,
            restaurant: data.restaurant.map(item=>({id:item._id, name: item.name})),
            dish: data.dish.map(item=>({id: item._id , name: item.name}))
          });

        }
      } catch (error) {
        console.error("Failed to fetch menu item data", error);
      }
    };
    fetchMenuItem();
  }, [id, reset]);


  // Fetch all restaurants and dishes
useEffect(() => {
  const fetchRestaurants = async () => {
    try {
      const restaurants = await getAllRestaurants();
      setAllRestaurants(restaurants || []);
    } catch (error) {
      console.error("Error fetching restaurants", error);
    }
  };

  const fetchDishes = async () => {
    try {
      const dishes = await getAllDishesAPI();
      setAllDishes(dishes || []);
    } catch (error) {
      console.error("Error fetching dishes", error);
    }
  };

  fetchRestaurants();
  fetchDishes();
}, []);



  // Handle image selection
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Handle restaurant selection
  const handleRestaurantChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedRestaurants(selectedOptions);
  };

  // Handle dish selection
  const handleDishChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedDishes(selectedOptions);
  };

  // Handle removing a restaurant
  const handleRemoveRestaurant = (restaurantId) => {
    setRemovedRestaurants((prev) => [...prev, restaurantId]);
    };

  // Handle removing a dish
  const handleRemoveDish = (dishId) => {
    setRemovedDishes((prev) => [...prev, dishId]);
  };

  // Submit the updated menu item
const onSubmit = async (formData) => {

  const updateData = new FormData();
  updateData.append("name", formData.name);
  updateData.append("description", formData.description);

  selectedRestaurants.forEach((item,index) =>
    updateData.append(`addRestaurants[${index}]`, item));

  selectedDishes.forEach((item,index) =>
    updateData.append(`addDishes[${index}]`, item));

  removedRestaurants.forEach((item,index) =>
    updateData.append(`removeRestaurants[${index}]`, item)
  );
  removedDishes.forEach((item,index) =>
    updateData.append(`removeDishes[${index}]`, item)
  );

  if (selectedImage) {
    updateData.append("image", selectedImage);
  }


  try {

    const response = await axiosInstance({
      url: `/menu-item/update/${id}`,
      method:"PATCH",
      withCredentials:true,
      data: updateData,
      headers: { "Content-Type": "multipart/form-data" }
    })
    
    console.log(updateData, "===updateData")
   
    if (response?.data?.success) {
      toast.success("Menu item updated successfully");
      navigate("/admin/manage-menu");

  }} catch (error) {
    toast.error("An error occurred while updating the menu item");
    console.error("Error:", error);
  }
};

  // Handle delete restaurant
  const deleteThis = async () => {
    try {
      const response = await axiosInstance({
        url: "/menu-item/delete",
        method: "DELETE",
        withCredentials: true,
        data: {id},
      });
      toast.success("Menu Item deleted");
      navigate("/admin/manage-menu");
    } catch (error) {
      toast.error("Failed to delete restaurant");
      console.log(error);
    }
  };



  return (
    <div className="max-w-lg mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6">Edit Menu Item</h2>
     
      {menuData ? (
         <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">Name</label>
            <input
              {...register("name")}
              className="input input-bordered"
              placeholder="Menu Item Name"
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              {...register("description")}
              className="input input-bordered"
              placeholder="Menu Item Description"
            />
          </div>

          {/* Current Image */}
          <div className="form-control">
            <label className="label">Current Image</label>
            {menuData?.image && (
              <img
                src={menuData.image}
                alt="Menu Item"
                className="w-32 h-32 object-cover mb-2"
              />
            )}
            <label className="label">Change Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="input input-bordered"
            />
          </div>

          {/* Current Restaurants */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Current Restaurants</h4>
            {menuData.restaurant.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-2"
              >
                <span
                  className={
                    removedRestaurants.includes(item._id) ? "line-through" : ""
                  }
                >
                  {item.name}
                </span>
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => handleRemoveRestaurant(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add Restaurants */}
          <div className="form-control">
            <label className="label">Add New Restaurants</label>
            <select
              multiple
              onChange={handleRestaurantChange}
              className="input input-bordered w-full h-40"
            >
              {allRestaurants.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {/* Display selected Restaurants */}
            {selectedRestaurants.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium">Selected Restaurants:</h4>
                <ul className="list-disc list-inside">
                  {selectedRestaurants.map((itemId) => {
                    const item = allRestaurants.find(
                      (item) => item._id === itemId
                    );
                    return <li key={itemId}>{item?.name}</li>;
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Current Dishes */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Current Dishes</h4>
            {menuData.dish.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-2"
              >
                <span
                  className={
                    removedDishes.includes(item._id) ? "line-through" : ""
                  }
                >
                  {item.name}
                </span>
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => handleRemoveDish(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add Dishes */}
          <div className="form-control">
            <label className="label">Add New Dishes</label>
            <select
              multiple
              onChange={handleDishChange}
              className="input input-bordered w-full h-40"
            >
              {allDishes.map((dish) => (
                <option key={dish._id} value={dish._id}>
                  {dish.name}
                </option>
              ))}
            </select>
          </div>
          <div>
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
          <button type="submit" className="btn btn-success w-full">
            Update Menu Item
          </button>
        </form>
                  <button
                  onClick={deleteThis}
                  className="w-40 btn bg-red-700 text-black mt-10"
                >
                  DELETE MENU ITEM
                </button> </div>
      ) : (
        <p>Loading menu item data...</p>
      )}
    </div>
  );
};

export default EditMenuItem;
