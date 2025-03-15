import { useState, useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
  Toolbar,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { ColorModeContext, tokens } from "../theme";
import userImage from "../../assets/user1.jpg"; // Importing profile image

const CustomSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const menuItems = [
    { title: "Dashboard", to: "/dashboard", icon: <HomeOutlinedIcon /> },
    { title: "Results", to: "/result", icon: <SaveAsOutlinedIcon /> },
    { title: "Events", to: "/events", icon: <EventOutlinedIcon /> },
    {
      title: "Attendance",
      to: "/attendance",
      icon: <AssessmentOutlinedIcon />,
    },
    {
      title: "Assignment",
      to: "/assignment",
      icon: <AssignmentOutlinedIcon />,
    },

    {
      title: "CourseEnrolled",
      to: "/course-enrolled",
      icon: <AssignmentOutlinedIcon />,
    },
    {
      title: "FeesStructure",
      to: "/feesStructure",
      icon: <AssignmentOutlinedIcon />,
    },
    {
      title: "TimeTable",
      to: "/timetable",
      icon: <AssignmentOutlinedIcon />,
    },
    {
      title: "SemeterResult",
      to: "/semresult",
      icon: <AssignmentOutlinedIcon />,
    },
    {
      title: "MidTermResult",
      to: "/midTermResult",
      icon: <AssignmentOutlinedIcon />,
    },
    { title: "Profile", to: "/form", icon: <PersonOutlinedIcon /> },
    { title: "Calendar", to: "/calendar", icon: <CalendarTodayOutlinedIcon /> },
    { title: "FAQ", to: "/faq", icon: <HelpOutlineOutlinedIcon /> },
    {
      title: "Attendance Chart",
      to: "/attendenceChart",
      icon: <AssessmentOutlinedIcon />,
    },
    {
      title: "Result Chart",
      to: "/resultChart",
      icon: <BarChartOutlinedIcon />,
    },
  ];

  return (
    <Box>
      {/* Menu Button */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "absolute",
          top: 15,
          left: 15,
          color: theme.palette.mode === "light" ? "black" : "white",
        }}
      >
        <MenuOutlinedIcon />
      </IconButton>

      {/* Drawer Sidebar */}

      <Drawer
        variant="permanent"
        open={isOpen}
        sx={{
          width: isOpen ? 250 : 80,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isOpen ? 250 : 80,
            transition: "width 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "width",
            background:
              theme.palette.mode === "light" ? "#fff" : colors.primary[400],
            color: theme.palette.mode === "light" ? "black" : "white",
            overflowX: "hidden",
          },
        }}
      >
        {/* Sidebar Header */}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: isOpen ? "space-between" : "center",
            padding: "10px",
          }}
        >
          {isOpen && (
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Campus Diary
            </Typography>
          )}
          <IconButton onClick={toggleDrawer} sx={{ color: "inherit" }}>
            <MenuOutlinedIcon />
          </IconButton>
        </Toolbar>
        <Divider />

        {/* Profile Section */}
        {isOpen && (
          <Box mb="25px" textAlign="center" sx={{ my: 2 }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={userImage}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
              Samira
            </Typography>
            <Typography variant="body2" sx={{ color: colors.greenAccent[500] }}>
              Student
            </Typography>
          </Box>
        )}
        <Divider />

        {/* Menu Items */}
        <List>
          {menuItems.map(({ title, to, icon }) => (
            <ListItem key={title} disablePadding>
              <ListItemButton component={Link} to={to}>
                <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
                {isOpen && <ListItemText primary={title} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default CustomSidebar;
