import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // allows sending/receiving cookies (for JWT in HTTP-only cookie)
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== AUTH ROUTES =====

// Register a new user
export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

// Login (cookie set automatically by backend)
export const loginUser = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  return res.data;
};

// Verify OTP (cookie also set after success)
export const verifyOTP = async (data) => {
  const res = await API.post("/auth/verify-otp", data);
  return res.data;
};

// Get currently logged in user
export const getCurrentUser = async () => {
  const res = await API.get("/auth/me");
  return res.data;
};

// Logout user (clears cookie)
export const logoutUser = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};

// Delete user account
export const deleteAccount = async () => {
  const res = await API.delete("/auth/delete-account"); // or "/auth/delete" (match backend)
  return res.data;
};


export default API;
