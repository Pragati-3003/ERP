const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  FirstName: { type: String },
  ProfilePic: { type: String },
  LastName: { type: String },
  PhoneNumber: { type: String },
  Address: { type: String },
  Email: { type: String },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Designation: { type: String },
  Specialization: { type: String },
  CoursesTaught: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      curriculum: { type: mongoose.Schema.Types.ObjectId, ref: "Curriculum" },
    },
  ],
  DOB: { type: Date },
  Gender: { type: String, enum: ["Male", "Female", "Other"] },
  EmploymentType: { type: String },
  Qualification: { type: String },
  ExperienceYears: { type: Number },
  SalaryStatus: { type: String },
  DeptID: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
