import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Restaurant } from "../models/restaurantModel.js";
import { imageUploadCloudinary } from "../utils/cloudinaryUpload.js";
import multer from "multer";

export const addRestaurant = async (req, res, next) => {
  try {
    const { name, cuisine, location, phone, rating, image, menuItems } = req.body;

    // Check for existing restaurant
    const existingRestaurant = await Restaurant.findOne({ name, location });
    if (existingRestaurant) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    // Upload image to Cloudinary if provided
    const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;

    // Create new restaurant
    const newRestaurant = new Restaurant({
      name,
      cuisine,
      location,
      phone,
      rating,
      image: imageUrl || image,
      menuItems
    });

    // Update menuItems if provided
    if (menuItems && Array.isArray(menuItems)) {
      newRestaurant.menuItems.push(...menuItems); // Assuming menuItems are ObjectIds
    }

    await newRestaurant.save();

    res.status(200).json({ success: true, message: "Restaurant added successfully", data: newRestaurant });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

export const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

export const getRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

export const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};


export const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, cuisine, location, phone, rating, image, menuItems } = req.body;

    // Find the restaurant
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    // Upload image to Cloudinary if provided
    const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;

    // Update fields
    if (name) restaurant.name = name;
    if (cuisine) restaurant.cuisine = cuisine;
    if (location) restaurant.location = location;
    if (phone) restaurant.phone = phone;
    if (rating) restaurant.rating = rating;
    if (imageUrl) restaurant.image = imageUrl;

    // Update menuItems if provided (replace the array)
    if (menuItems && Array.isArray(menuItems)) {
      restaurant.menuItems = menuItems;
    }

    // Save the updated restaurant
    await restaurant.save();

    // Fetch the updated restaurant data
    const updatedRestaurant = await Restaurant.findById(id);

    res.status(200).json({ success: true, message: "Restaurant updated successfully", data: updatedRestaurant });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

