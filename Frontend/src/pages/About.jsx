import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      style={{
        background: "linear-gradient(to bottom, #ffffff, #ffe5e5)", // soft gradient
      }}
    >
      {/* Main Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 mb-4">
        BloodBridge
      </h1>

      {/* Subtitle */}
      <h2 className="text-2xl md:text-3xl text-gray-800 mb-6">
        Saving Lives Digitally
      </h2>

      {/* Short Description */}
      <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
        BloodBridge connects blood donors with recipients efficiently, ensuring life-saving help reaches those in need quickly and reliably.
      </p>

      {/* Get Started Button */}
      <button
        onClick={() => navigate("/signup")}
        className="px-8 py-4 bg-red-600 text-white rounded-xl shadow-lg hover:bg-red-700 transition-all font-semibold text-lg"
      >
        Get Started
      </button>

      {/* Optional Small Footer / Note */}
      <p className="mt-12 text-gray-400 text-sm">
        Join our mission to make blood donation smarter and faster.
      </p>
    </div>
  );
};

export default About;