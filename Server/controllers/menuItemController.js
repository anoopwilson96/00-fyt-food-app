import { MenuItem } from "../models/menuItemModel.js";
import { Restaurant } from "../models/restaurantModel.js";
import { Dish } from "../models/dishModel.js";
import { imageUploadCloudinary } from "../utils/cloudinaryUpload.js"; // Ensure you have this utility function to handle the Cloudinary upload
import multer from "multer";



export const addMenuItem = async (req, res, next) => {
  try {
    const {name, description, restaurant, dish, image } = req.body ;


    // Upload image to Cloudinary if provided
    const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;

    const newMenuItem = new MenuItem({
      name,
      description,
      restaurant ,
      dish ,
      image: imageUrl || image
    });

    await newMenuItem.save();

    res.status(201).json({ success: true, message: "Menu Item created successfully", data: newMenuItem });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};






// Get a Menu Item by ID
export const getMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
   
    const menuItem = await MenuItem.findById(id)
      .populate('restaurant')
      .populate('dish');

    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu Item not found" });
    }

    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};


// Get All Menu Items
export const getAllMenuItems = async (req, res, next) => {
  try {
    const menuItems = await MenuItem.find()
      // .populate('restaurant')
      // .populate('dish');

    if (!menuItems || menuItems.length===0) {
      return res.status(404).json({ success: false, message: "No menu items found" });
    }

    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};



// Update a Menu Item by ID using findByIdAndUpdate
export const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, restaurant, dish, image } = req.body;

    // Upload new image to Cloudinary if a file is provided
    const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;

    // Fetch existing Menu Item
    const existingMenuItem = await MenuItem.findById(id);
    if (!existingMenuItem) {
      return res.status(404).json({ success: false, message: "Menu Item not found" });
    }

    // Validate that restaurant and dish are arrays, if provided
    const updatedRestaurant = Array.isArray(restaurant) ? restaurant : existingMenuItem.restaurant;
    const updatedDish = Array.isArray(dish) ? dish : existingMenuItem.dish;

    // Push new IDs to existing arrays
    const newRestaurantIds = new Set([...existingMenuItem.restaurant, ...updatedRestaurant]);
    const newDishIds = new Set([...existingMenuItem.dish, ...updatedDish]);

    // Update Menu Item details
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      {
        name: name || existingMenuItem.name,
        description: description || existingMenuItem.description,
        restaurant: [...newRestaurantIds],
        dish: [...newDishIds],
        image: imageUrl || existingMenuItem.image,
      },
      { new: true } // Return the updated document
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ success: false, message: "Menu Item not found" });
    }

    res.status(200).json({ success: true, message: "Menu Item updated successfully", data: updatedMenuItem });

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};
