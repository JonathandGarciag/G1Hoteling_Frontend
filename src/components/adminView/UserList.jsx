import React from "react";
import { useUserList } from "../../shared/hooks/user/useUserList";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaUserEdit, FaTag } from "react-icons/fa";
import "../../style/User.css";
import { AnimatePresence, motion } from "framer-motion";

export default function UserList() {
  const { users } = useUserList();
  const navigate = useNavigate();

  const handleClick = async (id, role) => {
    navigate(`/updateRole/${id}`);
  };

  return (
    <div className="page-wrapper">
      <div className="grid">
        <AnimatePresence>
          {users
            .filter((u) => u.role === "CLIENT_ROLE")
            .map((u) => (
              <motion.div
                key={u._id}
                className="badge-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="username"><FaUser /> {u.name}</h3>
                <p className="email"><FaTag /> {u.username}</p>
                <p className="email"><FaEnvelope /> {u.email}</p>
                <span className="role-label">CLIENTE</span>
                <button className="action" onClick={() => handleClick(u._id, u.role)}>
                  <FaUserEdit /> Cambiar Rol
                </button>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
