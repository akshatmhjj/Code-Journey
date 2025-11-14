import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // allows sending/receiving cookies (for JWT in HTTP-only cookie)
  headers: {
    "Content-Type": "application/json",
  },
});

// ====== Interceptors ======
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        sessionStorage.removeItem("userFetched");
      } catch { }
      localStorage.setItem("logout", Date.now());
    } else if (status === 429) {
      console.warn("Rate limited:", error?.response?.data);
    }
    return Promise.reject(error);
  }
);

// ==============================
// ===== AUTH ROUTES ============
// ==============================
export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  return res.data;
};

export const verifyOTP = async (data) => {
  const res = await API.post("/auth/verify-otp", data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await API.get("/auth/me");
  return res.data;
};

export const logoutUser = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};

export const deleteAccount = async () => {
  const res = await API.delete("/auth/delete-account");
  return res.data;
};

// ==============================
// ===== NOTES ROUTES ===========
// ==============================
export const getNotes = async () => {
  const res = await API.get("/notes");
  return res.data;
};

export const createNote = async (noteData) => {
  const res = await API.post("/notes", noteData);
  return res.data;
};

export const updateNote = async (id, noteData) => {
  const res = await API.put(`/notes/${id}`, noteData);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await API.delete(`/notes/${id}`);
  return res.data;
};

// ==============================
// ===== CODE FILES ROUTES ======
// ==============================
export const getUserFiles = async () => {
  const res = await API.get("/files");
  return res.data;
};

export const saveFile = async (fileData) => {
  const res = await API.post("/files", fileData);
  return res.data;
};

export const deleteFile = async (fileName) => {
  const res = await API.delete(`/files/${encodeURIComponent(fileName)}`);
  return res.data;
};

// ==============================
// ===== CHAT / AI ROUTES =======
// ==============================
export const sendChatMessage = async (message) => {
  const res = await API.get(`/chat/stream`, { params: { message } });
  return res.data;
};

// ==============================
// ===== TASKS ROUTES ===========
// ==============================

export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

export const createTask = async (taskData) => {
  const res = await API.post("/tasks", taskData);
  return res.data;
};

export const updateTask = async (id, taskData) => {
  const res = await API.put(`/tasks/${id}`, taskData);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};


// ==============================
// ===== ACTIVITY ROUTES ========
// ==============================

export const getRecentActivity = async (token) => {
  const res = await API.get("/activity/recent", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export default API;




