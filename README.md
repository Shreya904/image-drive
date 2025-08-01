
# 🖼️ ImageDrive

ImageDrive is a full-stack image management application where users can register, log in, create **nested folders** (like Google Drive), upload images with custom names, and **search images** by name. Each user has private access to their own folders and images. The app is responsive, easy to use, and deploys a clean, modern UI.

---

## 🚀 Features

- 🔐 **Authentication** using JWT (built in Node.js, no Firebase)
- 🗂️ **Nested Folder System** (parent-child structure)
- 📤 **Image Uploading** with titles
- 🔍 **Image Search** by name
- 👤 **User-specific access**
- 🖼️ **Image hosting** via [Cloudinary](https://cloudinary.com/)
- 🌳 Displays folders in a tree-like structure
- 🖥️ Fully responsive React frontend

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Storage |
|----------|---------|----------|---------|
| React.js, Tailwind CSS | Node.js, Express.js | MongoDB (Mongoose) | Cloudinary |

---

## 📁 Folder Structure

### Backend (`/server`)
```

controllers/
authController.js
folderController.js
imageController.js

middlewares/
authMiddleware.js
upload.js

models/
User.js
Folder.js
Image.js

routes/
authRoutes.js
folderRoutes.js
imageRoutes.js

index.js
.env

```

### Frontend (`/client`)
```

src/
components/
Auth/
Login.jsx
Signup.jsx
ImageUpload.jsx
pages/
Dashboard.jsx
Home.jsx
utils/
auth.js
api/
axios.js

App.jsx
main.jsx
.env

````

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js and npm
- MongoDB Atlas account
- Cloudinary account
- Git

---

### 🔧 Backend Setup

```bash
cd server
npm install
````

Create a `.env` file in the `server/` directory with:

```env
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Then start the server:

```bash
npm start
```

---

### 💻 Frontend Setup

```bash
cd client
npm install
```

Set the backend URL directly in `axios.js` (since no `.env` is used):

```js
const axiosInstance = axios.create({
  baseURL: "https://your-backend-hostname.com", // deployed backend URL
  headers: { "Content-Type": "application/json" },
});
```

Then run:

```bash
npm run dev
```

Or deploy to **Vercel** for production.

---

## 🌐 Deployment

* **Frontend**: Vercel – [Live](https://image-drive-snowy.vercel.app)
* **Backend**: Render – [Live](https://image-drive-kfdu.onrender.com)

---

## 🔑 Demo Credentials

```
Email: user@gmail.com
Password: 09876
```

Use these credentials to log in and test the app.


## 📝 License

This project is for educational and demonstration purposes.

---

## 🙋‍♀️ Author

**Shreya Srivastava**
🌐 [shreya0.tech](https://shreya0.tech)
