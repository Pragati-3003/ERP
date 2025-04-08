import React, { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const [captcha, setCaptcha] = useState("");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // 🔥 Update Password States
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (!role) {
      alert("Please select a role");
      return;
    }
    // if (enteredCaptcha !== captcha) {
    //   alert("CAPTCHA is incorrect!");
    //   refreshCaptcha();
    //   return;
    // }

    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/api/auth/login",
    //     {
    //       email,
    //       password,
    //       role,
    //     }
    //   );

    //   dispatch(
    //     login({
    //       user: response.data.user,
    //       token: response.data.token,
    //       isAuthenticated: true,
    //     })
    //   );
    //   localStorage.setItem("token", response.data.token);
    //   navigate("/admin-dashboard");
    // } catch (error) {
    //   console.error(
    //     "Login failed:",
    //     error.response?.data?.message || error.message
    //   );

    //   alert(error.response?.data?.message || "Login failed. Please try again.");
    // }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
          role,
        }
      );

      dispatch(
        login({
          user: response.data.user,
          token: response.data.token,
          role: response.data.user.role,
          isAuthenticated: true,
        })
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      switch (response.data.user.role) {
        case "Admin":
          navigate("/admin/studentmanagment");
          break;
        case "Teacher":
          navigate("/teacher/take-attendance");
          break;
        case "Student":
          navigate("/student-dashboard");
          break;
        default:
          navigate("/login");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/auth/update-password",
        { email, oldPassword, newPassword }
      );

      alert(response.data.message);
      setShowUpdateModal(false);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.error(
        "Error updating password:",
        error.response?.data?.message || error.message
      );
      alert(
        error.response?.data?.message ||
          "Failed to update password. Check old password."
      );
    }
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div id="login-page" className="container">
      <div className="map">
        <img
          src="https://in.pinterest.com/pin/588775351313572933/"
          alt="3D Map Placeholder"
        />
      </div>
      <div className="form-container">
        <h2>ERP-CAMPUS DIARY</h2>
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
                value="admin"
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
          {/* <div className="captcha">

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
          /> */}
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

          {/* <input
            value={enteredCaptcha}
            onChange={(e) => setEnteredCaptcha(e.target.value)}
            type="text"
            placeholder="Enter CAPTCHA"
            required
          /> */}

          <div className="remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <input type="submit" value="Login" />
        </form>

        {/* 🔥 Forgot Password & Update Password Buttons */}
        <div className="extra-options">
          <button className="forgot-password">Forgot Password?</button>

          <button
            className="update-password"
            onClick={() => setShowUpdateModal(true)}
          >
            Update Password
          </button>
        </div>
      </div>

      {/* 🔥 Update Password Modal */}
      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h3>Update Password</h3>
              <form onSubmit={handleUpdatePassword}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter Email"
                  required
                />
                <input
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  type="password"
                  placeholder="Old Password"
                  required
                />
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  placeholder="New Password"
                  required
                />
                <button type="submit">Update</button>
                <button type="button" onClick={() => setShowUpdateModal(false)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
