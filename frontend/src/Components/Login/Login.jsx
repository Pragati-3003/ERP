import React, { useState, useEffect } from "react";
// import './Login.css';

const Login = () => {
  const [captcha, setCaptcha] = useState("");
  const [role, setRole] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login as ${role} functionality not implemented yet!`);
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div className="container">
      <div className="map">
        <img
          src="/*https://in.pinterest.com/pin/588775351313572933//600x400"
          alt="3D Map Placeholder"
        />
      </div>
      <div className="form-container">
        <h2>BANASTHALI'S - ERP</h2>
        <form onSubmit={handleSubmit}>
          <div className="role-selector">
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                onChange={(e) => setRole(e.target.value)}
                required
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="teacher"
                onChange={(e) => setRole(e.target.value)}
                required
              />
              Faculty
            </label>
          </div>
          <input type="text" placeholder="Enter username" required />
          <input type="password" placeholder="Enter password" required />
          <div className="captcha">
            <span>{captcha}</span>
            <button type="button" onClick={refreshCaptcha}>
              Refresh
            </button>
          </div>
          <input type="text" placeholder="Enter CAPTCHA" required />
          <div className="remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
