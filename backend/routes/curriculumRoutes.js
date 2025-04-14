const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");
const authorizeRoles = require("../middlewares/roleMiddleware.js");
const {
  getDeptName,
  getCourseName,
} = require("../controllers/curriculumController");

const router = express.Router();
router.get("/courses", verifyToken, authorizeRoles("Admin"), getCourseName);
router.get("/departments", verifyToken, authorizeRoles("Admin"), getDeptName);
module.exports = router;
