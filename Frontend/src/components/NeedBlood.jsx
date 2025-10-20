import React, { useState } from "react";
import axios from "axios";

// Dummy Blood Stock Data
const bloodStock = [
  { type: "A+" },
  { type: "B+" },
  { type: "O+" },
  { type: "AB+" },
  { type: "A-" },
  { type: "B-" },
  { type: "O-" },
  { type: "AB-" },
];

export default function BloodRequestPage() {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    bloodType: "",
    hospital: "",
    urgency: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Filter blood types by search
  const filteredStock = bloodStock.filter((b) =>
    b.type.toLowerCase().includes(search.toLowerCase())
  );

  // Form validation
  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.bloodType) newErrors.bloodType = "Blood type is required";
    if (!form.hospital) newErrors.hospital = "Hospital name is required";
    if (!form.urgency) newErrors.urgency = "Urgency level is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/recipients`, form);
    alert(response.data.message);
    setSubmitted(true);
  } catch (error) {
    const msg = error.response?.data?.message || "Something went wrong";
    alert(msg); // shows “User not registered” if email is invalid
  }
};

  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-red-700">
        Blood Request Portal
      </h1>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="🔍 Search Blood Type..."
          className="w-full border-2 border-red-500 rounded-lg p-3 
                     focus:outline-none focus:ring-2 focus:ring-red-600 
                     shadow-md placeholder-gray-400 text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Show filtered results */}
        {search && (
          <div className="mt-2 bg-gray-100 p-2 rounded shadow-sm">
            {filteredStock.length > 0 ? (
              filteredStock.map((b) => (
                <p key={b.type} className="text-red-600 font-medium">
                  {b.type}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No blood type found</p>
            )}
          </div>
        )}
      </div>

      {/* Recipient Request Form */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Request Blood</h2>
        {submitted ? (
          <p className="text-green-600 font-medium">
            ✅ Your request has been sent to admin. You will be contacted soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg p-2"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-medium">Blood Type</label>
              <select
                className="w-full border rounded-lg p-2"
                value={form.bloodType}
                onChange={(e) => setForm({ ...form, bloodType: e.target.value })}
              >
                <option value="">Select</option>
                {bloodStock.map((b) => (
                  <option key={b.type} value={b.type}>
                    {b.type}
                  </option>
                ))}
              </select>
              {errors.bloodType && (
                <p className="text-red-500 text-sm">{errors.bloodType}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Hospital Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={form.hospital}
                onChange={(e) => setForm({ ...form, hospital: e.target.value })}
              />
              {errors.hospital && (
                <p className="text-red-500 text-sm">{errors.hospital}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Urgency</label>
              <select
                className="w-full border rounded-lg p-2"
                value={form.urgency}
                onChange={(e) => setForm({ ...form, urgency: e.target.value })}
              >
                <option value="">Select</option>
                <option value="Immediate">Immediate</option>
                <option value="Within 24 Hours">Within 24 Hours</option>
                <option value="Not Urgent">Not Urgent</option>
              </select>
              {errors.urgency && (
                <p className="text-red-500 text-sm">{errors.urgency}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
