import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../lib/api";
import { getTasks, createTask, updateTask, deleteTask } from "../lib/api";
import {
  User,
  Mail,
  LogOut,
  FileText,
  LayoutDashboard,
  StickyNote,
  Settings,
  Trash2,
  Loader2,
  ClipboardList,
  Menu,
  X,
  Home,
  Edit3,
  PencilLine,
} from "lucide-react";
import { useAlert } from "../context/AlertContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fade,
} from "@mui/material";
import { getNotes, createNote, updateNote, deleteNote } from "../lib/api";


const getAccountAge = (createdAt) => {
  if (!createdAt) return "Unknown";
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now - created;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""}`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
};


export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [confirmNoteOpen, setConfirmNoteOpen] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [confirmTaskOpen, setConfirmTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");





  const fetchNotes = async () => {
    setLoadingNotes(true);
    try {
      const res = await getNotes();
      setNotes(res.notes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingNotes(false);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = (note) => {
    setNoteToDelete(note);
    setConfirmNoteOpen(true);
  };

  const confirmDeleteNote = async () => {
    if (!noteToDelete) return;
    try {
      await deleteNote(noteToDelete._id);
      showAlert("Note deleted successfully.", "success");
      await fetchNotes();
    } catch (err) {
      console.error(err);
      showAlert("Failed to delete note.", "error");
    } finally {
      setConfirmNoteOpen(false);
      setNoteToDelete(null);
    }
  };

  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const res = await getTasks();
      setTasks(res.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoadingTasks(false);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;

  const taskProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;


  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setContent(task.description);
    setShowModal(true);
  };

  const handleTaskDelete = (task) => {
    setTaskToDelete(task);
    setConfirmTaskOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      await deleteTask(taskToDelete._id);
      showAlert("Task deleted successfully.", "success");
      await fetchTasks();
    } catch (err) {
      console.error(err);
      showAlert("Failed to delete task.", "error");
    } finally {
      setConfirmTaskOpen(false);
      setTaskToDelete(null);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);




  useEffect(() => {
    fetchNotes();
  }, []);

  // 🧭 Hide Header & Footer
  useEffect(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";

    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  // 🧾 Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setProfile(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    setActionLoading(true);
    try {
      await logout();
      showAlert("Logged out successfully.", "info");
      navigate("/");
    } catch {
      showAlert("Failed to log out.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // const handleDeleteConfirm = async () => {
  //   setConfirmOpen(false);
  //   setActionLoading(true);
  //   try {
  //     await api.delete("/auth/delete-account");
  //     showAlert("Your account has been deleted successfully.", "success");
  //     setTimeout(async () => {
  //       await logout();
  //       navigate("/");
  //     }, 1500);
  //   } catch (err) {
  //     console.error("Error deleting account:", err);
  //     showAlert(
  //       err.response?.data?.message || "Failed to delete account",
  //       "error"
  //     );
  //   } finally {
  //     setActionLoading(false);
  //   }
  // };

  if (loading || actionLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
        <Loader2 className="animate-spin text-blue-500 mb-3" size={40} />
        <p className="animate-pulse text-gray-500">
          {loading ? "Loading your profile..." : "Processing..."}
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        <p>No profile found. Please log in again.</p>
      </div>
    );
  }

  // 🧠 Render section content dynamically
  const renderContent = () => {
    switch (activeSection) {

      case "dashboard":
        return (
          <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6 md:p-10 overflow-hidden">
            {/* Background visuals */}
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-300 rounded-full blur-3xl opacity-25"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-20"></div>

            {/* Hero Section */}
            <div className="relative z-10 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-100 text-white rounded-3xl p-8 md:p-12 shadow-2xl mb-10 flex flex-col md:flex-row items-center md:items-end justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700">Welcome back, {profile.name || "User"} 👋</h2>
                <p className="text-sm text-black mt-2">
                  Here’s a quick overview of your productivity and recent activity.
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex items-center gap-5 bg-white/50 backdrop-blur-xl px-5 py-3 rounded-full shadow-lg">
                <div className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center pb-1 text-xl font-semibold text-white">
                  {profile.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">@{profile.username}</p>
                  <p className="text-xs text-gray-700">{profile.email}</p>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Notes Created",
                  value: loading ? "..." : notes.length.toString(),
                  color: "from-blue-500 to-indigo-500",
                  icon: StickyNote,
                },
                {
                  title: "Tasks Completed",
                  value: loadingTasks
                    ? "..."
                    : `${completedTasks} / ${totalTasks}`,
                  color: "from-emerald-500 to-teal-500",
                  icon: ClipboardList,
                  showProgress: true,
                },
                {
                  title: "Account Age",
                  value: getAccountAge(profile.createdAt),
                  color: "from-purple-500 to-pink-500",
                  icon: FileText,
                },
              ].map(({ title, value, color, icon: Icon, showProgress }) => (
                <div
                  key={title}
                  className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`}
                  ></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="w-full">
                      <h4 className="text-gray-500 text-sm font-medium">{title}</h4>
                      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>

                      {showProgress && totalTasks > 0 && (
                        <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${taskProgress < 40
                              ? "bg-red-400"
                              : taskProgress < 70
                                ? "bg-orange-400"
                                : "bg-green-500"
                              }`}
                            style={{ width: `${taskProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-md ml-4`}
                    >
                      <Icon size={22} />
                    </div>
                  </div>
                </div>
              ))}
            </div>


            {/* Split Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity Feed */}
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>
                  Recent Activity (Beta)
                </h3>
                <ul className="space-y-4 text-gray-700 text-sm">
                  {[
                    { text: "Updated profile information.", color: "bg-blue-500" },
                    { text: "Added 3 new notes.", color: "bg-green-500" },
                    { text: "Completed 2 tasks.", color: "bg-purple-500" },
                    { text: "Exported your weekly report.", color: "bg-orange-500" },
                  ].map(({ text, color }, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 ${color} rounded-full`}></span>
                        {text}
                      </div>
                      <span className="text-xs text-gray-400">
                        {i === 0 ? "Just now" : `${i * 2 + 1}h ago`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Insights Panel */}
              <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"></div>
                <h3 className="text-xl font-semibold mb-6">Performance Insights (Beta)</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-indigo-100">Weekly Progress</p>
                    <div className="w-full h-2 bg-white/30 rounded-full mt-2">
                      <div className="w-3/4 h-full bg-white rounded-full"></div>
                    </div>
                    <p className="text-xs text-indigo-100 mt-1">75% completed</p>
                  </div>
                  <div>
                    <p className="text-sm text-indigo-100">Tasks vs Notes</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-xs">{completedTasks} Tasks Completed</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-xs">{notes.length} Notes Created</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-white text-indigo-700 font-semibold py-2 rounded-full hover:bg-indigo-100 transition-all">
                    View Full Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        );


      case "notes":
        return (
          <div className="p-8 min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <StickyNote className="text-yellow-600" size={22} />
              My Notes
            </h2>

            {/* Add Note Button */}
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-md"
              >
                + Add Note
              </button>
            </div>

            {/* Add/Edit Note Modal */}
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-gradient-to-br from-white to-gray-50 w-[90%] sm:w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-6 relative mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
                      {editingNote ? "✏️ Edit Note" : "📝 Add New Note"}
                    </h3>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setEditingNote(null);
                        setTitle("");
                        setContent("");
                      }}
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-gray-500 text-xl leading-none">×</span>
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsLoading(true);
                      try {
                        if (editingNote) {
                          await updateNote(editingNote._id, { title, content });
                          showAlert("Note updated successfully.", "success");
                        } else {
                          await createNote({ title, content });
                          showAlert("Note saved successfully.", "success");
                        }
                        setTitle("");
                        setContent("");
                        setShowModal(false);
                        await fetchNotes();
                      } catch (err) {
                        console.error(err);
                        showAlert("Failed to save note.", "error");
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Enter title..."
                      className="w-full border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-yellow-200 rounded-xl p-3 text-gray-800 placeholder-gray-400 transition-all outline-none"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />

                    <textarea
                      placeholder="Write your note here..."
                      className="w-full border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-yellow-200 rounded-xl p-3 h-32 text-gray-800 placeholder-gray-400 transition-all resize-none outline-none"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-2.5 rounded-xl font-medium text-white transition-all shadow-md ${isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : editingNote
                          ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                          : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700"
                        }`}
                    >
                      {isLoading
                        ? editingNote
                          ? "Updating..."
                          : "Saving..."
                        : editingNote
                          ? "Update Note"
                          : "Add Note"}
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}

            {/* Notes Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start auto-rows-auto">
              {loadingNotes ? (
                <div className="col-span-full text-center py-20 text-gray-500">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full mb-3"></div>
                  <p>Loading notes...</p>
                </div>
              ) : notes.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-20">
                  <StickyNote size={40} className="mx-auto mb-2 text-yellow-400" />
                  <p>No notes yet. Create your first one!</p>
                </div>
              ) : (
                notes.map((note) => (
                  <motion.div
                    key={note._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative bg-white/60 border border-yellow-100 backdrop-blur-md rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5"
                  >
                    {/* Note Header */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg text-gray-800 leading-tight pr-8">
                        {note.title}
                      </h3>

                      {/* Edit/Delete Icons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingNote(note);
                            setTitle(note.title);
                            setContent(note.content);
                            setShowModal(true);
                          }}
                          className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition hover:rotate-6 hover:scale-105"
                          title="Edit Note"
                        >
                          <PencilLine size={16} strokeWidth={2} />
                        </button>

                        <button
                          onClick={() => handleDelete(note)}
                          className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition hover:rotate-6 hover:scale-105"
                          title="Delete Note"
                        >
                          <Trash2 size={16} strokeWidth={2} />
                        </button>
                      </div>

                    </div>

                    {/* Note Content */}
                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                      {note.content}
                    </p>

                    {/* Decorative Accent */}
                    <div className="absolute bottom-3 left-5 w-16 h-1 rounded-full bg-yellow-300/80"></div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        );


      case "tasks":
        return (
          <div className="p-8 min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <ClipboardList className="text-green-600" size={22} />
              My Tasks
            </h2>

            {/* Add Task Button */}
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => {
                  setShowModal(true);
                  setEditingTask(null);
                  setTitle("");
                  setContent("");
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-md"
              >
                + Add Task
              </button>
            </div>

            {/* Add/Edit Task Modal */}
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-gradient-to-br from-white to-gray-50 w-[90%] sm:w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-6 relative mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
                      {editingTask ? "✏️ Edit Task" : "🧩 Add New Task"}
                    </h3>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setEditingTask(null);
                        setTitle("");
                        setContent("");
                      }}
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-gray-500 text-xl leading-none">×</span>
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsLoading(true);
                      try {
                        const payload = {
                          title,
                          description: content,
                          status,
                          priority,
                          dueDate,
                        };
                        if (editingTask) {
                          await updateTask(editingTask._id, payload);
                          showAlert("Task updated successfully.", "success");
                        } else {
                          await createTask(payload);
                          showAlert("Task created successfully.", "success");
                        }
                        setTitle("");
                        setContent("");
                        setStatus("pending");
                        setPriority("medium");
                        setDueDate("");
                        setShowModal(false);
                        await fetchTasks();
                      } catch (err) {
                        console.error(err);
                        showAlert("Failed to save task.", "error");
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    {/* Title */}
                    <input
                      type="text"
                      placeholder="Enter task title..."
                      className="w-full border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-green-200 rounded-xl p-3 text-gray-800 placeholder-gray-400 transition-all outline-none"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />

                    {/* Description */}
                    <textarea
                      placeholder="Describe your task..."
                      className="w-full border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-green-200 rounded-xl p-3 h-32 text-gray-800 placeholder-gray-400 transition-all resize-none outline-none"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />

                    {/* Status Selector */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Status</label>
                      <div className="flex gap-3">
                        {["pending", "in-progress", "completed"].map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium border transition ${status === s
                              ? s === "pending"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                : s === "in-progress"
                                  ? "bg-blue-100 text-blue-700 border-blue-300"
                                  : "bg-green-100 text-green-700 border-green-300"
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                              }`}
                          >
                            {s.replace("-", " ").toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Priority Selector */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Priority</label>
                      <div className="flex gap-3">
                        {["low", "medium", "high"].map((p) => (
                          <button
                            type="button"
                            key={p}
                            onClick={() => setPriority(p)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium border transition ${priority === p
                              ? p === "low"
                                ? "bg-green-100 text-green-700 border-green-300"
                                : p === "medium"
                                  ? "bg-orange-100 text-orange-700 border-orange-300"
                                  : "bg-red-100 text-red-700 border-red-300"
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                              }`}
                          >
                            {p.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-2.5 rounded-xl font-medium text-white transition-all shadow-md ${isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                      {isLoading ? "Saving..." : editingTask ? "Update Task" : "Add Task"}
                    </button>
                  </form>

                </motion.div>
              </motion.div>
            )}

            {/* Tasks Grid */}
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              {loadingTasks ? (
                <div className="col-span-full text-center py-10 text-gray-500">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full mb-3"></div>
                  <p>Loading tasks...</p>
                </div>
              ) : tasks.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-10">
                  <ClipboardList size={40} className="mx-auto mb-2 text-green-400" />
                  <p>No tasks yet. Add one to get started!</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <motion.div
                    key={task._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`relative flex items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-300
    ${task.status === "completed"
                        ? "bg-gray-50 border-gray-200 opacity-70"
                        : "bg-white border-gray-100 hover:shadow-sm hover:border-gray-200"
                      }`}
                    style={{
                      borderLeft: `4px solid ${task.priority === "high"
                        ? "#ef4444"
                        : task.priority === "medium"
                          ? "#f59e0b"
                          : "#22c55e"
                        }`,
                    }}
                  >
                    {/* Left side: checkbox + content */}
                    <div className="flex items-start gap-3 flex-1">
                      {/* Circle checkbox */}
                      <button
                        onClick={async () => {
                          try {
                            const newStatus =
                              task.status === "completed" ? "pending" : "completed";
                            await updateTask(task._id, { status: newStatus });
                            await fetchTasks();
                            showAlert(
                              newStatus === "completed"
                                ? "Task marked as completed ✅"
                                : "Task set to pending 🕓",
                              "success"
                            );
                          } catch {
                            showAlert("Failed to update task", "error");
                          }
                        }}
                        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-all duration-200
                          ${task.status === "completed"
                            ? "border-green-600 bg-green-500 text-white"
                            : "border-gray-400 hover:border-green-500 hover:scale-105"
                          }`}
                      >
                        {task.status === "completed" && "✓"}
                      </button>

                      {/* Task text */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-sm font-semibold ${task.status === "completed"
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                            }`}
                        >
                          {task.title}
                        </h3>
                        <p
                          className={`text-xs mt-0.5 ${task.status === "completed"
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}
                        >
                          {task.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                          {/* Priority tag */}
                          <span
                            className={`text-[10px] sm:text-[11px] font-medium px-2 sm:px-3 py-[1px] sm:py-0.5 rounded-full border whitespace-nowrap ${task.priority === "high"
                                ? "bg-red-50 text-red-600 border-red-200"
                                : task.priority === "medium"
                                  ? "bg-orange-50 text-orange-600 border-orange-200"
                                  : "bg-green-50 text-green-600 border-green-200"
                              }`}
                          >
                            {task.priority.toUpperCase()}
                          </span>

                          {/* Status tag */}
                          <span
                            className={`text-[10px] sm:text-[11px] font-medium px-2 sm:px-3 py-[1px] sm:py-0.5 rounded-full border whitespace-nowrap ${task.status === "completed"
                                ? "bg-green-50 text-green-600 border-green-200"
                                : task.status === "in-progress"
                                  ? "bg-blue-50 text-blue-600 border-blue-200"
                                  : "bg-yellow-50 text-yellow-600 border-yellow-200"
                              }`}
                          >
                            {task.status.replace("-", " ").toUpperCase()}
                          </span>
                        </div>

                      </div>
                    </div>

                    {/* Edit + Delete */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTaskEdit(task)}
                        className="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition hover:rotate-6 hover:scale-105"
                        title="Edit Task"
                      >
                        <PencilLine size={16} />
                      </button>
                      <button
                        onClick={() => handleTaskDelete(task)}
                        className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition hover:rotate-6 hover:scale-105"
                        title="Delete Task"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>

                ))
              )}
            </div>


            {/* Delete Confirm Dialog */}
            <Dialog
              open={confirmTaskOpen}
              TransitionComponent={Fade}
              keepMounted
              onClose={() => setConfirmTaskOpen(false)}
            >
              <DialogTitle>{"Delete Task"}</DialogTitle>
              <DialogContent>
                ⚠️ Are you sure you want to delete this task titled "
                <strong>{taskToDelete?.title}</strong>"?
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setConfirmTaskOpen(false)}>Cancel</Button>
                <Button color="error" onClick={confirmDeleteTask}>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );


      case "settings":
        return (
          <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Settings className="text-indigo-600" size={22} />
              Settings (Beta)
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Account Section */}
              <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Account Preferences
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Change username, password, and email settings.
                </p>
                <button className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition">
                  Coming Soon
                </button>
              </div>

              {/* Theme Section */}
              <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
                <h3 className="font-semibold text-gray-800 mb-2">Appearance</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Customize your dashboard theme and color palette.
                </p>
                <button className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition">
                  Coming Soon
                </button>
              </div>

              {/* Notifications Section */}
              <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition md:col-span-2">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Notifications & Privacy
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Manage how you receive alerts, email updates, and data visibility.
                </p>
                <button className="px-4 py-2 rounded-lg bg-pink-100 text-pink-700 font-medium hover:bg-pink-200 transition">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        );


      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-[url('https://tailframes.com/images/squares-bg.webp')] bg-contain bg-fixed bg-center bg-repeat text-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between transform transition-transform duration-300 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div>
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8 md:justify-start md:gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                <User className="text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">
                  {profile.name || "User"}
                </h2>
                <p className="text-sm text-gray-500">@{profile.username}</p>
              </div>
            </div>
            {/* Close Icon (mobile only) */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {[
              { id: "home", label: "Home", icon: Home },
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "notes", label: "Notes", icon: StickyNote },
              { id: "tasks", label: "Tasks", icon: ClipboardList },
              { id: "settings", label: "Settings", icon: Settings },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  if (id === "home") navigate("/");
                  else setActiveSection(id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition ${activeSection === id
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={18} /> Logout
          </button>
          {/* <button
            onClick={() => setConfirmOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2 mt-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
          >
            <Trash2 size={18} /> Delete Account
          </button> */}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto scroll-smooth">
        {/* Mobile Top Bar */}
        <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 md:hidden">
          <h1 className="font-semibold text-xl">Hello, {profile.name || "Profile"}</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-blue-700 hover:text-gray-900"
          >
            <Menu size={22} />
          </button>
        </div>

        {renderContent()}
      </main>

      {/* Note Delete Confirm Dialog */}
      <Dialog
        open={confirmNoteOpen}
        TransitionComponent={Fade}
        keepMounted
        onClose={() => setConfirmNoteOpen(false)}
      >
        <DialogTitle>{"Delete Note"}</DialogTitle>
        <DialogContent>
          ⚠️ Are you sure you want to delete this note titled "
          <strong>{noteToDelete?.title}</strong>"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmNoteOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDeleteNote}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      {/* Delete Confirm Dialog */}
      {/* <Dialog
        open={confirmOpen}
        TransitionComponent={Fade}
        keepMounted
        onClose={() => setConfirmOpen(false)}
      >
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          ⚠️ Are you sure you want to permanently delete your account? This
          action cannot be undone!
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}

    </div>
  );
}
