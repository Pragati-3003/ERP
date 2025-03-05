import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { resultData } from "../../data/mockData";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../scenes/theme";

const ResultChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedSemester, setSelectedSemester] = useState("semester2");

  const results = resultData[selectedSemester] || [];

  const colours = [
    "#e8c1a0",
    "#f47560",
    "#f1e15b",
    "#e8a838",
    "#61cdbb",
    "#97e3d5",
    "#e8c1a0",
  ];

  const keys = [
    "EndSem",
    "HA1",
    "HA2",
    "Periodical1",
    "Periodical2",
    "Internal",
    "External",
  ];

  return (
    <Box
      overflow="hidden"
      display="flex"
      flexDirection="row" // Ensures legend appears on the side
      alignItems="center"
      justifyContent="center"
      width="100%"
      maxWidth="600px"
      margin="20px auto"
      padding="5px"
    >
      {/* Chart Container */}
      <div style={{ height: "250px", width: "75%" }}>
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

        <ResponsiveBar
          data={results}
          theme={{
            axis: {
              domain: { line: { stroke: colors.grey[100] } },
              legend: { text: { fill: colors.grey[100] } },
              ticks: {
                line: { stroke: colors.grey[100], strokeWidth: 1 },
                text: { fill: colors.grey[100] },
              },
            },
            legends: { text: { fill: colors.grey[100] } },
          }}
          keys={keys}
          indexBy="subject"
          margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
          padding={0.2}
          axisLeft={{
            tickSize: 4,
            tickPadding: 4,
            tickRotation: 0,
            legend: isDashboard ? undefined : "Marks Scored",
            legendPosition: "middle",
            legendOffset: -30,
            tickValues: 5,
          }}
          axisBottom={{
            tickSize: 4,
            tickPadding: 5,
            tickRotation: -15,
            legend: isDashboard ? undefined : "Subjects",
            legendPosition: "middle",
            legendOffset: 50,
            tickValues: results.length > 5 ? 5 : results.length,
          }}
          maxValue={100}
          layout="vertical"
          enableLabel={false}
          labelSkipWidth={6}
          labelSkipHeight={6}
          labelTextColor="#ffffff"
          tooltip={({ id, value, data }) => (
            <div
              style={{
                padding: "8px",
                background: "white",
                color: "black",
                border: "1px solid black",
              }}
            >
              <strong>{id}:</strong> {value} marks
              <br />
              <strong>Total:</strong>{" "}
              {Object.values(data).reduce((sum, val) => sum + (val || 0), 0)}
            </div>
          )}
        />
      </div>

      {/* Legend Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: "20px", // Creates space between the chart and legend
        }}
      >
        {keys.map((key, index) => (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "5px 0",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: colours[index],
                marginRight: "5px",
              }}
            ></div>
            <span style={{ fontSize: "12px" }}>{key}</span>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ResultChart;
