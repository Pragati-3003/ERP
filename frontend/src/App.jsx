import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";

import StudentDb from "./scenes/dashboard/StudentDb";
import AdminDb from "./scenes/dashboard/AdminDb";
import TeacherDb from "./scenes/dashboard/TeacherDb";
import StCustomSidebar from "./scenes/global/StCustomSidebar";
import AdminSidebar from "./scenes/global/AdminSidebar";
import TeacherSidebar from "./scenes/global/TeacherSidebar";

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
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import FeeStructure from "./Components/FeeStructure/FeeStructure";
import EndSemResult from "./Components/EndSemResult/EndSemResult";
import MidTermResult from "./Components/MidTermResult/MidTermResult";
import StudentProfile from "./Components/StudentProfile/StudentProfile";

// import Calender from "./scenes/calender/Calender"
import StudentManagement from "./Admin/StudentManagement/StudentManagement";
import TeacherManagement from "./Admin/TeacherManagement/TeacherManagement";
import AddTeacherCourse from "./Admin/AddTeacherCourse/AddTeacherCourse"
import CourseManagement from "./Admin/CourseManagement/CourseManagement"
import AdminProfile from "./Admin/AdminProfile/AdminProfile";
import AddSemesterResult from "./Admin/AddSemesterResult/AddSemesterResult";
import AttendanceReport from "./Components/Attendance_student/Attendance";
import UploadStudentTimetable from "./Admin/UploadStudentTimetable/UploadStudentTimetable";
import UploadTeacherTimetable from "./Admin/UploadTeacherTimetable/UploadTeacherTimetable";
function App() {
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role; // Extract the role from the decoded token
      // console.log("Decoded Role:", role); // Debugging log
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* {isAuthenticated && <TeacherSidebar />} */}
        {isAuthenticated && role === "Teacher" && <TeacherSidebar />}
        {isAuthenticated && role === "Admin" && <AdminSidebar />}
        {isAuthenticated && role === "Student" && <StCustomSidebar />}
        <main className="content">
          {isAuthenticated && (
            <div className="topbar">
              <Topbar />
            </div>
          )}
          <Routes>
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to={`/${role}-dashboard`} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              {/* <Route path="/admin-dashboard" element={<AdminDb />} />
              <Route path="/teacher-dashboard" element={<TeacherDb />} />
              <Route path="/student-dashboard" element={<StudentDb />} /> */}
              <Route
                path="/student-dashboard"
                element={
                  role === "Student" ? <StudentDb /> : <Navigate to="/login" />
                }
              />
              {/* Warden Dashboard */}
              <Route
                path="/teacher-dashboard"
                element={
                  role === "Teacher" ? <TeacherDb /> : <Navigate to="/login" />
                }
              />
              {/* Admin Dashboard*/}
              <Route
                path="/admin-dashboard"
                element={
                  role === "Admin" ? <AdminDb /> : <Navigate to="/login" />
                }
              />
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

              {/* <Route path="/calendar" element={<Calender />} /> */}

              {/* Admin routesss */}
             
            </Route>
            <Route path="/admin/studentmanagment" element={<StudentManagement />} />
            <Route path="/admin/teachermanagment" element={<TeacherManagement />} />
            <Route path="/admin/addteachercourse" element={<AddTeacherCourse />} />
            <Route path="/admin/coursemanagment" element={<CourseManagement />} />
            <Route path="/admin/profile" element={<AdminProfile/>} />
            <Route path="/admin/resultmgmt" element={<AddSemesterResult/>} />
            <Route path="/admin/addStudentTimetable" element={<UploadStudentTimetable/>} />
            <Route path="/admin/addTeacherTimetable" element={<UploadTeacherTimetable/>} />
           
            {/* Fallback route for invalid paths */}

              <Route path="/calendar" element={<Calendar />} />
            {/* </Route> */}

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
