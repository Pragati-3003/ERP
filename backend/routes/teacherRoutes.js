const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");
const authorizeRoles = require("../middlewares/roleMiddleware.js");
const router = express.Router();
const {
  uploadProfilePictures,
  upload,
} = require("../middlewares/uploadMiddleware.js");

const {
  uploadMidtermResult,
  markAttendance,
  updateAttendance,
  uploadAssignment,
  updateProfile,
  getTeacherProfilebyEmail,
  getTeacherCourses,
  getStudentsForAttendance,
  getTeacherCoursesByEmail,
} = require("../controllers/teacherController.js");
router.get(
  "/getTeacherProfilebyEmail/:Email",
  verifyToken,
  authorizeRoles("Teacher"),
  getTeacherProfilebyEmail
);
router.post(
  "/markAttendance",
  verifyToken,
  authorizeRoles("Teacher"),
  markAttendance
);
router.put(
  "/updateAttendance",
  verifyToken,
  authorizeRoles("Teacher"),
  updateAttendance
);
router.post(
  "/uploadAssignment",
  verifyToken,
  authorizeRoles("Teacher"),
  upload.single("pdfFile"),
  uploadAssignment
);
router.patch(
  "/uploadMidtermResult",
  verifyToken,
  authorizeRoles("Teacher"),
  uploadMidtermResult
);
router.patch(
  "/updateProfile",
  verifyToken,
  authorizeRoles("Student"),
  uploadProfilePictures.single("profilePicture"),
  updateProfile
);
// router.get(
//   "/getTeacherCoursesByEmail/:Email",
//   verifyToken,
//   authorizeRoles("Teacher"),
//   getTeacherCoursesByEmail
// );
router.get(
  "/courses",
  verifyToken,
  authorizeRoles("Teacher"),
  getTeacherCourses
);
router.get(
  "/students",
  verifyToken,
  authorizeRoles("Teacher"),
  getStudentsForAttendance
);
module.exports = router;
