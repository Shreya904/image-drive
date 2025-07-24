import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  uploadImage,
  getUserImages,
  searchImages,
} from "../controllers/imageController.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), uploadImage);
router.get("/", authMiddleware, getUserImages);
router.get("/search", authMiddleware, searchImages);

export default router;
