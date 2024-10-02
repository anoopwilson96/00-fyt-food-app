import { MenuItem } from "../models/menuItemModel.js";
import { Restaurant } from "../models/restaurantModel.js";
import { Dish } from "../models/dishModel.js";
import { imageUploadCloudinary } from "../utils/cloudinaryUpload.js"; // Ensure you have this utility function to handle the Cloudinary upload
import multer from "multer";



export const addMenuItem = async (req, res, next) => {
  try {
    const {name, description, restaurant, dish, image } = req.body ;

console.log (req.bdy)
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
   
    const menuItem = await MenuItem.findById(id).populate('restaurant')
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
    const menuItems = await MenuItem.find();
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




// Delete a Menu Item by ID
export const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.body;
    console.log(id)

    // Find and delete the menu item by ID
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      return res.status(404).json({ success: false, message: "Menu Item not found" });
    }

    res.status(200).json({ success: true, message: "Menu Item deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};




// Update a Menu Item by ID 

export const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params; // Get menu item ID from request parameters
    const { name, description, addRestaurants, removeRestaurants, addDishes, removeDishes, image } = req.body;

    console.log(req.body, "Request Body =", req.params);

    // Find the menu item by ID
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu Item not found" });
    }

    // Upload new image to Cloudinary if a new file is provided
    let imageUrl = image;
    if (req.file) {
      imageUrl = await imageUploadCloudinary(req.file.path); // Cloudinary image upload
    }

    // Update menu item fields if provided in the request body
    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    if (imageUrl) menuItem.image = imageUrl; // Update image URL if applicable

    // Handle restaurant additions
    if (addRestaurants && Array.isArray(addRestaurants)) {
      addRestaurants.forEach(restaurantId => {
        if (!menuItem.restaurant.includes(restaurantId)) {
          menuItem.restaurant.push(restaurantId); // Add only unique restaurant references
        }
      });
    }

    // Handle restaurant removals
    if (removeRestaurants && Array.isArray(removeRestaurants)) {
      menuItem.restaurant = menuItem.restaurant.filter(restaurantId => !removeRestaurants.includes(restaurantId.toString()));
    }

    // Handle dish additions
    if (addDishes && Array.isArray(addDishes)) {
      addDishes.forEach(dishId => {
        if (!menuItem.dish.includes(dishId)) {
          menuItem.dish.push(dishId); // Add only unique dish references
        }
      });
    }

    // Handle dish removals
    if (removeDishes && Array.isArray(removeDishes)) {
      menuItem.dish = menuItem.dish.filter(dishId => !removeDishes.includes(dishId.toString()));
    }

    // Save the updated menu item to the database
    await menuItem.save();

    res.status(200).json({ success: true, message: "Menu Item updated successfully", data: menuItem });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
  }
};
