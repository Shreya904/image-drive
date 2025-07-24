import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import folderRoutes from "./routes/folderRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();

// ✅ CORS setup — add your Vercel frontend URL here
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-vercel-app.vercel.app", // replace after deploy
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/images", imageRoutes);
app.use("/uploads", express.static("uploads")); // serve uploaded images

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log(`Server started on port 5000`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
