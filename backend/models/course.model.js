const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  CourseCode :{type :String,required :true},
  CourseName: { type: String, required: true },
  DeptID: { type: Number },
  CreditPoints: { type: Number },
  // Semester: { type: String },
  // Programs:[{ type: String }],
  Programs: [
    {
      ProgramName: { type: String },  // Example: BCA, MCA
      Semester: { type: Number }      // Example: 1, 2, 3...
    }
  ],
  Prerequisites: { type: String },
  Syllabus: { type: String },
  TotalLectures: { type: Number },
});

module.exports = mongoose.model("Course", CourseSchema);
