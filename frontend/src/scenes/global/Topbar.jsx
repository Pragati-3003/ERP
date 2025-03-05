import React, { useContext } from "react";
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
  const colorMode = useContext(ColorModeContext); // Fixed case typo

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      position={"relative"}
    >
      {/* Search Bar */}
      <Typography variant="h5" sx={{ ml: 0, fontWeight: "bold" }}>
        Campus Diary
      </Typography>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        justifyContent={"space-around"}
        position={"absolute"}
        left={"180px"}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
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
