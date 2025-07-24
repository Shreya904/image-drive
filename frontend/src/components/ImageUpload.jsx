import { useState } from "react";
import axios from "../api/axios";

const ImageUpload = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) return setMessage("All fields are required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("/images", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Image uploaded successfully");
      setName("");
      setImage(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Upload failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full max-w-md mx-auto mt-6"
    >
      <input
        type="text"
        placeholder="Image Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {message && (
        <p className="text-sm text-center mt-2 text-gray-700">{message}</p>
      )}
    </form>
  );
};

export default ImageUpload;
