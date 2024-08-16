import { Restaurant } from "../models/restaurantModel.js";



export const addRestaurant = async (req,res,next)=>{
  try {
    const {name,cuisine,location,phone,rating,image} = req.body

    if (!name||!cuisine||!location||!phone||!rating) {
      return res.status(400).json({success:false,message:"all field required"})
    }

    const restaurant = new Restaurant({name,cuisine,location,phone,rating,image});
    await Restaurant.save();
    res.status(200).json('Added restaurant')   

  } catch (error) {
    res.status(error.status || 500).json({message: error.message || "internal server"})
  }
}




export const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
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
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, cuisine, location, phone, rating, image } = req.body;

    const restaurant = await Restaurant.findByIdAndUpdate(id, {
      name,
      cuisine,
      location,
      phone,
      rating,
      image,
    }, { new: true }); // Return the updated document

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, message: "Restaurant updated successfully", data: restaurant });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

