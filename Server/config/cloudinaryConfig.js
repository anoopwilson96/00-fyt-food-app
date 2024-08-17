import dotenv from 'dotenv'
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';



    // Configuration
    cloudinary.config({ 
      cloud_name: process.env.CLD_NAME, 
      api_key: process.env.CLD_API_KEY, 
      api_secret: process.env.CLD_API_SECRET
  })



export const cloudinaryInstance = cloudinary