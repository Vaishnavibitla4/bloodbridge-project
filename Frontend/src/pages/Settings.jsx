import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSaveChanges = async () => {
  if (!newEmail || !newPassword) {
    toast.error("Please fill in all fields.");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail, password: newPassword }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      setShowModal(false);
    } else {
      toast.error(data.message || "Failed to update credentials");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error");
  }
};


  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Admin Settings</h1>
      <p className="text-sm text-gray-600 mb-4">
        Update profile, change password, or configure preferences.
      </p>

      <button
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
        onClick={() => setShowModal(true)}
      >
        Open Settings
      </button>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
              Update Admin Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  New Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default Settings;
