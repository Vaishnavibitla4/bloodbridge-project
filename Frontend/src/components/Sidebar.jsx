import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Verify Recipients", path: "/admin/verify" },
    { name: "Match Donors", path: "/admin/match" },
    { name: "Donor Records", path: "/admin/donors" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/signup");
  };

  return (
    <div className="p-6 flex flex-col h-full justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-md text-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white text-red-700 font-semibold"
                      : "hover:text-yellow-300"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full mt-6 bg-white text-red-700 font-semibold py-2 rounded-md hover:bg-gray-100 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;