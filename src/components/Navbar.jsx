import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaGlobe, FaUser, FaBars, FaMoon } from "react-icons/fa";
import "../style/auth/Navbar.css";
import Sidebar from "./Sidebar";
import { AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span className="logo-red">Hot</span>
            <span className="logo-orange">el</span>
            <span className="logo-blue">ing</span>
          </Link>

          <ul className="navbar-links">
            <li>
              <FaMoon className="icon" />
            </li>
            <li>
              <FaGlobe className="icon" />
              <span>EN | ES</span>
            </li>
            <li className="menu-btn" onClick={() => setCollapsed(prev => !prev)}>
              <FaBars className="icon" />
              <span>Menu</span>
            </li>
          </ul>
        </div>
      </nav>

      <AnimatePresence>
        <Sidebar isOpen={collapsed} />
      </AnimatePresence>
    </>
  );
}
