import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Verify Recipients", path: "/admin/verify" },
    { name: "Match Donors", path: "/admin/match" },
    { name: "Donor Records", path: "/admin/donors" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="p-6">
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
  );
};

export default Sidebar;