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
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <User size={18} className="text-purple-500" />
                <span>{profile.username}</span>
              </div>
            </div>
          </div>
        );

      case "notes":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">My Notes</h2>
            <p className="text-gray-600 text-sm">
              Your personal notes will appear here. You can add, edit, or delete
              them later.
            </p>
          </div>
        );

      case "tasks":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
            <p className="text-gray-600 text-sm">
              Manage your projects and goals here (feature coming soon).
            </p>
          </div>
        );

      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-600 text-sm">
              Account configuration and preferences will be added here.
            </p>
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
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between transform transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
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
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition ${
                  activeSection === id
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
          <h1 className="font-semibold text-lg">{profile.name || "Profile"}</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 hover:text-gray-900"
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
