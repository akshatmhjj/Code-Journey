import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // allows sending/receiving cookies (for JWT in HTTP-only cookie)
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // auth invalid — clear session flag so app will re-check next visit
      try {
        sessionStorage.removeItem("userFetched");
      } catch { }
      // optionally broadcast logout across tabs
      localStorage.setItem("logout", Date.now());
    } else if (status === 429) {
      // Do nothing special here but bubble the error so UI can show a message
      console.warn("Rate limited:", error?.response?.data);
    }
    return Promise.reject(error);
  }
);

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







// ===== NOTES ROUTES =====

// Get all notes for the current user
export const getNotes = async () => {
  const res = await API.get("/notes");
  return res.data;
};

// Create a new note
export const createNote = async (noteData) => {
  const res = await API.post("/notes", noteData);
  return res.data;
};

// Update a note
export const updateNote = async (id, noteData) => {
  const res = await API.put(`/notes/${id}`, noteData);
  return res.data;
};

// Delete a note
export const deleteNote = async (id) => {
  const res = await API.delete(`/notes/${id}`);
  return res.data;
};



export default API;
