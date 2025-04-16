const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  AssignmentNumber: { type: String },
  Semester: { type: Number },
  CourseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  CurriculumID: { type: mongoose.Schema.Types.ObjectId, ref: "Curriculum" },
  TeacherID: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  AssignmentPDF: { type: String, required: true },
  DueDate: { type: Date },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
