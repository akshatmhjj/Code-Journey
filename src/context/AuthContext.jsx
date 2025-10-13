import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // React to logout in other tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "logout") {
        setUser(null);
        sessionStorage.removeItem("userFetched");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchMe = async () => {
      try {
        // Only skip fetch if user fetched already this session and user exists
        if (sessionStorage.getItem("userFetched") === "true") {
          const cached = sessionStorage.getItem("userState");
          if (cached) {
            setUser(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }

        const res = await api.get("/auth/me");
        if (!mounted) return;
        setUser(res.data.user || null);
        sessionStorage.setItem("userFetched", "true");
        sessionStorage.setItem("userState", JSON.stringify(res.data.user || null));
      } catch (err) {
        // On 401, ensure we don't cache as fetched
        sessionStorage.removeItem("userFetched");
        sessionStorage.removeItem("userState");
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMe();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async ({ username, password }) => {
    const res = await api.post("/auth/login", { username, password });
    setUser(res.data.user || null);
    sessionStorage.setItem("userFetched", "true");
    sessionStorage.setItem("userState", JSON.stringify(res.data.user || null));
    return res;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      // ignore network errors
    } finally {
      setUser(null);
      sessionStorage.removeItem("userFetched");
      sessionStorage.removeItem("userState");
      localStorage.setItem("logout", Date.now()); // notify other tabs
    }
  };

  const register = (payload) => api.post("/auth/register", payload);
  const verifyOtp = async ({ email, otp }) => {
    const res = await api.post("/auth/verify-otp", { email, otp });
    if (res.data?.user) {
      setUser(res.data.user);
      sessionStorage.setItem("userFetched", "true");
      sessionStorage.setItem("userState", JSON.stringify(res.data.user));
    }
    return res;
  };
  const resendOtp = (email) => api.post("/auth/resend-otp", { email });

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, verifyOtp, resendOtp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
