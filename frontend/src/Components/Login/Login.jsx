import React, { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice.js";
import axios from "axios";
const Login = () => {
  const [captcha, setCaptcha] = useState("");
  const dispatch = useDispatch();
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enteredCaptcha !== captcha) {
      alert("Invalid Captcha");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      dispatch(
        login({
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
        })
      );
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div id="login-page" className="container">
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
            <label>
              <input
                type="radio"
                name="role"
                value="teacher"
                onChange={(e) => setRole(e.target.value)}
                required
              />
              Admin
            </label>
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            required
          />
          <div className="captcha">
            <span>{captcha}</span>
            <button type="button" onClick={refreshCaptcha}>
              Refresh
            </button>
          </div>
          <input
            value={enteredCaptcha}
            onChange={(e) => setEnteredCaptcha(e.target.value)}
            type="text"
            placeholder="Enter CAPTCHA"
            required
          />
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
