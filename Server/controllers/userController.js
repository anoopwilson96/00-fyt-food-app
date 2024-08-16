
import bcrypt from 'bcrypt'
import { User } from '../models/userModel.js';
import { generateUserToken } from '../utils/generateToken.js';


export  const addUser = async (req, res, next) => {
  try {
 const {name,email,password,mobile,profilePic,location} = req.body
  if (!name||!email||!password||!mobile) {
    return res.status(400).json({success:false,message:"all field required"})
  }
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const newUser = new User({name,email,password:hashedPassword,mobile,profilePic,location})
  await newUser.save()

  const token = generateUserToken(email)

  res.cookie('jwtToken',token)
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


  res.cookie('jwtToken',token)
  res.json({success:true,message:'user created successfully'})

    
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
