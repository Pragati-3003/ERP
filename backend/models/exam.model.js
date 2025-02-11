const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  ExamID: { type: String, required: true, unique: true },
  CourseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  Date: { type: Date },
  TimeSlot: { type: String },
  ExamCenter: { type: String },
});

module.exports = mongoose.model("Exam", ExamSchema);
