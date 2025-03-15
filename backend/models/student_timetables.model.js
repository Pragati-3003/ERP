const mongoose = require("mongoose");

const studentTimetableSchema = new mongoose.Schema({
    curriculumID: { type: mongoose.Schema.Types.ObjectId, ref: "Curriculum", required: true },
    semester: { type: Number, required: true },
    pdfURL: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StudentTimetable", studentTimetableSchema);
