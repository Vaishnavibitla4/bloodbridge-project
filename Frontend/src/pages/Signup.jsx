import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const Signup = ({ onLoginSuccess }) => {
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  const adminCredentials = {
    email: "admin@gmail.com",
    password: "admin1234",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fullname = form.fullname?.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!role) {
      toast.error("Please select Admin or User!");
      return;
    }

    const emailRegex = /^[\w._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address (must end with @gmail.com)");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    try {
      if (role === "user") {
        const url = isSignIn
          ? `${API_URL}/auth/login`
          : `${API_URL}/auth/register`;

        const body = isSignIn
          ? { email, password }
          : { fullname, email, password, role };

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        let data;
        try {
          data = await res.json();
        } catch {
          data = {};
        }

        console.log("📩 Backend response:", res.status, data);

        if (res.ok) {
          toast.success(data.message || "Success!");

          if (data.user && data.token) {
  localStorage.setItem("authToken", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
} else {
  // fallback (if backend doesn't send both fields)
  localStorage.setItem("authToken", data.token || "dummy-token");
  localStorage.setItem("user", JSON.stringify({ fullname, email, role }));
}


          setTimeout(() => {
            if (onLoginSuccess) onLoginSuccess("user"); // ✅ update login state
            navigate("/home"); // ✅ redirect
          }, 1500);
        } else {
          toast.error(data.message || data.error || `Error: ${res.status}`);
        }
      } else if (role === "admin") {
        if (email === adminCredentials.email && password === adminCredentials.password) {
          toast.success("Admin Login Successful!");
          localStorage.setItem("authToken", "admin-token");

          setTimeout(() => {
            if (onLoginSuccess) onLoginSuccess("admin"); // ✅ update login state
            navigate("/admin"); // ✅ redirect
          }, 1500);
        } else {
          toast.error("Invalid Admin credentials!");
        }
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      toast.error("Network or server error! Check console.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-600 via-rose-500 to-pink-500">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <svg className="w-12 h-12 text-red-600 mb-4 animate-pulse mx-auto" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C12 2 4 10.5 4 15.5C4 20.5 8 22 12 22C16 22 20 20.5 20 15.5C20 10.5 12 2 12 2Z" />
        </svg>

        <h2 className="text-3xl font-extrabold text-center text-red-600 mb-6">
          {role === "admin"
            ? "Admin Sign In"
            : isSignIn
            ? "Sign In to Your Account"
            : "Create Account"}
        </h2>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Are you signing up as:</p>
          <div className="flex gap-6 justify-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={(e) => {
                  setRole(e.target.value);
                  setIsSignIn(false);
                }}
                className="mr-2 accent-red-600"
              />
              User
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => {
                  setRole(e.target.value);
                  setIsSignIn(true);
                }}
                className="mr-2 accent-red-600"
              />
              Admin
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {role === "user" && !isSignIn && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
          >
            {role === "admin" || isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {role === "user" && !isSignIn && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsSignIn(true)}
              className="text-red-600 font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;