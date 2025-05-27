import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import hotelImage from "../../assets/image/hotelogin.png";
import { useRegister } from "../../shared/hooks/auth/useRegister";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../style/auth/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const { register, loading } = useRegister(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <motion.div className="login-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="login-title">Crea tu cuenta</h2>
          <p className="login-subtitle">Explora hoteles y reserva al instante</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              register(formData); 
            }}
            className="login-form"
          >
            <label>Nombre completo</label>
            <div className="input-icon">
              <FaUser />
              <input type="text" name="name" required onChange={handleChange} />
            </div>

            <label>Nombre de usuario</label>
            <div className="input-icon">
              <FaUser />
              <input type="text" name="username" required onChange={handleChange} />
            </div>

            <label>Email</label>
            <div className="input-icon">
              <FaEnvelope />
              <input type="email" name="email" required onChange={handleChange} />
            </div>

            <label>Contraseña</label>
            <div className="input-icon">
              <FaLock />
              <input type="password" name="password" required onChange={handleChange} />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>

          <p className="signup-link">
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </motion.div>

        <motion.div className="login-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={hotelImage} alt="Decorativo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
