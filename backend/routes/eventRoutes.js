const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");
const authorizeRoles = require("../middlewares/roleMiddleware.js");
const {
  addEvent,
  updateEvent,
  deleteEvent,
  fetchEvent,
} = require("../controllers/eventController");
const router = express.Router();
router.get("/", verifyToken, authorizeRoles("Admin"), fetchEvent);
router.post("/add", verifyToken, authorizeRoles("Admin"), addEvent);
router.put("/update/:id", verifyToken, authorizeRoles("Admin"), updateEvent);
router.delete("/delete/:id", verifyToken, authorizeRoles("Admin"), deleteEvent);
module.exports = router;
