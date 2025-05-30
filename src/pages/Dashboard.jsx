import React from "react";
import Sidebar from "../components/Sidebar";
import "../style/auth/Dashboard.css";
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
