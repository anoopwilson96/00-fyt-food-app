
import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

export const imageUploadCloudinary = async (path) => {
  
    try {
        const uploadResult = await cloudinaryInstance.uploader.upload(path,{ folder: '00-fyt-food-website' }).catch((error) => {
            console.error(error);
        });
        
        return  uploadResult.url;

    } catch (error) {
        console.log(error)

     }
};



