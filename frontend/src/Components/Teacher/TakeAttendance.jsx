import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TakeAttendance = () => {
  const [coursesTaught, setCoursesTaught] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [attendance, setAttendance] = useState({});

  const email = useSelector((state) => state.auth.user.userInfo.Email);

  useEffect(() => {
    const fetchTeacherCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:5000/api/teacher/courses",

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCoursesTaught(data.coursesTaught);
      } catch (error) {
        console.error("Error fetching teacher's courses", error);
      }
    };

    fetchTeacherCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!email || !selectedSemester || !selectedCurriculum) {
        console.error("Missing required filters");
        return;
      }

      const { data } = await axios.get(
        `http://localhost:5000/api/teacher/students?email=${email}&semester=${selectedSemester}&curriculumId=${selectedCurriculum}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudents(data);

      const initialAttendance = Object.fromEntries(
        data.map((student) => [student._id, true])
      );
      setAttendance(initialAttendance);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  const toggleAllAttendance = (isPresent) => {
    setAttendance((prev) =>
      Object.keys(prev).reduce((acc, id) => {
        acc[id] = isPresent;
        return acc;
      }, {})
    );
  };

  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const submitAttendance = async () => {
    const TeacherID = localStorage.getItem("UserId");
    const currentDate = new Date().toISOString();

    const attendanceData = students.map((student) => ({
      StudentID: student._id,
      CourseID: selectedCourse,
      CurriculumID: selectedCurriculum,
      TeacherID,
      Status: attendance[student._id] ? "Present" : "Absent",
      Date: currentDate,
    }));

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/attendance/submit",
        { attendanceData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting attendance", error);
      alert("Failed to submit attendance");
    }
  };

  return (
    <div className="min-h-screen  text-white px-6 py-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Mark Attendance</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <select
            onChange={(e) => setSelectedCurriculum(e.target.value)}
            className="bg-white text-gray-800"
          >
            <option value="">Select Curriculum</option>
            {coursesTaught.map((c) => (
              <option key={c.curriculum._id} value={c.curriculum._id}>
                {c.curriculum.program}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="bg-white text-gray-800"
          >
            <option value="">Select Semester</option>
            {[
              ...new Set(coursesTaught.flatMap((c) => c.curriculum.semesters)),
            ].map((s, index) => (
              <option key={index} value={s.semester}>
                Semester {s.semester}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-white text-gray-800"
          >
            <option value="">Select Course</option>
            {coursesTaught
              .filter(
                (c) =>
                  c.curriculum._id === selectedCurriculum &&
                  c.curriculum.semesters.some(
                    (s) => s.semester == selectedSemester
                  )
              )
              .map((c) => (
                <option key={c.course._id} value={c.course._id}>
                  {c.course.CourseName}
                </option>
              ))}
          </select>

          <button
            onClick={fetchStudents}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
          >
            Fetch Students
          </button>
        </div>

        {students.length > 0 && (
          <>
            <div className="flex justify-center gap-6 mb-6">
              <button
                onClick={() => toggleAllAttendance(true)}
                className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded shadow"
              >
                Mark All Present
              </button>
              <button
                onClick={() => toggleAllAttendance(false)}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded shadow"
              >
                Mark All Absent
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg shadow border border-gray-700">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-gray-300">
                    <th className="border border-gray-700 px-4 py-3">
                      Full Name
                    </th>
                    <th className="border border-gray-700 px-4 py-3">
                      Smart ID
                    </th>
                    <th className="border border-gray-700 px-4 py-3">
                      Roll Number
                    </th>
                    <th className="border border-gray-700 px-4 py-3 text-center">
                      Present
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-800">
                      <td className="border border-gray-700 px-4 py-2">
                        {student.FirstName} {student.LastName}
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        {student.SmartID}
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        {student.RollNumber}
                      </td>
                      <td className="border border-gray-700 px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={attendance[student._id]}
                          onChange={() => handleAttendanceChange(student._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={submitAttendance}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded text-lg shadow-lg"
              >
                Submit Attendance
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TakeAttendance;
