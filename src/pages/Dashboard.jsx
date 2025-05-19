import React from "react";
import Sidebar from "../components/Sidebar";
import "../style/Dashboard.css";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
