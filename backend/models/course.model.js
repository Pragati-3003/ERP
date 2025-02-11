const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  CourseID: { type: String, required: true, unique: true },
  CourseName: { type: String, required: true },
  DeptID: { type: Number },
  CreditPoints: { type: Number },
  Semester: { type: String },
  Prerequisites: { type: String },
  Syllabus: { type: String },
  TotalLectures: { type: Number },
});

module.exports = mongoose.model("Course", CourseSchema);
