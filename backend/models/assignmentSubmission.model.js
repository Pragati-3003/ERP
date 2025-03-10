const mongoose = require("mongoose");

const AssignmentSubmissionSchema = new mongoose.Schema({
  AssignmentID: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
  StudentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  SubmissionDate: { type: Date },
  SubmissionPDF:{type :String ,required:true},
  Status: { type: String, enum: ["Submitted", "Pending"] },
  Remarks: { type: String },
  Grades: { type: String },
});

module.exports = mongoose.model("AssignmentSubmission", AssignmentSubmissionSchema);
