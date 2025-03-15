import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import StudentDb from "./scenes/dashboard/StudentDb";
// import AdminDb from "./scenes/dashboard/AdminDb";
// import TeacherDb from "./scenes/dashboard/TeacherDb";
import StCustomSidebar from "./scenes/global/StCustomSidebar";
import EventPage from "./Components/EventPage/EventPage";
import Topbar from "./scenes/global/Topbar";
import { ColorModeContext, useMode } from "../src/scenes/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./Components/Login/Login";
import Assignment from "./Components/Assignment/Assignment";
import TimeTable from "./Components/TimeTable/TimeTable";
import Attendance from "./Components/Attendance_student/Attendance";
import AttendenceBar from "./scenes/bar/AttendenceBar";
import ResultBar from "./scenes/bar/Resultbar";
import CourseEnrolled from "./Components/courseEnrolled/CourseEnrolled";
import ResultChart from "./Components/Charts/ResultChart";
import Attendence1 from "./scenes/Attendence1/Attendence1";
import Calendar from "./scenes/calender/Calendar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";

import FeeStructure from "./Components/FeeStructure/FeeStructure";
import EndSemResult from "./Components/EndSemResult/EndSemResult";
import MidTermResult from "./Components/MidTermResult/MidTermResult";
import StudentProfile from "./Components/StudentProfile/StudentProfile";

import AttendanceReport from "./Components/Attendance_student/Attendance";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  // Check if the user is authenticated
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  const token = localStorage.getItem("token");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isAuthenticated && <StCustomSidebar />}{" "}
        {/* Sidebar hidden if not authenticated */}
        <main className="content">
          {isAuthenticated && (
            <div className="topbar">
              <Topbar />
            </div>
          )}{" "}
          {/* Topbar hidden if not authenticated */}
          <Routes>
            {/* Home Page: Redirect to Dashboard if authenticated, otherwise to Login */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/student-dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Login Page */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}

            {/* <Route element={<ProtectedRoute />}> */}
            {/* <Route path="/dashboard" element={<StudentDb />} />
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/timetable" element={<TimeTable />} />
            <Route path="/attendance" element={<Attendence1 />} />

            <Route path="/calendar" element={<Calendar />} />
            <Route path="/course-enrolled" element={<CourseEnrolled />} />
            <Route path="/resultChart" element={<ResultBar />} />
            <Route path="/attendenceChart" element={<AttendenceBar />} /> */}

            {/* </Route> */}

            {/* <Route element={<ProtectedRoute />}>
              {/* <Route path="/dashboard" element={<StudentDb />} /> */}
            {/* <Route path="/dashboard" element={<AdminDb />} /> */}
            {/* <Route path="/assignment" element={<Assignment />} />
              <Route path="/timetable" element={<TimeTable />} />
              <Route path="/attendance" element={<AttendanceReport />} />
              <Route path="/course-enrolled" element={<CourseEnrolled />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/feesStructure" element={<FeeStructure />} />
              <Route path="/semresult" element={<EndSemResult />} />
              <Route path="/midTermResult" element={<MidTermResult />} />
              <Route path="/resultChart" element={<ResultBar />} />
              <Route path="/attendenceChart" element={<AttendenceBar />} />
            </Route> */}

            <Route element={<ProtectedRoute />}>
              <Route path="/admin-dashboard" element={<AdminDb />} />
              <Route path="/teacher-dashboard" element={<TeacherDb />} />
              <Route path="/student-dashboard" element={<StudentDb />} />
              <Route path="/assignment" element={<Assignment />} />
              <Route path="/timetable" element={<TimeTable />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="/course-enrolled" element={<CourseEnrolled />} />
              <Route path="/resultChart" element={<ResultBar />} />
              <Route path="/attendenceChart" element={<AttendenceBar />} />
              <Route path="/feesStructure" element={<FeeStructure />} />
              <Route path="/semresult" element={<EndSemResult />} />
              <Route path="/midTermResult" element={<MidTermResult />} />
              <Route path="/profile" element={<StudentProfile />} />
              <Route path="/calendar" element={<Calendar />} />
            </Route>

            {/* Fallback route for invalid paths */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
