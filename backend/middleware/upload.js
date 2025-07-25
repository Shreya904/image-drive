import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dbquolnll", // replace with your Cloudinary credentials
  api_key: "854869555942234",
  api_secret: "hBbVF6cBorcLKctzpDOdVfXJZPo",
});

// Set up storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "imagedrive", // optional folder name in your Cloudinary account
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

const upload = multer({ storage });

export default upload;
