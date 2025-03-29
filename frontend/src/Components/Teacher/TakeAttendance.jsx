// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TakeAttendance = () => {
//   const [coursesTaught, setCoursesTaught] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [selectedCurriculum, setSelectedCurriculum] = useState("");
//   const [attendance, setAttendance] = useState({});

//   useEffect(() => {
//     const fetchTeacherCourses = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get(
//           "http://localhost:5000/api/teacher/courses",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCoursesTaught(data.coursesTaught);
//       } catch (error) {
//         console.error("Error fetching teacher's courses", error);
//       }
//     };
//     fetchTeacherCourses();
//   }, []);

//   const fetchStudents = async () => {
//     if (selectedCurriculum && selectedSemester && selectedCourse) {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get(
//           `http://localhost:5000/api/teacher/students-attendance?semester=${selectedSemester}&courseId=${selectedCourse}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setStudents(data);
//         // Default all students as Present
//         setAttendance(
//           data.reduce((acc, student) => {
//             acc[student._id] = true;
//             return acc;
//           }, {})
//         );
//       } catch (error) {
//         console.error("Error fetching students", error);
//       }
//     }
//   };

//   const toggleAllAttendance = (isPresent) => {
//     const updatedAttendance = students.reduce((acc, student) => {
//       acc[student._id] = isPresent;
//       return acc;
//     }, {});
//     setAttendance(updatedAttendance);
//   };

//   const handleAttendanceChange = (studentId) => {
//     setAttendance((prev) => ({
//       ...prev,
//       [studentId]: !prev[studentId], // Toggle attendance
//     }));
//   };

//   const submitAttendance = async () => {
//     const attendanceData = students.map((student) => ({
//       student: student._id,
//       course: selectedCourse,
//       curriculum: selectedCurriculum,
//       semester: selectedSemester,
//       teacher: localStorage.getItem("teacherId"),
//       status: attendance[student._id] ? "Present" : "Absent",
//     }));

//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:5000/api/attendance/submit",
//         { attendanceData },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Attendance submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting attendance", error);
//     }
//   };

//   return (
//     <div className="attendance-container">
//       <h2>Mark Attendance</h2>

//       <select onChange={(e) => setSelectedCurriculum(e.target.value)}>
//         <option value="">Select Curriculum</option>
//         {coursesTaught.map((c) => (
//           <option key={c.curriculum._id} value={c.curriculum._id}>
//             {c.curriculum.program}
//           </option>
//         ))}
//       </select>

//       <select onChange={(e) => setSelectedSemester(e.target.value)}>
//         <option value="">Select Semester</option>
//         {[...new Set(coursesTaught.flatMap((c) => c.curriculum.semesters))].map(
//           (s, index) => (
//             <option key={index} value={s.semester}>
//               Semester {s.semester}
//             </option>
//           )
//         )}
//       </select>

//       <select onChange={(e) => setSelectedCourse(e.target.value)}>
//         <option value="">Select Course</option>
//         {coursesTaught
//           .filter(
//             (c) =>
//               c.curriculum._id === selectedCurriculum &&
//               c.curriculum.semesters.some((s) => s.semester == selectedSemester)
//           )
//           .map((c) => (
//             <option key={c.course._id} value={c.course._id}>
//               {c.course.CourseName}
//             </option>
//           ))}
//       </select>

//       <button onClick={fetchStudents}>Fetch Students</button>

//       {students.length > 0 && (
//         <>
//           <h3>Student List</h3>
//           <button onClick={() => toggleAllAttendance(true)}>
//             Mark All Present
//           </button>
//           <button onClick={() => toggleAllAttendance(false)}>
//             Mark All Absent
//           </button>

//           <table>
//             <thead>
//               <tr>
//                 <th>Full Name</th>
//                 <th>Smart ID</th>
//                 <th>Roll Number</th>
//                 <th>Present</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student) => (
//                 <tr key={student._id}>
//                   <td>{`${student.FirstName} ${student.LastName}`}</td>
//                   <td>{student.SmartID}</td>
//                   <td>{student.RollNumber}</td>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={attendance[student._id]}
//                       onChange={() => handleAttendanceChange(student._id)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <button onClick={submitAttendance}>Submit Attendance</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default TakeAttendance;
import React, { useState, useEffect } from "react";
import axios from "axios";

const TakeAttendance = () => {
  const [coursesTaught, setCoursesTaught] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [attendance, setAttendance] = useState({});

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
      const teacherId = localStorage.getItem("email"); // Ensure it's correctly stored

      if (!email || !selectedSemester || !selectedCurriculum) {
        console.error("Missing required filters");
        return;
      }

      const { data } = await axios.get(
        `http://localhost:5000/api/teacher/student?email=${email}&semester=${selectedSemester}&curriculumId=${selectedCurriculum}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudents(data);

      // Initialize attendance state efficiently
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
    const attendanceData = students.map((student) => ({
      student: student._id,
      course: selectedCourse,
      curriculum: selectedCurriculum,
      semester: selectedSemester,
      teacher: localStorage.getItem("teacherId"),
      status: attendance[student._id] ? "Present" : "Absent",
    }));

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/attendance/submit",
        { attendanceData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance", error);
    }
  };

  return (
    <div className="attendance-container">
      <h2>Mark Attendance</h2>

      <select onChange={(e) => setSelectedCurriculum(e.target.value)}>
        <option value="">Select Curriculum</option>
        {coursesTaught.map((c) => (
          <option key={c.curriculum._id} value={c.curriculum._id}>
            {c.curriculum.program}
          </option>
        ))}
      </select>

      <select onChange={(e) => setSelectedSemester(e.target.value)}>
        <option value="">Select Semester</option>
        {[...new Set(coursesTaught.flatMap((c) => c.curriculum.semesters))].map(
          (s, index) => (
            <option key={index} value={s.semester}>
              Semester {s.semester}
            </option>
          )
        )}
      </select>

      <select onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="">Select Course</option>
        {coursesTaught
          .filter(
            (c) =>
              c.curriculum._id === selectedCurriculum &&
              c.curriculum.semesters.some((s) => s.semester == selectedSemester)
          )
          .map((c) => (
            <option key={c.course._id} value={c.course._id}>
              {c.course.CourseName}
            </option>
          ))}
      </select>

      <button onClick={fetchStudents}>Fetch Students</button>

      {students.length > 0 && (
        <>
          <h3>Student List</h3>
          <button onClick={() => toggleAllAttendance(true)}>
            Mark All Present
          </button>
          <button onClick={() => toggleAllAttendance(false)}>
            Mark All Absent
          </button>

          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Smart ID</th>
                <th>Roll Number</th>
                <th>Present</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{`${student.FirstName} ${student.LastName}`}</td>
                  <td>{student.SmartID}</td>
                  <td>{student.RollNumber}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={attendance[student._id]}
                      onChange={() => handleAttendanceChange(student._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={submitAttendance}>Submit Attendance</button>
        </>
      )}
    </div>
  );
};

export default TakeAttendance;
