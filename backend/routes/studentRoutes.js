const express = require('express')
const verifyToken = require('../middlewares/authMiddleware.js')
const authorizeRoles = require('../middlewares/roleMiddleware.js')
const {getStudentById} =require("../controllers/studentController.js")
const router = express.Router();



router.get('/profile', verifyToken, authorizeRoles('Student'), getStudentById)


module.exports = router;