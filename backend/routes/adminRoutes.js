const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");
const authorizeRoles = require("../middlewares/roleMiddleware.js");
const {
  addSemesterResult,
  addAdmin,
  getAdminProfilebyEmail,
  deleteCourse,
  updateCourse,
  getCurriculum,
  deleteTeacherCourseByEmailandCourseTaught,
  updateProfile,
  getTeacherCoursesByEmail,
  updateTeacherByEmail,
  addCourseToTeacher,
  deleteTeacherByEmail,
  updateStudent,
  deleteStudent,
  addEvents,
  addStudentTimeTable,
  addTeacherTimeTable,
  addStudent,
  addTeacher,
  addCourse,
  addCurriculum,
  updateCurriculum,
  deleteCurriculum,
  addEndSemResultBySmartID,
} = require("../controllers/adminController.js");
const {
  uploadResult,
  uploadTimeTable,
  uploadTeacherTimeTable,
} = require("../middlewares/uploadMiddleware.js");
const { uploadProfilePictures } = require("../middlewares/uploadMiddleware.js");
const router = express.Router();

// router.post('/',verifyToken,authorizeRoles("Admin"),(req,res)=>{
//     res.json({message : "Admin"})
// })

router.post("/add-student", verifyToken, authorizeRoles("Admin"), addStudent);
router.post("/add-addAdmin", verifyToken, authorizeRoles("Admin"), addAdmin);
router.patch(
  "/update-student/:smartID",
  verifyToken,
  authorizeRoles("Admin"),
  updateStudent
);
router.delete(
  "/delete-student/:smartID",
  verifyToken,
  authorizeRoles("Admin"),
  deleteStudent
);
router.post("/add-teacher", verifyToken, authorizeRoles("Admin"), addTeacher);
router.patch(
  "/update-teacher/:email",
  verifyToken,
  authorizeRoles("Admin"),
  updateTeacherByEmail
);
router.get("/curriculum", verifyToken, authorizeRoles("Admin"), getCurriculum);
router.delete(
  "/delete-teacher/:email",
  verifyToken,
  authorizeRoles("Admin"),
  deleteTeacherByEmail
);
router.post("/add-course", verifyToken, authorizeRoles("Admin"), addCourse);
router.delete(
  "/delete-course/:CourseCode/:CourseName",
  verifyToken,
  authorizeRoles("Admin"),
  deleteCourse
);
router.patch(
  "/update-course/:CourseCode/:CourseName",
  verifyToken,
  authorizeRoles("Admin"),
  updateCourse
);
router.post("/addEvents", verifyToken, authorizeRoles("Admin"), addEvents);
router.post(
  "/add-curriculum",
  verifyToken,
  authorizeRoles("Admin"),
  addCurriculum
);
router.patch(
  "/update-curriculum",
  verifyToken,
  authorizeRoles("Admin"),
  updateCurriculum
);
router.delete(
  "/delete-curriculum",
  verifyToken,
  authorizeRoles("Admin"),
  deleteCurriculum
);
router.post(
  "/add-course-teacher",
  verifyToken,
  authorizeRoles("Admin"),
  addCourseToTeacher
);
router.delete(
  "/delete-course-teacher/:teacherEmail/:courseId",
  verifyToken,
  authorizeRoles("Admin"),
  deleteTeacherCourseByEmailandCourseTaught
);
router.get(
  "/get-courses-teacher/:teacherEmail",
  verifyToken,
  authorizeRoles("Admin"),
  getTeacherCoursesByEmail
);
router.get(
  "/getAdminProfilebyEmail/:Email",
  verifyToken,
  authorizeRoles("Admin"),
  getAdminProfilebyEmail
);
router.post(
  "/addEndSemResBySmartId",
  verifyToken,
  authorizeRoles("Admin"),
  uploadResult.single("pdfFile"),
  addEndSemResultBySmartID
);
router.put(
  "/addStudentTimeTable",
  verifyToken,
  authorizeRoles("Admin"),
  uploadTimeTable.single("pdfFile"),
  addStudentTimeTable
);
router.put(
  "/addTeacherTimeTable",
  verifyToken,
  authorizeRoles("Admin"),
  uploadTeacherTimeTable.single("pdfFile"),
  addTeacherTimeTable
);
router.patch(
  "/updateProfile",
  verifyToken,
  authorizeRoles("Admin"),
  uploadProfilePictures.single("profilePicture"),
  updateProfile
);
router.put(
  "/addSemesterResult",
  verifyToken,
  authorizeRoles("Admin"),
  uploadResult.single("resultPDF"),
  addSemesterResult
);

module.exports = router;
