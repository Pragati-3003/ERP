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
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { tokens } from "../theme";
import StatBox from "../../Components/StatBox";
import ProgressCircle from "../../Components/ProgressCircle";
const StudentDb = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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

            <Box>
              <Button
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
              </Button>
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
              <StatBox
                title="9.2 CGPA"
                subtitle="Overall Marks"
                progress="0.80"
                icon={
                  <AssignmentOutlinedIcon
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
            {/* Row 2 */}
            <Box
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
            </Box>
            <Box
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

export default StudentDb;
