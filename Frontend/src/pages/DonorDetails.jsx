import React from 'react';

const DonorDetails = ({ donor, onEdit }) => {
  if (!donor) {
    return (
      <p className="text-center text-gray-600">
        No donor details found.
      </p>
    );
  }

  // Only show relevant fields in a defined order
  const visibleFields = [
    "name",
    "age",
    "weight",
    "gender",
    "bloodGroup",
    "contact",
    "email",
    "address",
    "city",
    "district",
    "state",
    "area",
    "lastDonationDate",
    "diseaseInfo"
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
        ✅ You are already a registered donor
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
        {visibleFields.map((key) => (
          <div key={key}>
            <span className="font-medium capitalize">
              {key.replace(/([A-Z])/g, " $1")}:
            </span>{" "}
            {key === "lastDonationDate"
              ? donor[key]?.split("T")[0] || "N/A"
              : donor[key] || "N/A"}
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={onEdit}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default DonorDetails;
