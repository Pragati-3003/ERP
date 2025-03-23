const express = require('express')
const verifyToken = require('../middlewares/authMiddleware.js')
const authorizeRoles = require('../middlewares/roleMiddleware.js')
const {getStudentsBySmartID,getTeacherByEmail, getStudentAttendanceOfParticularCourse,getSemesterResultByStudentId, getAllCoursesByCurriculumID, getAttendance, getCourseByNameandCode, getStudentsByCurriculum, getStudentByCourse } = require("../controllers/userController.js")
const router = express.Router();

router.post('/admin', verifyToken, authorizeRoles("Admin"), (req, res) => {
    res.json({ message: "Admin" })
})

router.post('/teacher', verifyToken, authorizeRoles("Teacher"), (req, res) => {
    res.json({ message: "Teacher" })
})
router.post('/student', verifyToken, authorizeRoles("Student"), (req, res) => {
    res.json({ message: "STudent" })
})
router.get('/getcourse/:CourseCode/:CourseName', verifyToken, authorizeRoles("Student", "Admin", "Teacher"), getCourseByNameandCode);
router.get('/curriculum/:curriculumId', verifyToken, authorizeRoles("Admin", "Teacher"), getStudentsByCurriculum);
router.get('/students/course/:courseId', verifyToken, authorizeRoles("Admin", "Teacher"), getStudentByCourse);
// router.get('/getattendance', verifyToken, authorizeRoles( "Admin", "Student","Teacher"), getStudentAttendanceOfParticularCourse);
router.get('/getattendance', verifyToken, authorizeRoles("Admin", "Student", "Teacher"), getAttendance);
router.get('/getStudentsBySmartID', verifyToken, authorizeRoles("Admin", "Student", "Teacher"), getStudentsBySmartID);
router.get('/getTeacherByEmail', verifyToken, authorizeRoles("Admin", "Teacher"), getTeacherByEmail);
router.get('/getAllCoursesByCurriculumId', verifyToken, authorizeRoles("Admin", "Student"), getAllCoursesByCurriculumID);
router.get('/getEndSemRes', verifyToken, authorizeRoles("Admin", "Student"), getSemesterResultByStudentId);
module.exports = router;