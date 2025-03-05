import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { attendanceData } from "../../data/mockData";
import { useTheme } from "@mui/material";
import { tokens } from "../../scenes/theme";
const AttendanceChart = ({ isDashboard = false }) => {
  const [selectedSemester, setSelectedSemester] = useState("semester1");
  const data = attendanceData[selectedSemester] || [];
  const subjects = Object.keys(data[0] || {}).filter((key) => key !== "month");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Define unique colors for each subject
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

  // Normalize data
  const normalizedData = data.map((entry) => {
    return {
      month: entry.month,
      ...Object.fromEntries(
        subjects.map((subject) => [subject, entry[subject]])
      ),
    };
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "40px auto", // Center horizontally
        padding: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center content vertically
        justifyContent: "center", // Center content vertically
      }}
    >
      {/* <h2
        style={{ textAlign: "center", marginBottom: "5px", fontSize: "14px" }}
      >
        Attendance Report
      </h2> */}

      <select
        onChange={(e) => setSelectedSemester(e.target.value)}
        value={selectedSemester}
        style={{
          marginBottom: "5px",
          padding: "5px",
          fontSize: "12px",
          color: "black",
        }}
      >
        <option value="semester1">Semester 1</option>
        <option value="semester2">Semester 2</option>
      </select>

      <div
        style={{
          height: "250px",
          width: "100%",
          position: "relative",
          color: "black",
        }}
      >
        <ResponsiveBar
          data={normalizedData}
          keys={subjects}
          indexBy="month"
          margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
          padding={0.2} // Adjusted padding for better visual appeal
          colors={subjectColors}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
          }}
          axisLeft={{
            tickSize: 4,
            tickPadding: -1,
            tickRotation: 0,
            legend: isDashboard ? undefined : "Attendance (%)",
            legendPosition: "middle",
            legendOffset: -42,
            tickValues: 5,
            format: (value) => `${value.toFixed(2)}`,
            style: { fontSize: "10px" },
          }}
          axisBottom={{
            tickSize: 4,
            tickPadding: 4,
            tickRotation: -20,
            legend: isDashboard ? undefined : "Months",
            legendPosition: "middle",
            legendOffset: 45,
            tickValues: normalizedData.length > 5 ? 5 : normalizedData.length,
          }}
          maxValue={100} // Adjusted max value
          layout="vertical"
          enableLabel={false}
          labelSkipWidth={6}
          labelSkipHeight={6}
          labelTextColor="#ffffff"
          groupMode="grouped" // Changed from stacked to grouped bars
          tooltip={({ id, value, indexValue }) => (
            <div
              style={{
                padding: "5px",
                background: "black",
                color: "white",
                borderRadius: "4px",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              <strong>{id}</strong> <br />
              Month: {indexValue} <br />
              Attendance: {value.toFixed(2)}%
            </div>
          )}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        {subjects.map((subject, index) => (
          <div
            key={subject}
            style={{ display: "flex", alignItems: "center", margin: "5px" }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: subjectColors[index % subjectColors.length],
                marginRight: "5px",
              }}
            ></div>
            <span style={{ fontSize: "12px" }}>{subject}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceChart;
