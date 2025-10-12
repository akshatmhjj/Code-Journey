import { useEffect, useState } from "react";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { LogOut, User, Mail, Phone, MapPin, Trash2 } from "lucide-react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { useAlert } from "../context/AlertContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

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
    await logout();
    showAlert("Logged out successfully.", "info");
    navigate("/");
  };

  const handleDeleteConfirm = async () => {
    setConfirmOpen(false);
    try {
      await api.delete("/auth/delete-account");
      showAlert("Your account has been deleted successfully.", "success");
      setTimeout(async () => {
        await logout();
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Error deleting account:", err);
      showAlert(err.response?.data?.message || "Failed to delete account", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse text-gray-400">Loading your profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>No profile found. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-700 to-blue-500 rounded-full blur-3xl opacity-20 -top-40 -left-40 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-700 to-purple-500 rounded-full blur-3xl opacity-20 bottom-0 right-0 animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.5)]">
            <User size={48} className="text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {profile.name || "Anonymous Coder"}
          </h1>
          <p className="text-gray-400">@{profile.username}</p>
        </div>

        <div className="space-y-4 text-gray-200">
          <div className="flex items-center gap-3 border-b border-white/10 pb-2">
            <Mail className="text-blue-400" size={20} />
            <span>{profile.email || "Not provided"}</span>
          </div>

          <div className="flex items-center gap-3 border-b border-white/10 pb-2">
            <Phone className="text-purple-400" size={20} />
            <span>{profile.contact || "Not provided"}</span>
          </div>

          <div className="flex items-center gap-3 border-b border-white/10 pb-2">
            <MapPin className="text-pink-400" size={20} />
            <span>{profile.location || "Unknown"}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 font-semibold transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>

          <button
            onClick={() => setConfirmOpen(true)}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-gray-800 to-red-800 hover:from-red-900 hover:to-black text-white font-semibold transition-transform transform hover:scale-105 flex items-center justify-center gap-2 border border-red-500/30"
          >
            <Trash2 size={18} className="text-red-400" />
            Delete Account
          </button>
        </div>
      </div>

      <Dialog
        open={confirmOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setConfirmOpen(false)}
      >
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          ⚠️ Are you sure you want to permanently delete your account? This cannot be undone!
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
