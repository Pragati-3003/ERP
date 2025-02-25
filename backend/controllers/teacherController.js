const Attendance = require("../models/attendance.model.js");

//@desc Mark Attendace
//@route POST /api/teacher/markAttendance
const markAttendance = async (req, res) => {
    try {
        const { StudentID, TeacherID, CourseID, CurriculumID, Date, Status, Remarks } = req.body;
        if (!StudentID || !TeacherID || !CourseID || !CurriculumID || !Date || !Status) {
            return res.status(400).json({ message: "All fields are required except Remarks" });
        }
        const attendance = new Attendance({
            StudentID,
            TeacherID,
            CourseID,
            CurriculumID,
            Date,
            Status,
            Remarks,
        });
        await attendance.save();
        res.status(201).json({ message: "Attendance marked successfully" });
    }
    catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

//@desc Update Attendace
//@route POST /api/teacher/updateAttendance
const updateAttendance = async (req, res) => {
    try {
        const { StudentID, TeacherID, CourseID, Date, Status, Remarks } = req.body;
        if (!StudentID || !TeacherID || !CourseID || !Date || !Status) {
            return res.status(400).json({ message: "All fields are required except Remarks" });
        }
        await Attendance.updateOne({StudentID,TeacherID,CourseID,Date}, {Status,Remarks});
        res.status(201).json({ message: "Attendance updated successfully" });
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}


module.exports = { markAttendance, updateAttendance }