const mongoose = require("mongoose");

const MidTermResultSchema = new mongoose.Schema({
    CurriculumID: { type: mongoose.Schema.Types.ObjectId, ref: "Curriculum" },
    StudentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    TeacherID: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    CourseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    StudentSmartID: { type: String },
    Remarks: { type: String },
    IssuedDate: { type: Date },
    Periodical1: { type: Number },
    Periodical2: { type: Number },
    Assignment1: { type: Number },
    Assignment2: { type: Number },
    Internals: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model("MidTermResult", MidTermResultSchema);
