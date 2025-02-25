import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Assignment = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const subjects = ["OOPS", "C", "DS", "DBMS"];

  const assignments = {
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
  };

  const handleFileUpload = (event) => {
    setUploadedPdf(event.target.files[0]);
  };

  const handleSubmitAnswer = (id) => {
    const updatedAssignments = assignments[selectedSubject].map((assignment) =>
      assignment.id === id ? { ...assignment, status: "Submitted" } : assignment
    );
    assignments[selectedSubject] = updatedAssignments;
    setUploadedPdf(null);
  };

  const columns = [
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "createdDate", headerName: "Created Date", flex: 1 },
    { field: "dueDateTime", headerName: "Due Date Time", flex: 1 },
    { field: "cutoffDateTime", headerName: "Cut-Off Date Time", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
      field: "marks",
      headerName: "Score",
      flex: 1,
      renderCell: (params) => (
        <Typography>{params.value !== null ? params.value : "-"}</Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Upload Assignment",
      flex: 1.5,
      renderCell: (params) =>
        assignments[selectedSubject].length > 0 ? (
          <Box>
            <input type="file" accept=".pdf" onChange={handleFileUpload} />
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
              onClick={() => handleSubmitAnswer(params.row.id)}
            >
              Submit
            </Button>
          </Box>
        ) : null,
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Session: July-Dec 2024-2025
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
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
      <Box sx={{ height: "45vh", width: "100%" }}>
        <DataGrid
          rows={
            selectedSubject && assignments[selectedSubject].length > 0
              ? assignments[selectedSubject]
              : []
          }
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
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
