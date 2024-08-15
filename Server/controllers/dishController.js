import { Dish } from "../models/dishModel.js";



const addDish = async (req,res,next)=>{
  try {
    const {name,description,price,image,menuItem,restaurant} = req.body

    if (!name||!description||!price||!menuItem||!restaurant) {
      return res.status(400).json({success:false,message:"all field required"})
    }
    const dish = new Dish({name,description,price,image,menuItem,restaurant});
    Dish.save();
    res.status(200).json('Added dish')   

  } catch (error) {
    res.status(error.status || 500).json({message: error.message || "internal server"})
  }
}


export default addDish
