import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      style={{
        background: "linear-gradient(to bottom, #ffffff, #ffe5e5)", // light white to soft red gradient
      }}
    >
      {/* Project Title */}
      <h1 className="text-5xl font-extrabold text-red-600 mb-4">
        BloodBridge
      </h1>

      {/* Tagline */}
      <p className="text-xl text-gray-700 mb-8 max-w-lg">
        Saving Lives Digitally. Connecting blood donors with those in need efficiently and instantly.
      </p>

      {/* Get Started Button */}
      <button
        onClick={() => navigate("/signup")}
        className="px-8 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-all font-semibold"
      >
        Get Started
      </button>
    </div>
  );
};

export default About;