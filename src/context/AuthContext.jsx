import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (sessionStorage.getItem("userFetched") === "true") {
          setLoading(false);
          return;
        }

        const res = await api.get("/auth/me");
        setUser(res.data.user || null);
        sessionStorage.setItem("userFetched", "true");
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);


  const login = async ({ username, password }) => {
    const res = await api.post("/auth/login", { username, password });
    // backend sets cookie and returns user
    setUser(res.data.user || null);
    return res;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  const register = async (payload) => {
    // payload: { name, username, email, password, contact, location }
    return api.post("/auth/register", payload);
  };

  const verifyOtp = async ({ email, otp }) => {
    const res = await api.post("/auth/verify-otp", { email, otp });
    // backend issues cookie & returns user
    if (res.data?.user) setUser(res.data.user);
    return res;
  };

  const resendOtp = async (email) => api.post("/auth/resend-otp", { email });

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, verifyOtp, resendOtp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
