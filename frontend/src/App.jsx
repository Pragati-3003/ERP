// import { useState } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import "./App.css";
// import "./index.css";
// import StudentDb from "./scenes/dashboard/StudentDb";
// import CustomSidebar from "./scenes/global/CustomSidebar";
// import Topbar from "./scenes/global/Topbar";
// import { ColorModeContext, useMode } from "../src/scenes/theme";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import Login from "./Components/Login/Login";
// import Assignment from "./Components/Assignment/Assignment";
// import Attendence from "./Components/Attendance_student/Attendance";
// import TimeTable from "./Components/TimeTable/TimeTable";
// import Attendance from "./Components/Attendance_student/Attendance";
// import CourseEnrolled from "./Components/CourseEnrolled/CourseEnrolled";
// import ResultChart from "./Components/Charts/ResultChart";
// import Attendence1 from "./scenes/Attendence1/Attendence1";
// import { useSelector } from "react-redux";
// import ProtectedRoute from "./Components/ProtectedRoute";

// function App() {
//   const [theme, colorMode] = useMode();
//   const location = useLocation();

//   // Check if the user is authenticated
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   console.log(isAuthenticated);

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {isAuthenticated && <CustomSidebar />} {/* Sidebar hidden if not authenticated */}
//         <main className="content">
//           {isAuthenticated && (
//             <div className="topbar">
//               <Topbar />
//             </div>
//           )}{" "}
//           {/* Topbar hidden if not authenticated */}
//           <Routes>
//             {/* Home Page: Redirect to Dashboard if authenticated, otherwise to Login */}
//             <Route
//               path="/"
//               element={
//                 isAuthenticated ? (
//                   <Navigate to="/dashboard" />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />

//             {/* Login Page */}
//             <Route path="/login" element={<Login />} />

//             {/* Protected Routes */}
//             <Route element={<ProtectedRoute />}>
//               <Route path="/dashboard" element={<StudentDb />} />
//               <Route path="/assignment" element={<Assignment />} />
//               <Route path="/timetable" element={<TimeTable />} />
//               <Route path="/attendance" element={<Attendence1 />} />
//               <Route path="/course-enrolled" element={<CourseEnrolled />} />
//               <Route path="/resultChart" element={<ResultChart />} />
//             </Route>

//             {/* Fallback route for invalid paths */}
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </main>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

// export default App;
