import bcrypt from 'bcrypt'
import { Admin } from '../models/adminModel.js';
import { generateToken } from '../utils/generateToken.js';



export const addAdmin = async (req, res, next) => {
  try {
    const { name, email, password, mobile, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ success: false, message: "Sorry, all fields are required" });
    }

    // Check if admin already exists
    const adminExist = await Admin.findOne({ email });

    if (adminExist) {  // Corrected logic to check if admin exists
      return res.status(404).json({ success: false, message: "Admin exists, please login" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: role || 'none',  // Set default role to 'none' if undefined
      mobile
    });
    
    await newAdmin.save();
    // Generate token
    const token = generateToken(email, role);

    // Send response
    res.cookie('token', token,
      {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
        path: '/',
        maxAge: 2 * 60 * 60 * 1000 // 2 hours in milliseconds
      }
    );
    res.json({ success: true, role: role || 'user', message: `${role} created successfully` });

  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};



export  const adminLogin = async (req, res, next) => {
  try {
 const {email,password} = req.body
  if (!email||!password) {
    return res.status(400).json({success:false,message:"all field required"})
  }

  const adminExist = await Admin.findOne({email });


  if (!adminExist) {
      return res.status(404).json({ success: false, message: "admin does not exist" });
  }

  const passwordMatch = bcrypt.compareSync(password, adminExist.password);


  if (!passwordMatch) {
      return res.status(400).json({ success: false, message: "Admin not authenticated" });
  }
  let role = adminExist.role 
  const token = generateToken(email,role);


  res.cookie('token',token,{
    sameSite: 'None',
    secure: true,
    httpOnly: true,
    path: '/',
    maxAge: 2 * 60 * 60 * 1000 // 2 hours in milliseconds
  })
  res.json({
    success:true,
    role:role,
    message: `${role} logged in successfully`})

    
  } catch (error) {
    res.status(error.status || 500).json({message: error.message || "internal server"})
  }
}



export const adminLogout = async (req, res, next) => {
  try {
      res.clearCookie("token", {
        path: "/",            // must match the 'path' used when setting the cookie
        httpOnly: true,       // same as when setting the cookie
        secure: true,         // must match if the cookie was set with 'secure: true'
        sameSite: "None"      // must match the 'SameSite' setting
      });

      res.json({ success: true, message: "Admin Logout successfully" });
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};



export const adminUpdate = async (req, res, next) => {
  try {

// Only main admin created can edit rest of admin (admin/delivery/restaurant)

    const {id,name, mobile} = req.body;

    // Update admin details
    const admin = await Admin.findByIdAndUpdate(id, {
      name,
      mobile
    }, { new: true }); // Return the updated document

    if (!admin) {
      return res.status(404).json({ success: false, message: "admin not found" });
    }

    res.status(200).json({ success: true, message: "Admin data updated successfully", data:admin });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};




export const checkAdmin = async (req, res, next) => {
  try {
      const admin = req.admin;

      if (!admin) {
          return res.status(400).json({ success: true, message: "admin not authenticated" });
      }
      res.json({ success: true, message: "admin authenticated" });
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }}
























// export  const addAdmin = async (req, res, next) => {
//   try {
//  const {name,email,password,mobile,role} = req.body
//   if (!name||!email||!password||!mobile) {
//     return res.status(400).json({success:false,message:"Sorry all field required"})
//   }

//   const adminExist = await Admin.findOne({ email});

//   if (!adminExist) {
//     return res.status(404).json({ success: false, message: "admin exist, Please login" });
// }
//   const saltRounds = 10;
//   const hashedPassword = bcrypt.hashSync(password, saltRounds);

//   const newAdmin = new Admin({name,email,password:hashedPassword,role,mobile})
//   await newAdmin.save()

// //Role will be send to generateToken function,if role is undefined it will automatically create role as User
// //Role: user will prevent the access from all protected routes

//   const token = generateToken(email,role)

//   res.cookie('token',token)
//   res.json({success:true,role:role,message:'Role created successfully'})

    
//   } catch (error) {
//     res.status(error.status || 500).json({message: error.message || "internal server"})
//   }
// }
