import Folder from "../models/Folder.js";

export const createFolder = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const user = req.userId;

    const folder = await Folder.create({ name, parent: parent || null, user });

    res.status(201).json(folder);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create folder", error: err.message });
  }
};

export const getUserFolders = async (req, res) => {
  try {
    const user = req.userId;

    const folders = await Folder.find({ user });

    res.status(200).json(folders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch folders", error: err.message });
  }
};
