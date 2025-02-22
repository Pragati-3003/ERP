const express = require('express')
const verifyToken = require('../middlewares/authMiddleware.js')
const authorizeRoles = require('../middlewares/roleMiddleware.js')
const router = express.Router();
const {markAttendance,updateAttendance} = require("../controllers/teacherController.js")

router.post('/markAttendance', verifyToken, authorizeRoles("Teacher"), markAttendance)
router.put('/updateAttendance', verifyToken, authorizeRoles("Teacher"), updateAttendance)


module.exports = router;