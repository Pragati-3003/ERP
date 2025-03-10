const Attendance = require("../models/attendance.model.js");
const Assignment = require("../models/assignment.model.js");
const AssignmentSubmission = require("../models/assignmentSubmission.model.js");
const Course = require("../models/course.model.js")
const Curriculum = require("../models/curriculum.model.js")
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
        await Attendance.updateOne({ StudentID, TeacherID, CourseID, Date }, { Status, Remarks });
        res.status(201).json({ message: "Attendance updated successfully" });
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

//@desc Upload Assignment
//@route POST /api/teacher/uploadAssignment

const uploadAssignment = async (req, res) => {
    try {
        const { teacherId, courseCode, courseName, program, semester, specialization, title, assignmentNumber, dueDate } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "PDF file is required" });
        }

        const pdfPath = req.file.path;  // This is where multer stores the file (local path)

        const course = await Course.findOne({ CourseName: courseName, CourseCode: courseCode });
        if (!course) {
            return res.status(404).json({ message: "Course doesn't exist" });
        }
        const courseID = course._id;

        const curriculum = await Curriculum.findOne({ program, specialization });
        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum doesn't exist" });
        }
        const CurriculumID = curriculum._id;

        const newAssignment = new Assignment({
            Title: title,
            AssignmentNumber: assignmentNumber,
            CourseID: courseID,
            CurriculumID: CurriculumID,
            TeacherID: teacherId,
            DueDate: dueDate,
            AssignmentPDF: pdfPath  // This will satisfy the `required` condition
        });

        await newAssignment.save();

        res.status(201).json({ message: "Assignment uploaded successfully", assignment: newAssignment });

    } catch (err) {
        console.error("Error uploading assignment:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = { markAttendance, updateAttendance, uploadAssignment }