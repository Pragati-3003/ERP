const mongoose = require("mongoose");

const AssignmentSubmissionSchema = new mongoose.Schema({
  SubmissionID: { type: String, required: true, unique: true }, 
  AssignmentID: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
  StudentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  SubmissionDate: { type: Date },
  Status: { type: String, enum: ["Submitted", "Pending"] },
  Remarks: { type: String },
  Grades: { type: String },
});

module.exports = mongoose.model("AssignmentSubmission", AssignmentSubmissionSchema);
