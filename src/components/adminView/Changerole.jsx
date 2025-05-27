import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChangeRole } from "../../shared/hooks/user/useChangeRole";
import { FaUser, FaEnvelope, FaUserShield } from "react-icons/fa";
import "../../style/ChangeRole.css"; 

export default function ChangeRoleView() {
  const {
    user,
    loading,
    handleSubmit,
    showConfirmation
  } = useChangeRole();

  if (loading) return <p style={{ textAlign: "center" }}>Cargando usuario...</p>;
  if (!user) return <p style={{ textAlign: "center" }}>Usuario no encontrado</p>;

  return (
    <>
      <ToastContainer />
      <AnimatePresence>
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading">Cambiar rol de usuario</h2>

          <div className="info-group">
            <div className="info-row"><FaUser /><strong>Nombre:</strong> {user.name}</div>
            <div className="info-row"><FaEnvelope /><strong>Correo:</strong> {user.email}</div>
            <div className="info-row"><FaUserShield /><strong>Rol actual:</strong> {user.role.replace("_ROLE", "")}</div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <label className="label">Rol disponible:</label>
            <button type="submit" className="button">Cambiar a Hotel</button>
          </form>

          <AnimatePresence>
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="confirmation">
                  ¡Rol actualizado a HOTEL_ROLE!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
