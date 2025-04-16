const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");
const authorizeRoles = require("../middlewares/roleMiddleware.js");
const { upload } = require("../middlewares/uploadMiddleware.js");
const {
  getTeacherCourses,
  getTeacherCurriculums,
  getAssignment,
  uploadAssignments,
  deleteAssignment,
  updateAssignment,
} = require("../controllers/assignmentController");
const router = express.Router();
router.get(
  "/curriculums",
  verifyToken,
  authorizeRoles("Teacher"),
  getTeacherCurriculums
);
router.get(
  "/courses",
  verifyToken,
  authorizeRoles("Teacher"),
  getTeacherCourses
);
router.post(
  "/teacher/uploadAss",
  verifyToken,
  authorizeRoles("Teacher"),
  upload.single("pdfFile"),
  uploadAssignments
);
router.get(
  "/teacher/:teacherId",
  verifyToken,
  authorizeRoles("Teacher"),
  getAssignment
);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("Teacher"),
  upload.single("pdfFile"),
  updateAssignment
);
router.delete("/:id", verifyToken, authorizeRoles("Teacher"), deleteAssignment);
module.exports = router;
