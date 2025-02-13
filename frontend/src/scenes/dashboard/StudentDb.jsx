import React from "react";

import "./dashboard.css"; // Import the Student Dashboard CSS file
import ResultChart from "../../Components/Charts/ResultChart";
import AttendanceChart from "../../Components/Charts/AttendenceChart";

const StudentDb = () => {
  return (
    <div className="student-dashboard">
      <ResultChart />
      <AttendanceChart />
    </div>
  );
};

export default StudentDb;
