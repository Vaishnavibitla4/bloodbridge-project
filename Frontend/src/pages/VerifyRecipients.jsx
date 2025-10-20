import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const VerifyRecipients = () => {
  const [recipientRequests, setRecipientRequests] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  // Fetch all recipients from DB
  const fetchRecipients = async () => {
    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/api/recipients");
      const data = await res.json();

      // Sort: unapproved first, approved last
      data.sort((a, b) => a.approved - b.approved);
      setRecipientRequests(data);
    } catch (error) {
      console.error("Error fetching recipients:", error);
      toast.error("Failed to fetch recipients");
    }
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  // Approve recipient
  const handleApprove = async (id, name) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipients/approve/${id}`, {
        method: "PUT",
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Approved request for ${name}`, { icon: "✅", duration: 3000 });

        // Move approved recipient to bottom
        setRecipientRequests((prev) =>
          prev
            .map((r) => (r._id === id ? { ...r, approved: true } : r))
            .sort((a, b) => a.approved - b.approved)
        );
      } else {
        toast.error(data.message || "Failed to approve recipient");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-4xl font-bold text-red-600 mb-6">Verify Recipients</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {recipientRequests.length > 0 ? (
          <ul className="space-y-4 text-sm text-gray-700">
            {recipientRequests.map((r) => (
              <li key={r._id} className="flex justify-between items-center">
                <span>
                  🕒 {r.name} – {r.bloodType} – {r.hospital}{" "}
                  {r.approved && <span className="text-green-600 font-semibold">(Approved)</span>}
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => setSelectedRecipient(r)}
                  >
                    View Full Details
                  </button>
                  {!r.approved && (
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleApprove(r._id, r.name)}
                    >
                      Approve
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">🎉 No recipient requests!</p>
        )}
      </div>

      {/* Modal */}
      {selectedRecipient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Recipient Details</h2>
            <p><strong>Full Name:</strong> {selectedRecipient.name}</p>
            <p><strong>Email:</strong> {selectedRecipient.email}</p>
            <p><strong>Blood Type:</strong> {selectedRecipient.bloodType}</p>
            <p><strong>Hospital:</strong> {selectedRecipient.hospital}</p>
            <p><strong>Urgency:</strong> {selectedRecipient.urgency}</p>
            <p><strong>Request Date:</strong> {new Date(selectedRecipient.requestDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {selectedRecipient.approved ? "Approved" : "Pending"}</p>

            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setSelectedRecipient(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyRecipients;
