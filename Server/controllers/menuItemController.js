import { MenuItem } from "../models/menuItemModel.js";



const addMenuItem = async (req,res,next)=>{
  try {
    const {name,description,price,restaurant} = req.body

    if (!name||!price||!restaurant) {
      return res.status(400).json({success:false,message:"all field required"})
    }

    const menuItem = new MenuItem({name,description,price,restaurant});
    MenuItem.save();
    res.status(200).json('Added menuItem')   

  } catch (error) {
    res.status(error.status || 500).json({message: error.message || "internal server"})
  }
}


export default addMenuItem
