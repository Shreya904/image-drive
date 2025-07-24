import express from "express";
import {
  createFolder,
  getUserFolders,
} from "../controllers/folderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createFolder);
router.get("/", authMiddleware, getUserFolders);

export default router;
