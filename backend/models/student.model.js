const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  EnrollmentNumber: { type: String },
  smartID: { type: String, required: true },
  YearOfStudy: { type: String },
  Semester: { type: Number },
  RollNo: { type: String },
  CurriculumID: { type: mongoose.Schema.Types.ObjectId, ref: "Curriculum" },
  CourseFees: { type: Number },
  DOB: { type: Date },
  Gender: { type: String, enum: ["Male", "Female", "Other"] },
  FatherName: { type: String },
  MotherName: { type: String },
  Address: { type: String },
  HostelName: { type: String },
  GuardianEmail: { type: String },
  FirstName: { type: String },
  LastName: { type: String },
  PhoneNumber: { type: String },
  Scholarship: { type: String },
  AttendanceStatus: { type: String },
  ProfilePic: { type: String },
  Email: { type: String },
  DeptID: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
});

module.exports = mongoose.model("Student", StudentSchema);
