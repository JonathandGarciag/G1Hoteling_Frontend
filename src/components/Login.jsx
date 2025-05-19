import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Login.css";
import hotelLoginImage from "../assets/image/hotelogin.png";
import { useLogin } from "../shared/hooks/useLogin";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin(); // ✅ función correcta

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">Login to your account</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(email, password); // ✅ aquí estaba el error original
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
        </div>

        <div className="login-right">
          <img
            src={hotelLoginImage}
            alt="Decorativo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
