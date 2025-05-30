import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/auth/Login.css";
import hotelLoginImage from "../../assets/image/hotelogin.png";
import { useLogin } from "../../shared/hooks/useLogin";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();

  return (
    <div className="login-container">
      <motion.div
        className="login-box"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-left">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">Login to your account</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(email, password);
            }}
            className="login-form"
          >
            <label>Email</label>
            <div className="input-icon">
              <FaEnvelope />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label>Password</label>
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Cargando..." : "Login"}
            </button>
          </form>

          <p className="signup-link">
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </p>
          <p className="signup-link">
            <a href="/forgot-password">¿Has olvidado la contraseña?</a>
          </p>
        </div>

        <div className="login-right">
          <img
            src={hotelLoginImage}
            alt="Decorativo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </motion.div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
