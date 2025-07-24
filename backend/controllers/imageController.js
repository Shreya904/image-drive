import Image from "../models/Image.js";

export const uploadImage = async (req, res) => {
  try {
    const { name, folder } = req.body;
    const file = req.file;

    if (!file)
      return res.status(400).json({ message: "No image file uploaded" });

    const image = await Image.create({
      name,
      imageUrl: `/uploads/${file.filename}`,
      folder: folder || null,
      user: req.userId,
    });

    res.status(201).json(image);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to upload image", error: err.message });
  }
};

export const getUserImages = async (req, res) => {
  try {
    const images = await Image.find({ user: req.userId });
    res.status(200).json(images);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch images", error: err.message });
  }
};

export const searchImages = async (req, res) => {
  try {
    const { query } = req.query;

    const images = await Image.find({
      user: req.userId,
      name: { $regex: query, $options: "i" },
    });

    res.status(200).json(images);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to search images", error: err.message });
  }
};
