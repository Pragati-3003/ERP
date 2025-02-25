import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CourseEnrolled = () => {
  const [semester, setSemester] = React.useState(1);
  const token = useSelector((state) => state.auth.token)
  const [data, setData] = useState([]);
  const fetchData = async () => {
    // const token = localStorage.getItem("token");
    if (!token) {
      console.log("Provide Token")
      return;
    }
    try {
      const res = await axios.get("http://localhost:5000/api/student/course-enrolled",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setData(res.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Enrolled Courses
        </h1>
        <p className="text-lg text-gray-600">
          Explore your current semester's courses
        </p>
      </div>

      {/* Semester Selector */}
      <div className="flex justify-end items-center mb-6">
        <label
          htmlFor="semester"
          className="mr-3 text-lg font-medium text-gray-700"
        >
          Select Semester:
        </label>
        <select
          id="semester"
          className="border border-gray-300 bg-white text-gray-800 rounded-lg px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={semester}
          onChange={(e) => setSemester(Number(e.target.value))}
        >
          <option value="" disabled>
            -- Select Semester --
          </option>
          {data?.map((sem, index) => (
            <option key={index} value={sem.semester}>
              Semester {sem.semester}
            </option>
          ))}
        </select>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((semesterData, index) => (
          semesterData.semester === semester && semesterData.courses?.map((course, courseIndex) => (
            <div
              key={courseIndex}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-t-4 border-blue-500 ml-4 mb-4"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {course.CourseName || "N/A"}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                <strong>Code:</strong> {course.CourseCode || "N/A"}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                <strong>Instructor:</strong> {course.Teacher?.[0]?.Name || "N/A"}
              </p>
              <div className="flex justify-between text-gray-700 text-sm">
                <div>
                  <strong>Credits:</strong> {course.CreditPoints || "N/A"}
                </div>
                <div>
                  <strong>L:</strong> {course.L || "5"}{" "}
                  <strong>T:</strong> {course.T || "5"}{" "}
                  <strong>P:</strong> {course.P || "4"}
                </div>
              </div>
            </div>
          ))))}
      </div>
    </div>
  );
};

export default CourseEnrolled;
