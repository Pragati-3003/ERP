import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  Typography,
} from "@mui/material";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={scrolling ? 1 : 2} // Maintain spacing before and after scrolling
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bgcolor={scrolling ? colors.primary[400] : "transparent"}
      boxShadow={scrolling ? "0px 4px 10px rgba(0,0,0,0.1)" : "none"}
      transition="all 0.3s ease-in-out"
      height="65px"
    >
      {/* Logo / Title */}
      <Typography variant="h5" sx={{ ml: 12, fontWeight: "bold" }}>
        Campus Diary
      </Typography>

      {/* Search Box */}
      <Box
        display="flex"
        alignItems="center"
        backgroundColor={colors.primary[400]}
        borderRadius="8px" // Smooth rounded corners
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)" // Shadow effect
        px={2}
        py={0.5}
        width="280px"
        position="absolute"
        left="180px"
        transition="all 0.3s ease-in-out"
        marginLeft="80px"
      >
        <InputBase sx={{ flex: 1 }} placeholder="Search" />
        <IconButton type="button">
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
