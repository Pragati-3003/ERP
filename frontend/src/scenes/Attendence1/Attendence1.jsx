import React, { useState } from "react";
import { Box, MenuItem, Select, useTheme, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { dummyAttendanceData } from "../../data/mockData";
import Header from "../../Components/Header";

const Attendence1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State for selected month
  const [selectedMonth, setSelectedMonth] = useState("July");

  // Extract unique months from data for dropdown
  const months = [...new Set(dummyAttendanceData.map((row) => row.month))];

  // Filter data based on selected month and compute required fields
  const filteredData = dummyAttendanceData
    .filter((row) => row.month === selectedMonth)
    .map((row) => {
      const attendancePercentage = (
        (row.classes_attended / row.total_classes) *
        100
      ).toFixed(2);
      const requiredClasses =
        attendancePercentage >= 70
          ? "NA"
          : Math.ceil(
              (0.7 * row.total_classes - row.classes_attended) / (1 - 0.7)
            );

      return {
        ...row,
        attendance_percentage: `${attendancePercentage}%`,
        required_classes: requiredClasses,
      };
    });

  const columns = [
    {
      field: "subject_name",
      headerName: "Subject Name",
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "subject_code",
      headerName: "Subject Code",
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "total_classes",
      headerName: "Total Lectures",
      flex: 1,
      type: "number",
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "classes_attended",
      headerName: "Lectures Attended",
      flex: 1,
      type: "number",
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "attendance_percentage",
      headerName: "Attendance %",
      flex: 1,
      type: "number",
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "required_classes",
      headerName: "Required Classes for 70%",
      flex: 1,
      type: "number",
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Attendance" subtitle="Track your attendance" />

      {/* Month Selection Dropdown */}
      <Box m={2}>
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
        height="55vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            editable: false,
            disableColumnMenu: true,
            sortable: false,
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          getRowId={(row) => `${row.subject_code}-${row.month}`}
          autoPageSize
          disableColumnMenu // Removes the three-dot menu
          disableSelectionOnClick // Prevents accidental selection
          hideFooterPagination // Removes "Rows per page" selector
          hideFooter // Removes entire footer
          components={{
            NoRowsOverlay: () => (
              <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
                No attendance data available
              </Typography>
            ),
          }}
        />
      </Box>

      {/* Attendance Warning */}
      <Box mt={2} textAlign="center">
        <Typography variant="body1" color={colors.greenAccent[400]}>
          Ensure your attendance percentage meets the minimum requirement of 70%
          for each subject.
        </Typography>
      </Box>
    </Box>
  );
};

export default Attendence1;
