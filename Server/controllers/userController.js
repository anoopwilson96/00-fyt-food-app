
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

  if (!userExist) {
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



export  const userUpdate = async (req, res, next) => {

  try {

    const { id } = req.params;
    const { name,email,mobile,location,image } = req.body;

    //  Upload image cloudinary

    const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;    

    const user = await User.findByIdAndUpdate(id, {
      name,
      email,
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






  // (import bcrypt from 'bcrypt';
  //   import { User } from '../models/userModel.js';
  //   import { generateUserToken } from '../utils/generateToken.js';
  //   import { imageUploadCloudinary } from "../utils/cloudinaryUpload.js";
    
  //   export const addUser = async (req, res, next) => {
  //     try {
  //       const { name, email, password, mobile, profilePic, location } = req.body;
        
  //       // Check required fields
  //       if (!name || !email || !password || !mobile) {
  //         return res.status(400).json({ success: false, message: "All fields are required" });
  //       }
    
  //       // Check if the user already exists
  //       const userExist = await User.findOne({ email });
  //       if (userExist) {
  //         return res.status(400).json({ success: false, message: "User already exists, please login" });
  //       }
    
  //       // Hash the password
  //       const saltRounds = 10;
  //       const hashedPassword = bcrypt.hashSync(password, saltRounds);
    
  //       // Create a new user
  //       const newUser = new User({
  //         name,
  //         email,
  //         password: hashedPassword,
  //         mobile,
  //         profilePic,
  //         location
  //       });
    
  //       await newUser.save();
    
  //       // Generate a token
  //       const token = generateUserToken(newUser._id); // Use the user's ID to generate the token
    
  //       // Send the token as a cookie
  //       res.cookie('token', token);
  //       res.json({ success: true, message: 'User created successfully' });
    
  //     } catch (error) {
  //       console.error(error); // Log the error for debugging purposes
  //       res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  //     }
  //   };
    
  //   export const userLogin = async (req, res, next) => {
  //     try {
  //       const { email, password } = req.body;
        
  //       // Check required fields
  //       if (!email || !password) {
  //         return res.status(400).json({ success: false, message: "All fields are required" });
  //       }
    
  //       // Check if the user exists
  //       const userExist = await User.findOne({ email });
  //       if (!userExist) {
  //         return res.status(404).json({ success: false, message: "User does not exist" });
  //       }
    
  //       // Check if the password matches
  //       const passwordMatch = bcrypt.compareSync(password, userExist.password);
  //       if (!passwordMatch) {
  //         return res.status(400).json({ success: false, message: "Invalid credentials" });
  //       }
    
  //       // Generate a token
  //       const token = generateUserToken(userExist._id);
    
  //       // Send the token as a cookie
  //       res.cookie('token', token);
  //       res.json({ success: true, message: 'User logged in successfully' });
    
  //     } catch (error) {
  //       console.error(error); // Log the error for debugging purposes
  //       res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  //     }
  //   };
    
  //   export const userLogout = async (req, res, next) => {
  //     try {
  //       // Clear the token cookie
  //       res.clearCookie("token");
  //       res.json({ success: true, message: "User logged out successfully" });
  //     } catch (error) {
  //       console.error(error); // Log the error for debugging purposes
  //       res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  //     }
  //   };
    
  //   export const userProfile = async (req, res, next) => {
  //     try {
  //       const { id } = req.params;
    
  //       // Fetch user data excluding the password
  //       const userData = await User.findById(id).select("-password");
    
  //       if (!userData) {
  //         return res.status(404).json({ success: false, message: "User not found" });
  //       }
    
  //       res.json({ success: true, message: "User data fetched", data: userData });
  //     } catch (error) {
  //       console.error(error); // Log the error for debugging purposes
  //       res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  //     }
  //   };
    
  //   export const userUpdate = async (req, res, next) => {
  //     try {
  //       const { id } = req.params;
  //       const { name, email, mobile, location, image } = req.body;
    
  //       // Upload image to Cloudinary if provided
  //       const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;
    
  //       // Find the user and update the details
  //       const user = await User.findByIdAndUpdate(
  //         id,
  //         {
  //           name,
  //           email,
  //           mobile,
  //           location,
  //           profilePic: imageUrl || image, // Update profilePic with the uploaded image
  //         },
  //         { new: true } // Return the updated document
  //       );
    
  //       if (!user) {
  //         return res.status(404).json({ success: false, message: "User not found" });
  //       }
    
  //       res.status(200).json({ success: true, message: "User updated successfully", data: user });
  //     } catch (error) {
  //       console.error(error); // Log the error for debugging purposes
  //       res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  //     }
  //   };
    
  //   export const checkUser = async (req, res, next) => {
  //     try {
  //       const user = req.user;
    
  //       if (!user) {
  //         return res.status(401).json({ success: false, message: "User not authenticated" });
  //       }
    
  //       res.json({ success: true, message: "User authenticated" });
  //     } catch (error) {
  //       console.error(error); // Log the error for debugging purposes
  //       res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  //     }
  //   };
  //   )