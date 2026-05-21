// Import Cloudinary v2 SDK
import { v2 as cloudinary } from "cloudinary";

// Import fs (file system module)
// Used to delete files from local storage after upload/failure
import fs from "fs";


// Configure Cloudinary using credentials from .env file
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // your cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // your API key
    api_secret: process.env.CLOUDINARY_API_SECRET  // your secret key
});


// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {

        // If file path is missing, return null
        if (!localFilePath) return null;

        // Upload file to Cloudinary
        // resource_type: "auto" means Cloudinary automatically detects
        // whether file is image, video, pdf, etc.
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Upload successful
        console.log("File uploaded successfully", response.url);

        // Return uploaded file details
        return response;

    } catch (error) {

        // If upload fails, delete local file from server
        // because we don't want unused files taking storage
        fs.unlinkSync(localFilePath);

        // Return null if upload failed
        return null;
    }
};


// Export function so other files can use it
export { uploadOnCloudinary };