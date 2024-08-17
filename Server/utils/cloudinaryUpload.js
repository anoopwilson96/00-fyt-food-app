
import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

export const imageUploadCloudinary = async (path) => {
  
    try {
        const uploadResult = await cloudinaryInstance.uploader.upload(path).catch((error) => {
            console.error(error);
        });
        return uploadResult.url;
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};