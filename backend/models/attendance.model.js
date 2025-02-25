const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
 StudentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  TeacherID: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  CourseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  CurriculumID: { type: mongoose.Schema.Types.ObjectId, ref: "Curriculum" },
  Date: { type: Date, required: true },
  Status: { type: String, enum: ["Present", "Absent", "Late"] },
  Remarks: { type: String },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
