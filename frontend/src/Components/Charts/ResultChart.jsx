import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { resultData } from "../../data/mockData";

const ResultChart = () => {
  const [selectedSemester, setSelectedSemester] = useState("semester2");

  const results = resultData[selectedSemester] || [];

  const colors = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
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
    <div
      style={{
        width: "100%",
        maxWidth: "450px",
        margin: "20px auto",
        padding: "5px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "white",
        marginTop: "100px",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "5px", fontSize: "14px" }}
      >
        Results Breakdown Chart
      </h2>
      <select
        onChange={(e) => setSelectedSemester(e.target.value)}
        value={selectedSemester}
        style={{ marginBottom: "5px", padding: "5px", fontSize: "12px" }}
      >
        <option value="semester1">Semester 1</option>
        <option value="semester2">Semester 2</option>
      </select>

      <div style={{ height: "220px", width: "100%" }}>
        <ResponsiveBar
          data={results}
          keys={keys}
          indexBy="subject"
          margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
          colors={colors}
          padding={0.15}
          axisLeft={{
            tickSize: 4,
            tickPadding: 4,
            tickRotation: 0,
            legend: "Marks Scored",
            legendPosition: "middle",
            legendOffset: -30,
            tickValues: 5,
          }}
          axisBottom={{
            tickSize: 4,
            tickPadding: 10,
            tickRotation: -15,
            legend: "Subjects",
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
          tooltip={({ id, value, data }) => {
            const totalMarks = Object.keys(data)
              .filter((key) => key !== "subject")
              .reduce((sum, key) => sum + (data[key] || 0), 0);
            return (
              <div
                style={{
                  padding: "5px",
                  background: "white",
                  border: "1px solid black",
                }}
              >
                <strong>{id}</strong>: {value}
                <br />
                <strong>Total Marks</strong>: {totalMarks}
              </div>
            );
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {keys.map((key, index) => (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "5px 10px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: colors[index],
                marginRight: "5px",
              }}
            ></div>
            <span style={{ fontSize: "12px" }}>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultChart;
