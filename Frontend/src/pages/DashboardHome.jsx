import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardHome = () => {
  const [bloodTypeData, setBloodTypeData] = useState({});
  const [totalDonors, setTotalDonors] = useState(null);
  const [recipientCount, setRecipientCount] = useState(null);
  const [matchedCount, setMatchedCount] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const donorRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/donors/count`);
        const recipientRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipients/count`);
        const matchRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/donors/matches`);
        const bloodTypeRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/donors/blood-type-stats`);

        setTotalDonors(donorRes.data.totalDonors);
        setRecipientCount(recipientRes.data.totalRecipients);
        setMatchedCount(matchRes.data.length);
        setBloodTypeData(bloodTypeRes.data); // ✅ Real donor data
      } catch (err) {
        console.error("Failed to fetch counts:", err);
      }
    };
    fetchCounts();
  }, []);

  const calculatePercentages = () => {
    const total = Object.values(bloodTypeData).reduce((a, b) => a + b, 0);
    const perc = {};
    Object.keys(bloodTypeData).forEach((t) => {
      perc[t] = ((bloodTypeData[t] / total) * 100).toFixed(1);
    });
    return perc;
  };

  const bloodTypePercentages = calculatePercentages();

  const donorStats = {
    labels: ["Active Donors", "Inactive Donors", "New Registrations"],
    datasets: [
      {
        data: [720, 180, 345],
        backgroundColor: ["#ef4444", "#f59e0b", "#10b981"],
      },
    ],
  };

  const bloodTypeStats = {
    labels: Object.keys(bloodTypeData).map(
      (type) => `${type} (${bloodTypePercentages[type]}%)`
    ),
    datasets: [
      {
        data: Object.values(bloodTypeData),
        backgroundColor: [
          "#dc2626", "#f97316", "#facc15", "#4ade80",
          "#22d3ee", "#3b82f6", "#8b5cf6", "#ec4899",
        ],
      },
    ],
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-red-600 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Donors</h2>
          <p className="text-3xl font-bold text-red-600">
            {totalDonors !== null ? totalDonors : "Loading..."}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Pending Verifications</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {recipientCount !== null ? recipientCount : "Loading..."}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Successful Matches</h2>
          <p className="text-3xl font-bold text-green-500">
            {matchedCount !== null ? matchedCount : "Loading..."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Donor Activity</h3>
          <Pie data={donorStats} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Blood Type Distribution</h3>
          {Object.keys(bloodTypeData).length > 0 ? (
            <Pie data={bloodTypeStats} />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
