
import bcrypt from 'bcrypt'
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken'


const addUser = async (req, res, next) => {
  try {
console.log('Hello world')
 const {name,email,password,mobile,profilePic,location} = req.body
  if (!name||email||password||mobile) {
    return res.status(400).json({success:false,message:"all field required"})
  }
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const newUser = new User({name,email,password:hashedPassword,mobile,profilePic,location})
  await newUser.save()

  const token = jwt.sign({email:email,role:'user'},'process.env.JWT_SK')

  res.cookie('jwtToken',token)
  res.json({success:true,message:'user created successfully'})

    
  } catch (error) {
    res.status(error.status || 500).json({message: error.message || "internal server"})
  }
}

export default addUser
