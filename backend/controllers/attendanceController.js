const Attendance = require("../models/attendance.model.js");
const Teacher = require("../models/teacher.model.js");
const Student = require("../models/student.model.js");
const submitAttendance = async (req, res) => {
  try {
    const { attendanceData } = req.body; // Expecting an array of attendance records

    if (!attendanceData || attendanceData.length === 0) {
      return res.status(400).json({ message: "No attendance data provided." });
    }

    // Insert attendance records into the database
    await Attendance.insertMany(attendanceData);

    res.status(201).json({ message: "Attendance recorded successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error submitting attendance" });
  }
};

// module.exports = { submitAttendance };
// // ✅ Get students for attendance (based on teacher's email, course, and curriculum)
// exports.getStudentsByCourseAndCurriculum = async (req, res) => {
//   try {
//     const { email, courseId, curriculumId } = req.query;

//     // 🔹 Find teacher by email
//     const teacher = await Teacher.findOne({ Email: email });

//     if (!teacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }

//     // 🔹 Check if the teacher teaches this course & curriculum
//     const isAuthorized = teacher.CoursesTaught.some(
//       (c) =>
//         c.course.toString() === courseId &&
//         c.curriculum.toString() === curriculumId
//     );

//     if (!isAuthorized) {
//       return res.status(403).json({
//         message: "You are not authorized to take attendance for this course",
//       });
//     }

//     // 🔹 Fetch students with matching CourseID & CurriculumID
//     const students = await Student.find({
//       CourseID: courseId,
//       CurriculumID: curriculumId,
//     })
//       .sort({ FirstName: 1 }) // Sort students in ascending order
//       .select("FirstName LastName StudentID");

//     const formattedStudents = students.map((student) => ({
//       id: student._id,
//       name: `${student.FirstName} ${student.LastName}`, // Concatenated full name
//       studentID: student.StudentID,
//     }));

//     res.status(200).json(formattedStudents);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// ✅ Take attendance
// exports.takeAttendance = async (req, res) => {
// try {
//   const { teacherEmail, courseId, curriculumId, attendance } = req.body;

//   if (!teacherEmail || !courseId || !curriculumId || !attendance) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   // 🔹 Save attendance for each student
//   const attendanceRecords = attendance.map((entry) => ({
//     teacherEmail,
//     courseId,
//     curriculumId,
//     studentID: entry.studentID,
//     status: entry.status, // "Present" or "Absent"
//     date: new Date(),
//   }));

//   await Attendance.insertMany(attendanceRecords);

//   res.status(200).json({ message: "Attendance submitted successfully!" });
// } catch (error) {
//   res.status(500).json({ message: "Server error", error });
// }
//   if (!attendanceData || attendanceData.length === 0) {
//     return res.status(400).json({ message: "No attendance data provided." });
//   }
//   try {
//     const { attendance } = req.body;
//     await Attendance.insertMany(attendance);
//     res.json({ message: "Attendance submitted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
