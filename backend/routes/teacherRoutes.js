const express = require('express')
const verifyToken = require('../middlewares/authMiddleware.js')
const authorizeRoles = require('../middlewares/roleMiddleware.js')
const router = express.Router();
const {upload}  = require("../middlewares/uploadMiddleware.js")
const {markAttendance,updateAttendance,uploadAssignment} = require("../controllers/teacherController.js")

router.post('/markAttendance', verifyToken, authorizeRoles("Teacher"), markAttendance)
router.put('/updateAttendance', verifyToken, authorizeRoles("Teacher"), updateAttendance)
router.post('/uploadAssignment', verifyToken,  authorizeRoles("Teacher"), upload.single("pdfFile"), uploadAssignment)

module.exports = router;