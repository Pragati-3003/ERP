const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");
const authorizeRoles = require("../middlewares/roleMiddleware.js");
const { submitAttendance } = require("../controllers/attendanceController");

const router = express.Router();

// ✅ Get students based on the teacher's assigned course & curriculum
// router.get(
//   "/getStudentsByCourseAndCurriculum",
//   verifyToken,
//   authorizeRoles("Teacher"),
//   getStudentsByCourseAndCurriculum
// );

// // ✅ Submit attendance
// router.post(
//   "/submitAttendance",
//   verifyToken,
//   authorizeRoles("Teacher"),
//   takeAttendance
// );
router.post(
  "/submit",
  verifyToken,
  authorizeRoles("Teacher"),
  submitAttendance
);
module.exports = router;
