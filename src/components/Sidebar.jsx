/** @jsxImportSource @emotion/react */
import React from "react";
import {
  FaHotel, FaBed, FaCalendarAlt, FaHistory, FaUser, FaCalendar,
  FaBook, FaUsers, FaFileInvoice, FaUserShield, FaChartBar, FaCog, FaCalendarDay
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../shared/hooks/auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../shared/hooks/auth/userLogout";
import "../style/auth/Sidebar.css";

const variants = {
  open: { y: 0, opacity: 1 },
  closed: { y: 500, opacity: 0 }
};

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      className="sidebar-chat modern"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      variants={variants}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="sidebar-header">
        <div className="profile-icon">
          <span>{user?.email?.charAt(0).toUpperCase()}</span>
        </div>
        <div className="user-info-right">
          <h3 className="username">{user?.username}</h3>
          <h3 className="username">{user?.email}</h3>
        </div>
      </div>

      <ul className="menu modern-menu">
        {user?.role === "CLIENT_ROLE" && (
          <>
            <li><FaHotel /><span>Hoteles</span></li>
            <li><FaBed /><span>Habitaciones</span></li>
            <li><FaCalendarAlt /><span>Eventos</span></li>
            <li><FaHistory /><span>Reservaciones</span></li>
            <li><FaCog /><span>Mi cuenta</span></li>
          </>
        )}
        {user?.role === "HOTEL_ROLE" && (
          <>
            <li onClick={() => navigate("/reservaciones")}>
              <FaBook /> <span>Reservaciones</span>
            </li>
            <li onClick={() => navigate(`/room-form`)}>
              <FaUsers /> <span>Registrar Habitacion</span>
            </li>
            <li onClick={() => navigate("/room-list")}>
              <FaBed /> <span>Disponibilidad</span>
            </li>
            <li onClick={() => navigate("bill")}>
              <FaFileInvoice /> <span>Facturación</span>
            </li>
            <li onClick={() => navigate("/event-form")}>
              <FaCalendar /> <span>Registrar Eventos</span>
            </li>
            <li onClick={() => navigate("/events")}>
              <FaCalendarDay /> <span>Eventos</span>
            </li>
          </>
        )}
        {user?.role === "ADMIN_ROLE" && (
          <>
            <li onClick={() => navigate("users")}><FaUserShield /><span>Gestión de usuarios</span></li>
            <li onClick={() => navigate("hotel/viewHotel")}><FaHotel /><span>Gestion De Hoteles</span></li>
            <li onClick={() => navigate("statistics")}><FaChartBar /><span>Estadísticas</span></li>
            <li onClick={() => navigate("updateRole/:id")}><FaUser /><span>Cambiar roles</span></li>
            <li onClick={() => navigate("hotel/manage")}><FaHotel /><span>Nuevo/Asignar hotel</span></li>
          </>
        )}
      </ul>

      <div className="sidebar-footer">
        <button className="logout-modern" onClick={logout}>
          ⏎ Cerrar sesión
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
