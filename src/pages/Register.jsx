import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // ⬅️ Loader2 icon added
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";
import SocialIcons from "../components/SocialIcons";
import Orb from "../components/Orb";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    location: "",
    contact: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ⬅️ loading state

  const { register } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader

    try {
      const success = await register(form);
      if (success) {
        showAlert("OTP sent to your email!", "success");

        setTimeout(() => {
          navigate("/verify-otp", { state: { email: form.email } });
        }, 1200);
      } else {
        showAlert("Registration failed. Please check your details.", "error");
      }
    } catch (err) {
      showAlert("Something went wrong. Try again later.", "error");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black px-3 sm:px-6">
      <div className="absolute inset-0 z-0">
        <Orb
          hoverIntensity={0.2}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-semibold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Create Your Account
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500 text-white placeholder:text-sm placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500 text-white placeholder:text-sm placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500 text-white placeholder:text-sm placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500 text-white placeholder:text-sm placeholder:text-gray-400"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 cursor-pointer text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Indore, India"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500 text-white placeholder:text-sm placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                placeholder="9171xxxxxxx"
                value={form.contact}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500 text-white placeholder:text-sm placeholder:text-gray-400"
              />
            </div>
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
                <span>Sending OTP...</span>
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-6">
          <SocialIcons />
        </div>

        <p className="text-center mt-6 text-gray-300">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:text-blue-300 underline transition"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
