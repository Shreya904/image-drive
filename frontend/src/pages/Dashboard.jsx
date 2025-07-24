import { useEffect, useState } from "react";
import axios from "../api/axios";
import ImageUpload from "../components/ImageUpload";
import { getToken } from "../utils/auth";

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [parentId, setParentId] = useState("");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const token = getToken();

  useEffect(() => {
    fetchFolders();
    fetchImages();
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await axios.get("/folders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFolders(res.data);
    } catch (err) {
      console.error("Failed to fetch folders", err);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get("/images", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images", err);
    }
  };

  const handleFolderCreate = async (e) => {
    e.preventDefault();
    if (!folderName) return setMessage("Folder name is required");

    try {
      await axios.post(
        "/folders",
        { name: folderName, parent: parentId || null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Folder created");
      setFolderName("");
      setParentId("");
      fetchFolders();
    } catch (err) {
      setMessage("Folder creation failed");
    }
  };

  const handleImageSearch = async () => {
    try {
      const res = await axios.get(`/images/search?query=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(res.data);
    } catch (err) {
      console.error("Image search failed", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📁 Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      {/* Folder Creation */}
      <form
        onSubmit={handleFolderCreate}
        className="bg-gray-800 p-4 rounded-lg mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Create Folder</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="bg-gray-700 p-2 rounded outline-none"
          />
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="bg-gray-700 p-2 rounded outline-none"
          >
            <option value="">Root Folder</option>
            {folders.map((folder) => (
              <option key={folder._id} value={folder._id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Create
        </button>
        {message && <p className="mt-2 text-sm text-green-400">{message}</p>}
      </form>
      {/* Folder List */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Folders</h2>
        <div className="space-y-1">
          {/* Root folders (no parent) */}
          {folders
            .filter((folder) => !folder.parent)
            .map((folder) => (
              <div key={folder._id}>
                <div className="flex items-center text-gray-300 py-1">
                  <span className="text-yellow-400 mr-2">📁</span>
                  <strong className="text-white">{folder.name}</strong>
                </div>
                {/* Child folders */}
                {folders
                  .filter((childFolder) => childFolder.parent === folder._id)
                  .map((childFolder) => (
                    <div
                      key={childFolder._id}
                      className="ml-6 flex items-center text-gray-400 py-1"
                    >
                      <span className="text-gray-500 mr-2">├─</span>
                      <span className="text-blue-400 mr-2">📁</span>
                      <span>{childFolder.name}</span>
                    </div>
                  ))}
              </div>
            ))}

          {/* Show orphaned folders (parent doesn't exist) */}
          {folders
            .filter(
              (folder) =>
                folder.parent && !folders.find((f) => f._id === folder.parent)
            )
            .map((folder) => (
              <div
                key={folder._id}
                className="flex items-center text-orange-400 py-1"
              >
                <span className="text-orange-500 mr-2">⚠️</span>
                <span className="text-orange-400 mr-2">📁</span>
                <span>{folder.name}</span>
                <span className="text-gray-500 text-xs ml-2">(orphaned)</span>
              </div>
            ))}
        </div>
      </div>
      {/* Image Upload */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        <ImageUpload />
      </div>
      {/* Search Section */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Search Images</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter image name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-gray-700 p-2 rounded outline-none"
          />
          <button
            onClick={handleImageSearch}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Search
          </button>
          <button
            onClick={fetchImages}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </div>
      {/* Image Gallery */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Your Images</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-gray-700 rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={`http://localhost:5000${img.imageUrl}`}
                alt={img.name}
                className="w-full h-40 object-cover"
              />
              <p className="text-center py-2 text-sm">{img.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
