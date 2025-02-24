const express = require('express')
const verifyToken = require('../middlewares/authMiddleware.js')
const authorizeRoles = require('../middlewares/roleMiddleware.js')
const {courseEnrolled,getStudentById,getCourse,getCurriculum} =require("../controllers/studentController.js")
const router = express.Router();



router.get('/profile', verifyToken, authorizeRoles('Student'), getStudentById)
router.get('/course', verifyToken, authorizeRoles('Student'), getCourse)
router.get('/curriculum', verifyToken, authorizeRoles('Student'), getCurriculum)
router.get('/course-enrolled', verifyToken, authorizeRoles('Student'), courseEnrolled)
module.exports = router;