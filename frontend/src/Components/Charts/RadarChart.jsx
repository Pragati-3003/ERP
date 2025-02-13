import React, { useState } from "react";
import { ResponsiveRadar } from "@nivo/radar";
import { attendanceData, resultData } from "../../data/mockData";

const RadarChart = () => {
  const [selectedSemester, setSelectedSemester] = useState("semester2");
  const attendance = attendanceData[selectedSemester] || [];
  const results = resultData[selectedSemester] || [];

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
      <select
        onChange={(e) => setSelectedSemester(e.target.value)}
        value={selectedSemester}
        style={{ marginBottom: "10px", padding: "5px", fontSize: "16px" }}
      >
        <option value="semester1">Semester 1</option>
        <option value="semester2">Semester 2</option>
      </select>

      <h2>Attendance Chart</h2>
      <div style={{ height: "500px" }}>
        <ResponsiveRadar
          data={attendance}
          keys={[
            "Java",
            "DS",
            "OS",
            "SE",
            "TOC",
            "DS_Lab",
            "OS_Lab",
            "Comm_Skills",
          ]}
          indexBy="month"
          margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
          colors={{ scheme: "category10" }}
          borderWidth={2}
          gridLabelOffset={20} // Increased for better spacing
          maxValue="auto" // Ensures proper scaling
          angleStep={45} // Adjusts label positioning for clarity
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          blendMode="multiply"
          motionConfig="wobbly"
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              translateX: -50,
              itemWidth: 100,
              itemHeight: 20,
              symbolSize: 12,
              symbolShape: "circle",
            },
          ]}
        />
      </div>

      <h2>Results Chart</h2>
      <div style={{ height: "500px" }}>
        <ResponsiveRadar
          data={results}
          keys={[
            "Java",
            "DS",
            "OS",
            "SE",
            "TOC",
            "DS_Lab",
            "OS_Lab",
            "Comm_Skills",
          ]}
          indexBy="month"
          margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
          colors={{ scheme: "set2" }}
          borderWidth={2}
          gridLabelOffset={20} // Increased for better spacing
          maxValue="auto" // Ensures proper scaling
          angleStep={45} // Adjusts label positioning for clarity
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          blendMode="multiply"
          motionConfig="wobbly"
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              translateX: -50,
              itemWidth: 100,
              itemHeight: 20,
              symbolSize: 12,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default RadarChart;
