import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SocialIcons from "../components/SocialIcons";
import Orb from "../components/Orb";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const location = useLocation();
  const from = location.state?.from || "/";



  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login({ username: form.email, password: form.password });
      showAlert("Login successful!", "success");
      setTimeout(() => navigate(from, { replace: true }), 500);
      navigate(from, { replace: true });
    } catch (err) {
      showAlert(err.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Orb
          hoverIntensity={0.2}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>

      <div className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-semibold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Welcome
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-white ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            />
          </div>

          <div className="relative">
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-white ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            />
            <span
              onClick={() => !loading && setShowPassword(!showPassword)} // prevent toggle while loading
              className={`absolute right-4 top-10 cursor-pointer ${loading
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-400 hover:text-gray-200"
                }`}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all cursor-pointer ${loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="animate-spin" size={20} />
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6">
          <SocialIcons />
        </div>

        <p className="text-center mt-6 text-gray-300">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-400 hover:text-blue-300 underline transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
