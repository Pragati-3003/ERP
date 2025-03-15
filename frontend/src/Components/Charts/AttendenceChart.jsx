import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { attendanceData } from "../../data/mockData";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../scenes/theme";

const AttendanceChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedSemester, setSelectedSemester] = useState("semester1");

  const data = attendanceData[selectedSemester] || [];
  const subjects = Object.keys(data[0] || {}).filter((key) => key !== "month");

  const subjectColors = [
    "#E63946",
    "#F4A261",
    "#E9C46A",
    "#2A9D8F",
    "#264653",
    "#A8DADC",
    "#457B9D",
    "#1D3557",
  ];

  const normalizedData = data.map((entry) => ({
    month: entry.month,
    ...Object.fromEntries(subjects.map((subject) => [subject, entry[subject]])),
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="80%"
        className="chart"
      >
        <select
          onChange={(e) => setSelectedSemester(e.target.value)}
          value={selectedSemester}
          style={{
            marginBottom: "10px",
            padding: "5px",
            fontSize: "12px",
            color: "black",
          }}
        >
          <option value="semester1">Semester 1</option>
          <option value="semester2">Semester 2</option>
        </select>

        <div style={{ height: "250px", width: "100%" }}>
          <ResponsiveBar
            data={normalizedData}
            keys={subjects}
            indexBy="month"
            margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
            padding={0.2}
            colors={subjectColors}
            theme={{
              axis: {
                domain: {
                  line: { stroke: colors.grey[100] },
                },
                legend: {
                  text: { fill: colors.grey[100] },
                },
                ticks: {
                  line: { stroke: colors.grey[100], strokeWidth: 1 },
                  text: { fill: colors.grey[100] },
                },
              },
              legends: {
                text: { fill: colors.grey[100] },
              },
            }}
            axisLeft={{
              tickSize: 4,
              tickPadding: 4,
              tickRotation: 0,
              legend: isDashboard ? undefined : "Attendance (%)",
              legendPosition: "middle",
              legendOffset: -30,
              tickValues: 5,
            }}
            axisBottom={{
              tickSize: 4,
              tickPadding: 10,
              tickRotation: -10,
              legend: isDashboard ? undefined : "Months",
              legendPosition: "middle",
              legendOffset: 50,
              tickValues: normalizedData.length > 5 ? 5 : normalizedData.length,
            }}
            maxValue={100}
            layout="vertical"
            enableLabel={false}
            labelSkipWidth={6}
            labelSkipHeight={6}
            labelTextColor="#ffffff"
            groupMode="grouped"
            tooltip={({ id, value, indexValue }) => (
              <div
                style={{
                  padding: "8px",
                  background: "white",
                  color: "black",
                  border: "1px solid black",
                }}
              >
                <strong>{id}:</strong> {value.toFixed(2)}%<br />
                <strong>Month:</strong> {indexValue}
              </div>
            )}
          />
        </div>
      </Box>

      {/* Legends Sidebar */}
      <Box display="flex" flexDirection="column" alignItems="flex-start" ml={2}>
        {subjects.map((subject, index) => (
          <Box key={subject} display="flex" alignItems="center" mb={1}>
            <Box
              width={12}
              height={12}
              bgcolor={subjectColors[index % subjectColors.length]}
              mr={1}
            />
            <span style={{ fontSize: "12px", color: colors.grey[100] }}>
              {subject}
            </span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AttendanceChart;
