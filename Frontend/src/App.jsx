import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardHome from "./pages/DashboardHome";
import VerifyRecipients from "./pages/VerifyRecipients";
import MatchDonors from "./pages/MatchDonors";
import DonorRecords from "./pages/DonorRecords";
import Navbar from "./components/NavBar";

function AppWrapper() {
  const [authRole, setAuthRole] = useState(null);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthRole(null);
  };

  const showNavbar = authRole === "user" && location.pathname === "/home";

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {showNavbar && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={
            !authRole ? (
              <Signup onLoginSuccess={(role) => setAuthRole(role)} />
            ) : authRole === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/signup"
          element={<Signup onLoginSuccess={(role) => setAuthRole(role)} />}
        />

        <Route
          path="/home"
          element={
            authRole === "user" ? (
              <Home />
            ) : (
              <Signup onLoginSuccess={(role) => setAuthRole(role)} />
            )
          }
        />

        {/* Admin nested routes */}
        <Route
          path="/admin/*"
          element={
            authRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <Signup onLoginSuccess={(role) => setAuthRole(role)} />
            )
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="verify" element={<VerifyRecipients />} />
          <Route path="match" element={<MatchDonors />} />
          <Route path="donors" element={<DonorRecords />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;