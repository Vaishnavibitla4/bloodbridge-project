import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const MatchDonors = () => {
  const [matches, setMatches] = useState([]);

  const fetchMatches = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donors/matches`);
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error("Error fetching matches:", err);
      toast.error("Failed to fetch matches");
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleShare = (donor, recipient) => {
    toast.success(`Shared ${donor}'s details with ${recipient}`, {
      icon: "📤",
      duration: 3000,
    });
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
              <span>
                ✔ <strong>{match.donor}</strong> – {match.blood} →{" "}
                <strong>{match.recipient}</strong>
              </span>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-200"
                onClick={() => handleShare(match.donor, match.recipient)}
              >
                Share Donor Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No matching donors found!</p>
      )}
    </div>
  );
};

export default MatchDonors;
