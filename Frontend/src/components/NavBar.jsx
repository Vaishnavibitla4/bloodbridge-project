import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSectionChange }) => {
  const [isWhyDonateOpen, setIsWhyDonateOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (section) => {
    if (["about", "why-donate", "contact"].includes(section)) {
      onSectionChange(null);
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      onSectionChange(section);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // optional: clear token
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-red-600 text-white px-8 py-4 shadow-md">
      {/* Logo + Title */}
      <div className="flex items-center space-x-3">
        <div className="bg-white p-1 rounded-full">
          <img src={"/bloodlogo.png"} alt="BloodBridge Logo" className="w-10 h-10 object-contain" />
        </div>
        <h1 className="font-bold text-xl tracking-wide">
          BloodBridge <span className="font-normal text-sm">– Saving Lives Digitally</span>
        </h1>
      </div>

      {/* Nav Links */}
      <ul className="flex space-x-8 font-semibold text-lg relative">
        {["About Us", "Why Donate Blood", "Become Donor", "Need Blood", "Contact Us"].map((name, index) => {
          const href = name === "About Us" ? "about"
                    : name === "Why Donate Blood" ? "why-donate"
                    : name === "Become Donor" ? "become-donor"
                    : name === "Need Blood" ? "need-blood"
                    : "contact";

          return (
            <li
              key={index}
              className="relative cursor-pointer group"
              onMouseEnter={() => name === "Why Donate Blood" && setIsWhyDonateOpen(true)}
              onMouseLeave={() => name === "Why Donate Blood" && setIsWhyDonateOpen(false)}
            >
              <span
                className="transition-colors duration-300 group-hover:text-yellow-300"
                onClick={() => handleClick(href)}
              >
                {name}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>

              {/* Dropdown */}
              {name === "Why Donate Blood" && isWhyDonateOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white text-gray-800 shadow-lg rounded-lg w-[700px] p-6 grid grid-cols-2 gap-6 z-50">
                  <div>
                    <h4 className="font-bold text-red-600 mb-2">Donation Basics</h4>
                    <ul className="space-y-1">
                      <li><span onClick={() => handleClick("eligibility")} className="cursor-pointer hover:text-red-600 hover:underline">Eligibility Requirements</span></li>
                      <li><span onClick={() => handleClick("types")} className="cursor-pointer hover:text-red-600 hover:underline">Types of Blood Donations</span></li>
                      <li><span onClick={() => handleClick("learn")} className="cursor-pointer hover:text-red-600 hover:underline">Learn About Blood</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-600 mb-2">Donation Process</h4>
                    <ul className="space-y-1">
                      <li><span onClick={() => handleClick("before-after")} className="cursor-pointer hover:text-red-600 hover:underline">What to Do Before, During & After</span></li>
                      <li><span onClick={() => handleClick("first-time")} className="cursor-pointer hover:text-red-600 hover:underline">First-Time Donors</span></li>
                      <li><span onClick={() => handleClick("health")} className="cursor-pointer hover:text-red-600 hover:underline">Health Assessment</span></li>
                    </ul>
                  </div>
                </div>
              )}
            </li>
          );
        })}

        {/* ✅ Logout Button */}
        <li className="relative cursor-pointer group">
          <span
            className="transition-colors duration-300 group-hover:text-yellow-300"
            onClick={handleLogout}
          >
            Logout
          </span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;