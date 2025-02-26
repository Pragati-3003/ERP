import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../scenes/theme";

const Assignment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedFiles, setSelectedFiles] = useState({}); // Track selected files
  const [assignments, setAssignments] = useState({
    OOPS: [
      {
        id: 1,
        subject: "OOPS Assignment 1",
        createdDate: "01-Dec-2024",
        dueDateTime: "10/12/2024 20:00:00",
        cutoffDateTime: "10-Dec-2024 - 08:00:00 PM",
        status: "Pending",
        marks: null,
      },
    ],
    C: [],
    DS: [],
    DBMS: [],
  });

  const subjects = ["OOPS", "C", "DS", "DBMS"];

  // Handle file selection
  const handleFileUpload = (event, rowId) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFiles((prev) => ({ ...prev, [rowId]: file }));
    }
  };

  // Handle submission
  const handleSubmitAnswer = (id) => {
    if (!selectedFiles[id]) return;

    setAssignments((prev) => {
      const updatedAssignments = {
        ...prev,
        [selectedSubject]: prev[selectedSubject].map((assignment) =>
          assignment.id === id
            ? { ...assignment, status: "Submitted" }
            : assignment
        ),
      };
      return updatedAssignments;
    });

    setSelectedFiles((prev) => ({ ...prev, [id]: null })); // Clear selected file
  };

  const columns = [
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "dueDateTime",
      headerName: "Due Date Time",
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "cutoffDateTime",
      headerName: "Cut-Off Date Time",
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Typography
          color={params.value === "Pending" ? "green" : "red"}
          padding={"15px 0 0 0"}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Upload Assignment",
      flex: 1.5,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          {/* Hidden File Input */}
          <input
            type="file"
            accept=".pdf"
            id={`file-upload-${params.row.id}`}
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e, params.row.id)}
          />

          {/* Custom File Upload Button */}
          <label htmlFor={`file-upload-${params.row.id}`}>
            <Button
              variant="contained"
              component="span"
              sx={{
                padding: "4px 8px",
                fontSize: "12px",
                minWidth: "80px",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
                textTransform: "capitalize",
              }}
            >
              Choose File
            </Button>
          </label>

          {/* Show file name and Submit button if a file is selected */}
          {selectedFiles[params.row.id] && (
            <>
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {selectedFiles[params.row.id].name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  padding: "4px 10px",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
                onClick={() => handleSubmitAnswer(params.row.id)}
              >
                Submit
              </Button>
            </>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Session: July-Dec 2024-2025
      </Typography>

      {/* Subject Selection */}
      <FormControl fullWidth variant="outlined" sx={{ mb: 3, width: "85vw" }}>
        <InputLabel>Select Subject</InputLabel>
        <Select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          label="Select Subject"
          sx={{ border: "1px solid rgba(0, 0, 0, 0.23)" }}
        >
          <MenuItem value="" disabled>
            -- Select Subject --
          </MenuItem>
          {subjects.map((subject, index) => (
            <MenuItem key={index} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Data Grid */}
      <Box
        height="45vh"
        width="85vw"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnSeparator": { display: "none" },
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
          rows={
            selectedSubject && assignments[selectedSubject].length > 0
              ? assignments[selectedSubject]
              : []
          }
          columns={columns}
          disableSelectionOnClick
          hideFooterPagination
          hideFooter
          components={{
            NoRowsOverlay: () => (
              <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
                No assignment yet
              </Typography>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Assignment;
