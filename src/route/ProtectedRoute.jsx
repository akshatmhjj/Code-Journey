import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // 🚀 Trigger redirect after a small delay (for nice animation)
    useEffect(() => {
        if (!loading && !user) {
            const timer = setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1500); // 1.5s delay before redirect
            return () => clearTimeout(timer);
        }
    }, [user, loading, navigate]);

    // ⏳ Loading State
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#0a0c10] text-gray-400 text-lg animate-pulse">
                Checking authentication...
            </div>
        );
    }

    // 🔒 Not logged in
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black text-white ">
                <span>🔒 Access Denied</span>
                <p className="text-sm text-gray-500 mt-2">Redirecting to login...</p>
            </div>
        );
    }

    // ✅ Authenticated
    return children;
};

export default ProtectedRoute;
