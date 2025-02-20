const express = require('express')
const verifyToken = require('../middlewares/authMiddleware.js')
const authorizeRoles = require('../middlewares/roleMiddleware.js')
const {getStudentById,getCourse,getCurriculum} =require("../controllers/studentController.js")
const router = express.Router();



router.get('/profile', verifyToken, authorizeRoles('Student'), getStudentById)
router.get('/course', verifyToken, authorizeRoles('Student'), getCourse)
router.get('/curriculum', verifyToken, authorizeRoles('Student'), getCurriculum)

module.exports = router;