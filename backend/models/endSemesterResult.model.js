const mongoose = require("mongoose");

const EndSemesterResultSchema = new mongoose.Schema({
    CurriculumID: { type: mongoose.Schema.Types.ObjectId, ref: "Curriculum" },
    StudentSmartID: { type: String, required: true },
    ResultPDF: {type:String},
    StudentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    Remarks: { type:String },
    IssuedDate: { type: Date },
    Semester: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("EndSemesterResult", EndSemesterResultSchema);
