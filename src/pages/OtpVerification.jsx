import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react"; // ⬅️ loader icon
import Orb from "../components/Orb";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false); // ⬅️ new loading state
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOtp } = useAuth();
  const { showAlert } = useAlert();

  const email = location.state?.email;

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length < 6) {
      showAlert("Please enter all 6 digits.", "error");
      return;
    }

    setLoading(true); // start loading
    try {
      await verifyOtp({ email, otp: otpValue });
      showAlert("OTP verified successfully!", "success");
      navigate("/login");
    } catch (err) {
      showAlert(err.response?.data?.message || "Invalid OTP", "error");
    } finally {
      setLoading(false); // stop loading
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

      <div className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-semibold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Verify OTP
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Enter the 6-digit code sent to{" "}
          <span className="text-blue-400 font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
          <div className="flex gap-4 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={loading} // disable inputs while loading
                className={`w-14 h-14 text-center text-2xl font-semibold rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white transition-all ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                }`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all cursor-pointer ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="animate-spin" size={20} />
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
