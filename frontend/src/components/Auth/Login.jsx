// src/components/Auth/Login.jsx
import { useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      window.location.href = "/dashboard"; // Force page refresh to re-evaluate auth
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 font-semibold bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <button className="mt-2 text-blue-400 hover:text-blue-300 font-medium">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
