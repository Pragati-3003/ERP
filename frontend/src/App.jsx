import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import StudentDb from "./scenes/dashboard/StudentDb";
import CustomSidebar from "./scenes/global/CustomSidebar";
import Topbar from "./scenes/global/Topbar";
import { ColorModeContext, useMode } from "../src/scenes/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./Components/Login/Login";
import Assignment from "./Components/Assignment/Assignment";
import Attendence from "./Components/Attendance_student/Attendance";
import TimeTable from "./Components/TimeTable/TimeTable";
import Attendance from "./Components/Attendance_student/Attendance";
import CourseEnrolled from "./Components/CourseEnrolled/CourseEnrolled";
import ResultChart from "./Components/Charts/ResultChart";
import Attendence1 from "./scenes/Attendence1/Attendence1";
function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const location = useLocation();

  // Hide Sidebar & Topbar only on the login page
  const isLoginPage = location.pathname === "/";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!isLoginPage && <CustomSidebar />} {/* Sidebar hidden on login */}
        <main className="content">
          {!isLoginPage && (
            <div className="topbar">
              <Topbar />
            </div>
          )}{" "}
          {/* Topbar hidden on login */}
          <Routes>
            {/* Login Page (Excluded from Sidebar, Topbar, and ThemeProvider) */}
            <Route
              path="/"
              element={<Login onLogin={() => setIsAuthenticated(true)} />}
            />

            {/* All other routes (Sidebar & Topbar visible) */}
            {/* {isAuthenticated ? ( */}
            <>
              {/* <Assignment /> */}
              {/* <TimeTable />   */}
              {/* <Attendance /> */}
              {/* <CourseEnrolled /> */}

              {/* <CourseAllocated/> */}
              {/* <Login/> */}
              {/* <FeeStructure /> */}
              {/* <AttendancePage/> */}
              <Route path="/dashboard" element={<StudentDb />} />
              <Route path="/assignment" element={<Assignment />} />
              <Route path="/timetable" element={<TimeTable />} />
              <Route path="/attendance" element={<Attendence1 />} />
              <Route path="/course-enrolled" element={<CourseEnrolled />} />
              <Route path="/resultChart" element={<ResultChart />} />
            </>
            {/* // ) : (
            //   <Route path="*" element={<Navigate to="/" />} /> // Redirect to login if unauthenticated
            // )} */}
          </Routes>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
