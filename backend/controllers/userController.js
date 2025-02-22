const Course = require("../models/course.model.js")
const Student = require("../models/student.model.js")
const Curriculum = require("../models/curriculum.model.js")
const Attendance = require("../models/attendance.model.js")
//@desc Get course  bycourse id
//@route GET /api/users/course/:courseId

const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        if (!courseId)
            return res.status(400).json({ message: "Course Id is required" })
        const course = await Course.findById(courseId);
        if (!course)
            return res.status(400).json({ message: "Course doesn't exist" })
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
//@desc Get Student by Curriculum /program like MCA /BCA
//@route GET /api/users/Curriculum/:curriculumId
const getStudentsByCurriculum = async (req, res) => {
    try {
        const curriculumId = req.params.curriculumId;
        if (!curriculumId)
            return res.status(400).json({ message: "Curriculum Id is required" })
        const students = await Student.find({ CurriculumID: curriculumId }).populate("CourseID");
        if (!students)
            return res.status(400).json({ message: "Students doesn't exist" })
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}


//@desc Get Student by course id  like DAA , TOC
//@route GET /api/users/students/course/:courseId
const getStudentByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { program } = req.query;

        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        if (!program) {
            return res.status(400).json({ message: "Program name is required (e.g., MCA)" });
        }

        // Step 1: Find curriculums that contain the given course ID
        const curriculums = await Curriculum.findOne({
            "semesters.courses": courseId,
            "program": program
        });

        if (!curriculums) {
            return res.status(404).json({ message: "No curriculum found for this course in the specified program" });
        }
        //  console.log(curriculums);

        // Step 2: Find students enrolled in these curriculums
        const students = await Student.find({ CurriculumID: curriculums._id })
            .populate("UserID", "FirstName LastName Email") // Populate student details
            .populate("CurriculumID", "ProgramName Semester"); // Populate curriculum details

        if (!students.length) {
            return res.status(404).json({ message: "No students found for this course in the specified program" });
        }

        res.status(200).json({ students });

    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

//@desc Get attendance of student of particular course
//@route GET /api/users/getattendance
const getStudentAttendanceOfParticularCourse = async (req, res) => {
    try {
        const { studentId, teacherId, courseId } = req.body;
        const totalClassesConducted = await Attendance.countDocuments({
            TeacherID: teacherId,
            CourseID: courseId
        });
        //    console.log(totalClassesConducted);

        const totalClassesAttended = await Attendance.countDocuments({
            StudentID: studentId,
            CourseID: courseId,
            Status: "Present"
        });

        res.status(200).json({
            studentId,
            teacherId,
            courseId,
            totalClassesConducted,
            totalClassesAttended
        });
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

module.exports = { getStudentAttendanceOfParticularCourse, getCourseById, getStudentsByCurriculum, getStudentByCourse }