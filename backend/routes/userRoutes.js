const express = require('express')
const verifyToken = require('../middlewares/authMiddleware.js')
const authorizeRoles = require('../middlewares/roleMiddleware.js')
const router = express.Router();

router.post('/admin',verifyToken,authorizeRoles("Admin"),(req,res)=>{
    res.json({message : "Admin"})
})

router.post('/teacher',verifyToken,authorizeRoles("Teacher"),(req,res)=>{
    res.json({message : "Teacher"})
})
router.post('/student',verifyToken,authorizeRoles("Student"), (req,res)=>{
    res.json({message : "STudent"})
})

module.exports = router;