const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    FirstName: { type: String },
  LastName: { type: String },
  PhoneNumber: { type: String },
  Email:{ type: String },
  smartID:{type:String ,required:true},
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Designation: { type: String },
  Specialization: { type: String },
  CoursesTaught: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      curriculum: { type: mongoose.Schema.Types.ObjectId, ref: "Curriculum" } // Store Curriculum ID instead of Program
    }
  ],
  DOB: { type: Date },
  Gender: { type: String, enum: ["Male", "Female", "Other"] },
  EmploymentType: { type: String },
  Qualification: { type: String },
  ExperienceYears: { type: Number },
  DutyPlace: { type: String },
  SalaryStatus: { type: String },
  AttendanceRecords: { type: String },
  DeptID: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
