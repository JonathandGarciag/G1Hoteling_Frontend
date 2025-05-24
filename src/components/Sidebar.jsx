import React, { useState } from "react";
import {
  FaHotel,
  FaBed,
  FaCalendarAlt,
  FaHistory,
  FaUser,
  FaBook,
  FaUsers,
  FaFileInvoice,
  FaUserShield,
  FaChartBar,
  FaCog,
  FaBars,
} from "react-icons/fa";
import "../style/Sidebar.css";
import { useAuth } from "../shared/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../shared/hooks/useUserDetails";
import { logout } from "../shared/hooks/userLogout";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={`modern-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="top-section">
        <div className="logo">{!collapsed ? "Hoteling" : "H"}</div>
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
      </div>

      <ul className="menu">
        {user?.role === "CLIENT_ROLE" && (
          <>
            <li>
              <FaHotel /> <span>Hoteles</span>
            </li>
            <li>
              <FaBed /> <span>Habitaciones</span>
            </li>
            <li>
              <FaCalendarAlt /> <span>Eventos</span>
            </li>
            <li>
              <FaHistory /> <span>Reservaciones</span>
            </li>
            <li>
              <FaCog /> <span>Mi cuenta</span>
            </li>
          </>
        )}

        {user?.role === "HOTEL_ROLE" && (
          <>
            <li onClick={() => navigate("/reservaciones")}>
              <FaBook /> <span>Reservaciones</span>
            </li>
            <li onClick={() => navigate(`/usuarios-hotel/${user.hotelId}`)}>
              <FaUsers /> <span>Clientes actuales</span>
            </li>
            <li onClick={() => navigate("/room-form")}>
              <FaBed /> <span>Disponibilidad</span>
            </li>
            <li onClick={() => navigate(`/eventos-hotel/${user.hotelId}`)}>
              <FaFileInvoice /> <span>Facturación</span>
            </li>
          </>
        )}

        {user?.role === "ADMIN_ROLE" && (
          <>
            <li onClick={() => navigate("/users")}>
              <FaUserShield /> <span>Gestión de usuarios</span>
            </li>
            <li onClick={() => navigate("/hotels")}>
              <FaHotel /> <span>Gestión de hoteles</span>
            </li>
            <li onClick={() => navigate("/statistics")}>
              <FaChartBar /> <span>Estadísticas</span>
            </li>
            <li onClick={() => navigate("/roles")}>
              <FaUser /> <span>Cambiar roles</span>
            </li>
          </>
        )}
      </ul>

      <div className="user-section">
        <div className="user-profile">
          <div className="avatar-generated">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <p className="name">{user?.username}</p>
            <p className="email">{user?.email}</p>
          </div>
        </div>

        {!collapsed && (
          <button className="logout-button" onClick={logout}>
            ⏎ Cerrar sesión
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
