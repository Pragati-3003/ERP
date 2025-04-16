const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  CourseCode: { type: String, required: true },
  CourseName: { type: String, required: true },
  DeptID: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  Type: { type: String, enum: ["Theory", "Lab"] },
  CreditPoints: { type: Number },

  Prerequisites: { type: String },

  TotalLectures: { type: Number },
});

module.exports = mongoose.model("Course", CourseSchema);
