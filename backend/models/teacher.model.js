const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  TeacherID: { type: String, required: true, unique: true },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  DeptID: { type: Number },
  Designation: { type: String },
  Specialization: { type: String },
  CoursesTaught: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  DOB: { type: Date },
  Gender: { type: String, enum: ["Male", "Female", "Other"] },
  EmploymentType: { type: String },
  Qualification: { type: String },
  ExperienceYears: { type: Number },
  DutyPlace: { type: String },
  SalaryStatus: { type: String },
  AttendanceRecords: { type: String },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
