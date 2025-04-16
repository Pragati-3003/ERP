const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const studentRoutes = require("./routes/studentRoutes.js");
const teacherRoutes = require("./routes/teacherRoutes.js");
const attendanceRoutes = require("./routes/attendanceRoutes");
const curriculumRoutes = require("./routes/curriculumRoutes");
const eventRoutes = require("./routes/eventRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.get("/", (req, res) => {
  res.send("Hello from the backend , byw ");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB connection error", err));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/curriculum", curriculumRoutes);
