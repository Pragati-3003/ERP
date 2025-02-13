const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  AttendanceID: { type: String, required: true, unique: true },
  StudentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  TeacherID: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  CourseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  Date: { type: Date, required: true },
  Status: { type: String, enum: ["Present", "Absent", "Late"] },
  Remarks: { type: String },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
