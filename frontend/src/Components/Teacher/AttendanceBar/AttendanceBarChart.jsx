import React, { useState } from "react";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../../scenes/theme";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AttendanceBarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedSubject, setSelectedSubject] = useState("Data Structures");

  const subjectData = {
    "Data Structures": {
      January: { attended: 5, total: 6 },
      February: { attended: 6, total: 7 },
      March: { attended: 4, total: 5 },
      April: { attended: 0, total: 0 },
      May: { attended: 0, total: 0 },
    },
  };

  const monthlyAttendance = subjectData[selectedSubject];

  const chartData = Object.keys(monthlyAttendance).map((month) => ({
    month,
    attended: monthlyAttendance[month].attended || 0,
    total: monthlyAttendance[month].total || 0,
  }));

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      width="100%"
      maxWidth="600px"
      margin="20px auto"
      padding="10px"
    >
      <h1 className="text-3xl font-bold mb-4">Teacher's Monthly Attendance</h1>

      <label htmlFor="subject" className="mr-2 text-lg">
        Select Subject:
      </label>
      <select
        id="subject"
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        className="p-2 rounded bg-[#1f2937] text-white border border-gray-600"
      >
        <option value="Data Structures">Data Structures</option>
      </select>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="attended" fill="#10b981" name="Attended" />
          <Bar dataKey="total" fill="#3b82f6" name="Total Classes" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AttendanceBarChart;
