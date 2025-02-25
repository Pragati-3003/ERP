import React, { useState } from "react";
import { Box, MenuItem, Select, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { dummyAttendanceData } from "../../data/mockData";
import Header from "../../Components/Header";

const Attendence1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State for selected month
  const [selectedMonth, setSelectedMonth] = useState("July"); // Default month

  // Extract unique months from data for dropdown
  const months = [...new Set(dummyAttendanceData.map((row) => row.month))];

  // Filter data based on selected month
  const filteredData = dummyAttendanceData.filter(
    (row) => row.month === selectedMonth
  );

  const columns = [
    { field: "subject_name", headerName: "Subject Name", flex: 1 },
    { field: "subject_code", headerName: "Subject Code", flex: 1 },
    {
      field: "total_classes",
      headerName: "Total Lectures",
      flex: 1,
      type: "number",
    },
    {
      field: "classes_attended",
      headerName: "Lectures Attended",
      flex: 1,
      type: "number",
    },
  ];

  return (
    <Box m="20px">
      <Header title="Attendance" subtitle="Track your attendance" />

      {/* Month Selection Dropdown */}
      <Box mb={2}>
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          displayEmpty
        >
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Attendance Data Table */}
      <Box
        m="20px 0 0 0"
        height="45vh"
        sx={{
          "&.MuiDataGrid-root": {
            border: "none",
          },
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          getRowId={(row) => row.subject_code} // Use subject_code as unique ID
          autoPageSize
        />
      </Box>
    </Box>
  );
};

export default Attendence1;
