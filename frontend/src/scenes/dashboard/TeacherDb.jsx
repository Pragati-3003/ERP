import React from "react";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../global/Topbar";
// import { dummyAttendanceData } from "../../data/mockData";
import CustomSidebar from "../global/StCustomSidebar";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import "./dashboard.css"; // Import the Student Dashboard CSS file
import ResultChart from "../../Components/Charts/ResultChart";
import AttendanceChart from "../../Components/Charts/AttendenceChart";
import Header from "../../Components/Header";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { tokens } from "../theme";
import StatBox from "../../Components/StatBox";
import Calendar from "../calender/Calendar";
import ProgressCircle from "../../Components/ProgressCircle";
const TeacherDb = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [theme, colorMode] = useMode();
  return (
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    <div className="admin-dashboard">
      {/* <CustomSidebar /> */}
      <main className="content">
        {/* <div className="topbar">
              <Topbar />
            </div> */}

        <Box sx={{ paddingTop: "75px", overflowY: "auto" }}>
          <Box
            display="flex"
            justifyContent={"space-between "}
            alignItems="center"
          >
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

            <Box>
              {/* <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                Download Result
              </Button> */}
            </Box>
          </Box>
          {/*Grid ans charts*/}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12,1fr)"
            gridAutoRows="140px"
            gap="20px"
            margin="40px 0"
          >
            {/* Row1 */}
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="60%"
                subtitle="Overall Attendance"
                progress="0.60"
                icon={
                  <AssessmentOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Link
                to="/teacher/upload-assignment"
                className="block transform transition-all duration-300 hover:scale-105"
              >
                <StatBox
                  title="Assignments Uploaded"
                  subtitle="1 shared out of 2"
                  progress="0.50"
                  icon={
                    <AssignmentOutlinedIcon
                      sx={{
                        color: colors.greenAccent[600],
                        fontSize: "26px",
                      }}
                    />
                  }
                />
              </Link>
            </Box>

            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="Lectures Remaining for DSA"
                subtitle="8 out of 30 "
                progress="0.27"
                icon={
                  <ClassOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Link
                to="/teacher/timetable"
                className="block transform transition-all duration-300 hover:scale-105"
              >
                <StatBox
                  title="Total lectures today"
                  subtitle="2 left out of 5"
                  progress="0.65"
                  icon={
                    <ClassOutlinedIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Link>
            </Box>

            {/* Row 2 */}
            {/* <Box
              gridColumn="span 6"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="15px"
                p="0 30px "
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                    marginBottom="30px"
                  >
                    Marks evaluated
                  </Typography>
                </Box>
              </Box>
              <Box height="250px" ml="-20px">
                <ResultChart isDashboard={true} />
              </Box>
            </Box> */}
            <Box
              gridColumn="span 11"
              gridRow="span 3"
              p="0 50px "
              ml="50px"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="15px"
                p="0 50px "
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                      marginBottom="30px"
                    >
                      Attendence evaluated
                    </Typography>
                    {/* <Typography
                    variant="h3"
                    fontWeight="500"
                    color={colors.greenAccent[500]}
                  >
                    60%
                  </Typography> */}
                  </Box>
                }
              </Box>
              <Box height="250px" ml="-20px">
                <AttendanceChart isDashboard={true} />
              </Box>
            </Box>
            {/* Row 3 */}
            {/* <Box
              gridColumn="span 7"
              gridRow="span 5"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box height="250px" ml="-10px">
                  <Calendar />
                </Box>
              </Box>
            </Box> */}
            {/* <Box
              gridColumn="span 4"
              gridRow="span 2"
              background={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={color.grey[100]}
                  variant="h5"
                  fontWeight="600"
                ></Typography>
              </Box>
            </Box> */}
          </Box>
        </Box>
        {/* <ResultChart /> */}
        {/* <AttendanceChart /> */}
      </main>
    </div>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
  );
};

export default TeacherDb;
