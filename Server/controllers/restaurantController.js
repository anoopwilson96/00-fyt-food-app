import { Restaurant } from "../models/restaurantModel.js";



const addRestaurant = async (req,res,next)=>{
  try {
    const {name,cuisine,location,phone,rating,image} = req.body

    if (!name||!cuisine||!location||!phone||!rating) {
      return res.status(400).json({success:false,message:"all field required"})
    }

    const restaurant = new Restaurant({name,cuisine,location,phone,rating,image});
    Restaurant.save();
    res.status(200).json('Added restaurant')   

  } catch (error) {
    res.status(error.status || 500).json({message: error.message || "internal server"})
  }
}


export default addRestaurant
