const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  AssignmentID: { type: String, required: true, unique: true },
  Title: { type: String, required: true },
  AssignmentNumber: { type: String },
  CourseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  TeacherID: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  DueDate: { type: Date },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
