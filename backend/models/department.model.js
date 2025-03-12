const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    deptName: { type: String, required: true, unique: true }, // Department name
    hod: {
        hodId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }, // HOD's user ID
        hodName: { type: String }, // HOD's name
    },
    dean: {
        deanId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }, // Dean's user ID
        deanName: { type: String }, // Dean's name
    },
    startDate:{type:Date},
    createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("Department", DepartmentSchema);