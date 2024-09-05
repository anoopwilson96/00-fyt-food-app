import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Restaurant } from "../models/restaurantModel.js";
import { imageUploadCloudinary } from "../utils/cloudinaryUpload.js";
import {Dish} from "../models/dishModel.js"
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

    // Find the restaurant by ID and populate menuItems and their associated dishes
    const restaurant = await Restaurant.findById(id)
      .populate({
        path: 'menuItems',
        populate: {
          path: 'dish',
          model: 'Dish',  // Make sure the correct model name is used here
        },
      });

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

    // Upload new image to Cloudinary if a file is provided
    const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;

    // Fetch existing restaurant
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    // Update fields
    restaurant.name = name || restaurant.name;
    restaurant.cuisine = cuisine || restaurant.cuisine;
    restaurant.location = location || restaurant.location;
    restaurant.phone = phone || restaurant.phone;
    restaurant.rating = rating || restaurant.rating;
    restaurant.image = imageUrl || restaurant.image;

    // Append new menu items if provided
    if (Array.isArray(menuItems)) {
      restaurant.menuItems = Array.from(new Set([...restaurant.menuItems, ...menuItems]));
    }
    // Save updated restaurant
    await restaurant.save();

    res.status(200).json({ success: true, message: "Restaurant updated successfully", data: restaurant });

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};
