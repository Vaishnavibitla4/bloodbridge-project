import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const MatchDonors = () => {
  const [matches, setMatches] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  // Fetch all matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donors/matches`);
        const data = await res.json();

        // Filter out matches where donor email = recipient email
        const filteredMatches = data.filter(
          (match) => match.donorEmail !== match.recipientEmail
        );

        setMatches(filteredMatches);
      } catch (err) {
        console.error("Error fetching matches:", err);
        toast.error("Failed to fetch matches");
      }
    };

    fetchMatches();
  }, []);

  // Fetch donor details from donors collection
  const fetchDonorDetails = async (donorId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donors/${donorId}`);
      const data = await res.json();
      setSelectedDonor(data);
    } catch (err) {
      console.error("Error fetching donor details:", err);
      toast.error("Failed to fetch donor details");
    }
  };

  // Fetch recipient details from recipients collection
  const fetchRecipientDetails = async (recipientId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipients/${recipientId}`);
      const data = await res.json();
      setSelectedRecipient(data);
    } catch (err) {
      console.error("Error fetching recipient details:", err);
      toast.error("Failed to fetch recipient details");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-red-600 mb-4">Match Donors</h1>

      {matches.length > 0 ? (
        <ul className="text-sm text-gray-700 space-y-4">
          {matches.map((match, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <div>
                ✔ <strong>{match.donorName}</strong> – {match.bloodType} →{" "}
                <strong>{match.recipientName}</strong>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => fetchDonorDetails(match.donorId)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                >
                  View Donor
                </button>
                <button
                  onClick={() => fetchRecipientDetails(match.recipientId)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                >
                  View Recipient
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No matching donors found!</p>
      )}

      {/* Donor Details Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Donor Details</h2>
            <p><strong>Name:</strong> {selectedDonor.name}</p>
            <p><strong>Blood Type:</strong> {selectedDonor.bloodType}</p>
            <p><strong>District:</strong> {selectedDonor.district}</p>
            <p><strong>Phone:</strong> {selectedDonor.phone}</p>
            <p><strong>Email:</strong> {selectedDonor.email}</p>
            <button
              onClick={() => setSelectedDonor(null)}
              className="absolute top-2 right-2 text-red-500 font-bold text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Recipient Details Modal */}
      {selectedRecipient && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <h2 className="text-xl font-bold mb-4 text-green-600">Recipient Details</h2>
            <p><strong>Name:</strong> {selectedRecipient.name}</p>
            <p><strong>Blood Type:</strong> {selectedRecipient.bloodType}</p>
            <p><strong>Hospital:</strong> {selectedRecipient.hospital}</p>
            <p><strong>Urgency:</strong> {selectedRecipient.urgency}</p>
            <p><strong>Email:</strong> {selectedRecipient.email}</p>
            <button
              onClick={() => setSelectedRecipient(null)}
              className="absolute top-2 right-2 text-red-500 font-bold text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDonors;
