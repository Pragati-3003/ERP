const mongoose = require("mongoose");

const teacherTimetableSchema = new mongoose.Schema({
  teacherID: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  session: { type: String },
  pdfURL: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TeacherTimetable", teacherTimetableSchema);
