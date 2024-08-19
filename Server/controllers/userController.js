
import bcrypt from 'bcrypt'
import { User } from '../models/userModel.js';
import { generateUserToken } from '../utils/generateToken.js';


export  const addUser = async (req, res, next) => {
  try {
 const {name,email,password,mobile,profilePic,location} = req.body
  if (!name||!email||!password||!mobile) {
    return res.status(400).json({success:false,message:"all field required"})
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(404).json({ success: false, message: "user exist, Please login" });
}
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const newUser = new User({name,email,password:hashedPassword,mobile,profilePic,location})
  await newUser.save()

  const token = generateUserToken(email)

  res.cookie('token',token)
  res.json({success:true,message:'user created successfully'})

    
  } catch (error) {
    res.status(error.status || 500).json({message: error.message || "internal server"})
  }
}


export  const userLogin = async (req, res, next) => {
  try {
 const {email,password} = req.body
  if (!email||!password) {
    return res.status(400).json({success:false,message:"all field required"})
  }

  const userExist = await User.findOne({ email });

  if (!userExist) {
      return res.status(404).json({ success: false, message: "user does not exist" });
  }

  const passwordMatch = bcrypt.compareSync(password, userExist.password);

  if (!passwordMatch) {
      return res.status(400).json({ success: false, message: "user not authenticated" });
  }

  const token = generateUserToken(email);


  res.cookie('token',token)
  res.json({success:true,message:'user logged in successfully'})

    
  } catch (error) {
    res.status(error.status || 500).json({message: error.message || "internal server"})
  }
}

export const userLogout = async (req, res, next) => {
  try {
      res.clearCookie("token");

      res.json({ success: true, message: "user logout successfully" });
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};



export  const userProfile = async (req, res, next) => {
  try {
      const { id } = req.params;
      const useData = await User.findById(id).select("-password");

      res.json({ success: true, message: "user data fetched", data: useData });
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
}


//user update

export const userUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, mobile, location, image } = req.body;

    // Upload image to Cloudinary if a file is provided
    const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;

    // Update user details
    const user = await User.findByIdAndUpdate(id, {
      name,
      mobile,
      location,
      image: imageUrl || image,
    }, { new: true }); // Return the updated document

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User updated successfully", data: user });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};





export const checkUser = async (req, res, next) => {
  try {
      const user = req.user;

      if (!user) {
          return res.status(400).json({ success: true, message: "user not authenticated" });
      }
      res.json({ success: true, message: "User authenticated" });
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }}


