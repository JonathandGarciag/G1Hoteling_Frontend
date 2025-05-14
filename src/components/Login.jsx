import React, { useState } from "react";
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">Login to your Acme Inc account</p>
          <form onSubmit={handleLogin} className="login-form">
            <label>Email</label>
            <input
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="login-label-row">
              <label>Password</label>
              <a href="#">Forgot your password?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="login-divider">Or continue with</div>

          <div className="social-login">
            <button className="social-btn"></button>
            <button className="social-btn">G</button>
            <button className="social-btn">∞</button>
          </div>

          <p className="signup-link">
            Don’t have an account? <a href="#">Sign up</a>
          </p>
        </div>
        <div className="login-right">
            <img
                src="../assets/image/hotelogin.png"
                alt="Decorative"
                style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                }}
            />
        </div>
      </div>
      <p className="terms">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default Login;
