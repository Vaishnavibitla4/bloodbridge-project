import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHome from "./DashboardHome";
import VerifyRecipients from "./VerifyRecipients";
import MatchDonors from "./MatchDonors";
import DonorRecords from "./DonorRecords";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed h-full bg-red-700 text-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="verify" element={<VerifyRecipients />} />
          <Route path="match" element={<MatchDonors />} />
          <Route path="donors" element={<DonorRecords />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;