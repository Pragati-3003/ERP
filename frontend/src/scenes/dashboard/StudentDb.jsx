import React from "react";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../../scenes/global/Topbar";
import CustomSidebar from "../global/CustomSidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import "./dashboard.css"; // Import the Student Dashboard CSS file
import ResultChart from "../../Components/Charts/ResultChart";
import AttendanceChart from "../../Components/Charts/AttendenceChart";
import Header from "../../Components/Header";
import { Box } from "@mui/material";
const StudentDb = () => {
  // const [theme, colorMode] = useMode();
  return (
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    <div className="student-dashboard">
      {/* <CustomSidebar /> */}
      <main className="content">
        {/* <div className="topbar">
              <Topbar />
            </div> */}
        <Box m="auto" pt="50px">
          <Box
            display="flex"
            justifyContent={"space-between "}
            alignItems="center"
          >
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          </Box>
        </Box>
        <ResultChart />
        <AttendanceChart />
      </main>
    </div>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
  );
};

export default StudentDb;
