import { Dish } from "../models/dishModel.js";
import { MenuItem } from "../models/menuItemModel.js";
import { imageUploadCloudinary } from "../utils/cloudinaryUpload.js";

export const addDish = async (req, res, next) => {
  try {
    const { name, description, price, image } = req.body;
    console.log(req.body)

    // Check if all required fields are provided
    if (!name || !description || !price) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Upload image to Cloudinary if provided
    const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;

    // Create a new Dish instance
    const dish = new Dish({
      name,
      description,
      price,
      image: imageUrl || image
    });

    // Save the new dish to the database
    await dish.save();

    

    res.status(200).json({ success: true, message: 'Dish added successfully',dish });

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

//Get a dish


 export const getDish = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the dish by ID and populate related MenuItem data
    const dish = await Dish.findById(id).populate('menuItem');

    if (!dish) {
      return res.status(404).json({ success: false, message: "Dish not found" });
    }

    res.status(200).json({ success: true, data: dish });

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};



// Get all dish

export const getAllDishes = async (req, res, next) => {
  try {
    // Retrieve all dishes and populate related MenuItem data
    const dishes = await Dish.find().populate('menuItem');

    if (!dishes || dishes.length === 0) {
      return res.status(404).json({ success: false, message: "No dishes found" });
    }

    res.status(200).json({ success: true, data: dishes });

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};


// Update dish using findByIdAndUpdate

export const updateDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    // Upload new image to Cloudinary if a file is provided
    const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;

    // Update dish details
    
    const updatedDish = await Dish.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        image: imageUrl || image,
   
      },
      { new: true } // Return the updated document
    );

    if (!updatedDish) {
      return res.status(404).json({ success: false, message: "Dish not found" });
    }

    res.status(200).json({ success: true, message: 'Dish updated successfully', data: updatedDish });

  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};



// Delete dish

// Delete a Menu Item by ID
export const deleteDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)

    // Find and delete the menu item by ID
    const deletedDish = await Dish.findByIdAndDelete(id);

    if (!deletedDish) {
      return res.status(404).json({ success: false, message: "Dish Item not found" });
    }

    res.status(200).json({ success: true, message: "Dish Item deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};
