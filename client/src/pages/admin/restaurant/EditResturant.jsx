import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getOneRestaurant } from "../../../services/restaurantAPI";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";
import "tailwindcss/tailwind.css"; // Include Tailwind CSS for styling

const EditRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]); // New menu items to add
  const [selectedRemoveMenuItems, setSelectedRemoveMenuItems] = useState([]); // Menu items to remove
  const [imageFile, setImageFile] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // Fetch available menu items for selection
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/menu-item/all");
        setMenuItems(response?.data?.data);
      } catch (error) {
        console.log(error, "Failed to fetch menu items");
      }
    };
    fetchData();
  }, []);

  // Fetch restaurant data by ID
  useEffect(() => {
    const fetchRestaurant = async () => {
      const data = await getOneRestaurant(id);
      if (data) {
        setRestaurantData(data);
        reset({
          name: data.name,
          cuisine: data.cuisine,
          location: data.location,
          phone: data.phone,
          rating: data.rating,
          menuItems: data.menuItems.map((item) => ({
            id: item._id,
            name: item.name,
          })), // Current menu items
        });
      }
    };
    fetchRestaurant();
  }, [id, reset]);

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Handle adding new menu items
  const handleMenuItemChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedMenuItems(selectedOptions);
  };

  // Handle removing menu items from the existing list (visual strike-through)
  const handleRemoveMenuItem = (menuItemId) => {
    setSelectedRemoveMenuItems((prev) => [...prev, menuItemId]);
  };

  // Handle form submission
  const onSubmit = async (formData) => {
    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("cuisine", formData.cuisine);
    updatedData.append("location", formData.location);
    updatedData.append("phone", formData.phone);
    updatedData.append("rating", formData.rating);

    selectedMenuItems.forEach((item, index) => {
      updatedData.append(`addMenuItems[${index}]`, item);
    });

    selectedRemoveMenuItems.forEach((item, index) => {
      updatedData.append(`removeMenuItems[${index}]`, item);
    });

    // Add image to the form data if an image is selected
    if (imageFile) {
      updatedData.append("image", imageFile);
    }

    try {
      const response = await axiosInstance.patch(
        `/restaurant/update/${id}`,
        updatedData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response?.data?.success) {
        toast.success("Restaurant updated successfully");
        navigate("/admin/manage-restaurant");
      }
    } catch (error) {
      toast.error("Failed to update restaurant");
      console.log(error);
    }
  };

  // Handle delete restaurant
  const deleteThis = async () => {
    try {
      const response = await axiosInstance({
        url: "/restaurant/delete",
        method: "DELETE",
        withCredentials: true,
        data: { id },
      });
      toast.success("Restaurant deleted");
      navigate("/admin/manage-restaurant");
    } catch (error) {
      toast.error("Failed to delete restaurant");
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 ">
      <h2 className="text-2xl font-semibold mb-6">Edit Restaurant</h2>
      {restaurantData ? (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Restaurant Details */}
            <div className="form-control">
              <label className="label">Name</label>
              <input
                {...register("name")}
                className="input input-bordered"
                placeholder="Restaurant Name"
              />
            </div>

            <div className="form-control">
              <label className="label">Cuisine</label>
              <input
                {...register("cuisine")}
                className="input input-bordered"
                placeholder="Cuisine"
              />
            </div>

            <div className="form-control">
              <label className="label">Location</label>
              <input
                {...register("location")}
                className="input input-bordered"
                placeholder="Location"
              />
            </div>

            <div className="form-control">
              <label className="label">Phone</label>
              <input
                {...register("phone")}
                className="input input-bordered"
                placeholder="Phone Number"
              />
            </div>

            <div className="form-control">
              <label className="label">Rating</label>
              <input
                type="number"
                {...register("rating")}
                step="0.1"
                min="0"
                max="5"
                className="input input-bordered"
                placeholder="Rating"
              />
            </div>

            {/* Current Image */}
            <div className="form-control">
              <label className="label">Current Image</label>
              {restaurantData?.image && (
                <img
                  src={restaurantData.image}
                  alt="Restaurant"
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

            {/* Current Menu Items */}
            <div>
              <h4 className="text-xl font-semibold mb-2">Current Menu Items</h4>
              {restaurantData.menuItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center mb-2"
                >
                  <span
                    className={
                      selectedRemoveMenuItems.includes(item._id)
                        ? "line-through"
                        : ""
                    }
                  >
                    {item.name}
                  </span>
                  <button
                    type="button"
                    className="btn btn-error"
                    onClick={() => handleRemoveMenuItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* New Menu Items (Multiple Selection) */}
            <div className="form-control">
              <label className="label">Add New Menu Items</label>
              <select
                multiple
                onChange={handleMenuItemChange}
                className="input input-bordered w-full h-40"
              >
                {menuItems.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>

              {/* Display Selected New Menu Items */}
              {selectedMenuItems.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-medium">Selected New Menu Items:</h4>
                  <ul className="list-disc list-inside">
                    {selectedMenuItems.map((itemId) => {
                      const item = menuItems.find(
                        (item) => item._id === itemId
                      );
                      return <li key={itemId}>{item?.name}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>

            {/* Submit and Delete Buttons */}
            <button type="submit" className="btn btn-success w-full">
              Update Restaurant
            </button>
          </form>
          <button
            onClick={deleteThis}
            className="w-40 btn bg-red-700 text-black mt-10"
          >
            DELETE RESTAURANT
          </button>
        </div>
      ) : (
        <p>Loading restaurant data...</p>
      )}
    </div>
  );
};

export default EditRestaurant;
