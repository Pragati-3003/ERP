import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AttendanceReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("Overall");

  // Get student details from Redux store
  const studentId = useSelector((state) => state.auth.user.userInfo._id);
  const curriculumId = useSelector((state) => state.auth.user.userInfo.CurriculumID);
  const semester = useSelector((state) => state.auth.user.userInfo.Semester);

  // Fetch attendance data from the API
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Provide Token");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/user/getattendance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          studentId,
          curriculumId,
          semester,
        },
      });

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch attendance data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Aggregation logic for "Overall"
  const getAggregatedAttendance = () => {
    return data.reduce((acc, curr) => {
      const existingSubject = acc.find(
        (subject) => subject.courseCode === curr.courseCode
      );
      if (existingSubject) {
        existingSubject.totalClasses += curr.monthWiseAttendance.reduce(
          (sum, month) => sum + month.totalClasses,
          0
        );
        existingSubject.attendedClasses += curr.monthWiseAttendance.reduce(
          (sum, month) => sum + month.attendedClasses,
          0
        );
      } else {
        acc.push({
          courseName: curr.courseName,
          courseCode: curr.courseCode,
          totalClasses: curr.monthWiseAttendance.reduce(
            (sum, month) => sum + month.totalClasses,
            0
          ),
          attendedClasses: curr.monthWiseAttendance.reduce(
            (sum, month) => sum + month.attendedClasses,
            0
          ),
        });
      }
      return acc;
    }, []);
  };

  // Filtered or aggregated attendance data
  const filteredAttendanceData =
    selectedMonth === "Overall"
      ? getAggregatedAttendance()
      : data.flatMap((course) =>
        course.monthWiseAttendance
          .filter((month) => month.month === selectedMonth)
          .map((month) => ({
            courseName: course.courseName,
            courseCode: course.courseCode,
            totalClasses: month.totalClasses,
            attendedClasses: month.attendedClasses,
          }))
      );

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

  const months = getMonthsForSemester(semester);

  if (loading) {
    return <div className="text-center py-8">Loading attendance data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="attendance-report-container p-8 min-h-max flex flex-col items-center">
      {/* Header Section */}
      <div className="header bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md w-full max-w-4xl flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Attendance Report</h1>
          <p className="text-sm mt-1">
            Semester {semester}
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
                courseName,
                courseCode,
                totalClasses,
                attendedClasses,
              } = subject;
              const percentage = (
                (attendedClasses / totalClasses) *
                100
              ).toFixed(2);
              const requiredClasses =
                percentage >= 70
                  ? 0
                  : Math.ceil(
                    (0.7 * totalClasses - attendedClasses) / (1 - 0.7)
                  );

              return (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } text-gray-800`}
                >
                  <td className="px-6 py-3">{courseName}</td>
                  <td className="px-6 py-3">{courseCode}</td>
                  <td className="px-6 py-3">{totalClasses}</td>
                  <td className="px-6 py-3">{attendedClasses}</td>
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