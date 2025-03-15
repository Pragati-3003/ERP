const express = require('express')
const verifyToken = require('../middlewares/authMiddleware.js')
const authorizeRoles = require('../middlewares/roleMiddleware.js')
const {addStudent,addTeacher,addCourse,addCurriculum,addEndSemResultBySmartID}= require("../controllers/adminController.js")
const {uploadResult}  = require("../middlewares/uploadMiddleware.js")
const router = express.Router();



// router.post('/',verifyToken,authorizeRoles("Admin"),(req,res)=>{
//     res.json({message : "Admin"})
// })

router.post('/add-student',verifyToken,authorizeRoles("Admin"),addStudent)
router.post('/add-teacher',verifyToken,authorizeRoles("Admin"),addTeacher)
router.post('/add-course',verifyToken,authorizeRoles("Admin"),addCourse)
router.post('/add-curriculum',verifyToken,authorizeRoles("Admin"),addCurriculum)
router.post('/addEndSemResBySmartId',verifyToken,authorizeRoles("Admin"),uploadResult.single("pdfFile"),addEndSemResultBySmartID)








module.exports = router;