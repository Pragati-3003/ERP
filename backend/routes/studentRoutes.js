const express = require('express')
const verifyToken = require('../middlewares/authMiddleware.js')
const authorizeRoles = require('../middlewares/roleMiddleware.js')
const {getEvents,getTimeTable,updateProfile,getMidtermResults,uploadAssignmentSubmissions,viewAssignments,courseEnrolled,getStudentById,getCourse,getCurriculum} =require("../controllers/studentController.js")
const {uploadSubmission,uploadProfilePictures} = require("../middlewares/uploadMiddleware.js")
const router = express.Router();

router.get('/profile', verifyToken, authorizeRoles('Student'), getStudentById)
router.get('/course', verifyToken, authorizeRoles('Student'), getCourse)
router.get('/curriculum', verifyToken, authorizeRoles('Student'), getCurriculum)
router.get('/course-enrolled', verifyToken, authorizeRoles('Student'), courseEnrolled)
router.get('/viewAssignments', verifyToken, authorizeRoles('Student'), viewAssignments)
router.post('/uploadAssignmentSubmissions', verifyToken,  authorizeRoles("Student"), uploadSubmission.single("pdfFile"), uploadAssignmentSubmissions)
router.get('/getMidtermResults', verifyToken, authorizeRoles('Student'), getMidtermResults)
router.patch('/updateProfile', verifyToken,  authorizeRoles("Student"), uploadProfilePictures.single("profilePicture"), updateProfile)
router.get('/getEvents', verifyToken, authorizeRoles('Student'), getEvents)
router.get('/getTimeTable', verifyToken, authorizeRoles('Student'), getTimeTable)
module.exports = router;