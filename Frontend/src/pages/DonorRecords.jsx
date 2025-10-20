import React, { useState, useEffect } from "react";

const DonorRecords = () => {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donors`); // your existing getDonors route
        const data = await res.json();
        if (res.ok) {
          setDonors(data); // if your backend sends { donors: [...] } use data.donors
        } else {
          console.error(data.message || "Failed to fetch donors");
        }
      } catch (err) {
        console.error("Error fetching donors:", err);
      }
    };

    fetchDonors();
  }, []);

  const handleViewDetails = (donor) => setSelectedDonor(donor);
  const closeModal = () => setSelectedDonor(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Donor Records</h1>

      <ul className="text-sm text-gray-700 space-y-4">
        {donors.map((donor, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b border-gray-200 pb-3"
          >
            <span>
              ✔ <strong>{donor.name}</strong> – <strong>{donor.bloodGroup}  </strong>  Last donation:{" "}
              {new Date(donor.lastDonationDate).toLocaleDateString()}
            </span>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200"
              onClick={() => handleViewDetails(donor)}
            >
              View Full Details
            </button>
          </li>
        ))}
      </ul>

      {selectedDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 shadow-lg relative">
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
              Donor Full Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
              <p><strong>Full Name:</strong> {selectedDonor.name}</p>
              <p><strong>Age:</strong> {selectedDonor.age}</p>
              <p><strong>Weight:</strong> {selectedDonor.weight} kg</p>
              <p><strong>Gender:</strong> {selectedDonor.gender}</p>
              <p><strong>Blood Group:</strong> {selectedDonor.bloodGroup}</p>
              <p><strong>Contact:</strong> {selectedDonor.contact}</p>
              <p><strong>Email:</strong> {selectedDonor.email}</p>
              <p><strong>Address:</strong> {selectedDonor.address}</p>
              <p><strong>City:</strong> {selectedDonor.city}</p>
              <p><strong>District:</strong> {selectedDonor.district}</p>
              <p><strong>State:</strong> {selectedDonor.state}</p>
              <p><strong>Area:</strong> {selectedDonor.area}</p>
              <p><strong>Last Donation Date:</strong> {new Date(selectedDonor.lastDonationDate).toLocaleDateString()}</p>
              <p><strong>Disease Info:</strong> {selectedDonor.diseaseInfo}</p>
              <p><strong>Registration Date:</strong> {new Date(selectedDonor.registrationDate).toLocaleDateString()}</p>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorRecords;
