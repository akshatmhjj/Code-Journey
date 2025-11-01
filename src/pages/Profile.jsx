import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
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

  const handleDeleteConfirm = async () => {
    setConfirmOpen(false);
    setActionLoading(true);
    try {
      await api.delete("/auth/delete-account");
      showAlert("Your account has been deleted successfully.", "success");
      setTimeout(async () => {
        await logout();
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Error deleting account:", err);
      showAlert(
        err.response?.data?.message || "Failed to delete account",
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

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
          <div className="p-6 md:p-10">
            {/* Header */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <LayoutDashboard className="text-blue-600" size={26} />
              Dashboard Overview
            </h2>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8 hover:shadow-lg transition-all">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-300 to-purple-300 flex items-center justify-center text-black text-2xl font-semibold shadow-md">
                  {profile.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{profile.name || "User"}</h3>
                  <p className="text-gray-500">@{profile.username}</p>
                  <p className="text-sm text-gray-400 mt-1">{profile.email}</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Notes Created",
                  value: "12",
                  icon: StickyNote,
                  color: "text-blue-500 bg-blue-50",
                },
                {
                  title: "Tasks Completed",
                  value: "8",
                  icon: ClipboardList,
                  color: "text-green-500 bg-green-50",
                },
                {
                  title: "Account Age",
                  value: "3 Months",
                  icon: FileText,
                  color: "text-purple-500 bg-purple-50",
                },
              ].map(({ title, value, icon: Icon, color }) => (
                <div
                  key={title}
                  className="flex items-center justify-between p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div>
                    <h4 className="text-sm text-gray-500">{title}</h4>
                    <p className="text-xl font-semibold text-gray-800 mt-1">{value}</p>
                  </div>
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${color}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Updated profile information.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Added 3 new notes.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Completed 2 tasks.
                </li>
              </ul>
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

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Example Note Cards */}
              {[1, 2, 3].map((note) => (
                <div
                  key={note}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg p-5 transition-all hover:-translate-y-1"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Sample Note {note}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    This is a preview of your note’s content. Soon you’ll be able to
                    create, edit, and delete your own notes here!
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button className="px-3 py-1.5 text-sm rounded-lg bg-yellow-100 text-yellow-700 font-medium hover:bg-yellow-200 transition">
                      Coming Soon
                    </button>
                  </div>
                </div>
              ))}
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

            <div className="bg-white rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <input
                  disabled
                  placeholder="Add a new task (coming soon)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <button
                  disabled
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-3">
                {[{ text: "Build a cool dashboard UI" }, { text: "Implement notes CRUD" }, { text: "Sync with backend API" }].map(
                  (task, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-200"
                    >
                      <span className="text-gray-700">{task.text}</span>
                      <span className="text-sm text-green-600 font-medium">
                        Coming Soon
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Settings className="text-indigo-600" size={22} />
              Settings
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
    <div className="min-h-screen flex bg-[url('https://tailframes.com/images/squares-bg.webp')] bg-contain bg-fixed bg-center bg-repeat text-gray-800">
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
          <button
            onClick={() => setConfirmOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2 mt-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
          >
            <Trash2 size={18} /> Delete Account
          </button>
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
      <main className="flex-1 min-h-screen">
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

      {/* Delete Confirm Dialog */}
      <Dialog
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
      </Dialog>
    </div>
  );
}
