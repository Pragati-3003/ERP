import React, { useState } from "react";

const AttendanceReport = () => {
  // Dummy student data
  const student = {
    name: "John Doe",
    course: "B.Tech Computer Science",
    semester: 3,
  };

  // Dummy attendance data
  const dummyAttendanceData = [
    {
      subject_name: "Mathematics",
      subject_code: "MATH101",
      total_classes: 20,
      classes_attended: 1,
      month: "July",
    },
    {
      subject_name: "Physics",
      subject_code: "PHYS101",
      total_classes: 15,
      classes_attended: 12,
      month: "July",
    },
    {
      subject_name: "Chemistry",
      subject_code: "CHEM101",
      total_classes: 20,
      classes_attended: 15,
      month: "July",
    },
    {
      subject_name: "Chemistry",
      subject_code: "CHEM101",
      total_classes: 10,
      classes_attended: 8,
      month: "August",
    },
    {
      subject_name: "Mathematics",
      subject_code: "MATH101",
      total_classes: 10,
      classes_attended: 7,
      month: "August",
    },
    {
      subject_name: "Physics",
      subject_code: "PHYS101",
      total_classes: 10,
      classes_attended: 6,
      month: "August",
    },
  ];

  // State for selected month
  const [selectedMonth, setSelectedMonth] = useState("Overall");

  // Aggregation logic for "Overall"
  const getAggregatedAttendance = () => {
    return dummyAttendanceData.reduce((acc, curr) => {
      const existingSubject = acc.find(
        (data) => data.subject_code === curr.subject_code
      );
      if (existingSubject) {
        existingSubject.total_classes += curr.total_classes;
        existingSubject.classes_attended += curr.classes_attended;
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, []);
  };

  // Filtered or aggregated attendance data
  const filteredAttendanceData =
    selectedMonth === "Overall"
      ? getAggregatedAttendance()
      : dummyAttendanceData.filter((data) => data.month === selectedMonth);

  // Function to get months based on semester
  const getMonthsForSemester = (semester) => {
    const monthsOdd = [
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthsEven = ["January", "February", "March", "April"];
    return semester % 2 === 0 ? monthsEven : monthsOdd;
  };

  const months = getMonthsForSemester(student.semester);

  return (
    <div className="attendance-report-container bg-gray-50 p-8 min-h-max flex flex-col items-center">
      {/* Header Section */}
      <div className="header bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md w-full max-w-4xl flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Attendance Report</h1>
          <p className="text-sm mt-1">
            {student.name} | {student.course} | Semester {student.semester}
          </p>
        </div>
        {/* Monthly View Dropdown */}
        <div className="dropdown">
          <select
            className="bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 text-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="Overall">Overall</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-container mt-8 w-full max-w-4xl">
        <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                Subject Name
              </th>
              <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                Subject Code
              </th>
              <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                Total Classes
              </th>
              <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                Classes Attended
              </th>
              <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                Attendance %
              </th>
              <th className="text-left px-6 py-3 text-blue-900 font-semibold">
                Required Classes for 70%
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendanceData.map((subject, index) => {
              const {
                subject_name,
                subject_code,
                total_classes,
                classes_attended,
              } = subject;
              const percentage = (
                (classes_attended / total_classes) *
                100
              ).toFixed(2);
              const requiredClasses =
                percentage >= 70
                  ? 0
                  : Math.ceil(
                      (0.7 * total_classes - classes_attended) / (1 - 0.7)
                    );

              return (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } text-gray-800`}
                >
                  <td className="px-6 py-3">{subject_name}</td>
                  <td className="px-6 py-3">{subject_code}</td>
                  <td className="px-6 py-3">{total_classes}</td>
                  <td className="px-6 py-3">{classes_attended}</td>
                  <td className="px-6 py-3">{percentage}%</td>
                  <td className="px-6 py-3">
                    {requiredClasses > 0 ? requiredClasses : "NA"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="footer mt-8 text-gray-600 text-sm">
        <p>
          Ensure your attendance percentage meets the minimum requirement of 70%
          for each subject.
        </p>
      </div>
    </div>
  );
};

export default AttendanceReport;
