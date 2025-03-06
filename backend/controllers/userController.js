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
            courseId,
            totalClassesConducted,
            totalClassesAttended
        });
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}


const getAttendance = async (req, res) => {
    try {
        // Extract query parameters
        const { studentId, curriculumId, semester } = req.query;

        // Find the student
        const student = await Student.findById(studentId);
        if (!student)
            return res.status(404).json({ message: "Student not found" });

        // Find the curriculum
        const curriculum = await Curriculum.findOne({ _id: curriculumId });
        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum not found" });
        }

        // Check if semesters array exists and is not empty
        if (!curriculum.semesters || curriculum.semesters.length === 0) {
            return res.status(404).json({ message: "No semesters found in curriculum" });
        }

        // Convert semester to number (if necessary)
        const semesterNumber = parseInt(semester, 10);

        // Find the current semester
        const currentSemester = curriculum.semesters.find(sem => sem.semester === semesterNumber);
        if (!currentSemester) {
            return res.status(404).json({ message: "Semester not found in curriculum" });
        }

        // Get course IDs for the current semester
        const courseIds = currentSemester.courses;

        // Fetch attendance data for each course
        const attendanceData = await Promise.all(
            courseIds.map(async (courseId) => {
                const course = await Course.findOne({ _id: courseId });
                if (!course) {
                    return null;
                }

                // Fetch attendance records for the course
                const attendanceRecords = await Attendance.find({
                    CourseID: courseId,
                });

                // Group attendance records by month
                const attendanceByMonth = attendanceRecords.reduce((acc, record) => {
                    const month = record.Date.toLocaleString("default", { month: "long" });
                    if (!acc[month]) {
                        acc[month] = {
                            totalClasses: 0,
                            attendedClasses: 0,
                        };
                    }
                    acc[month].totalClasses += 1;
                    if (record.StudentID == studentId && record.Status === "Present") {
                        acc[month].attendedClasses += 1;
                    }
                    return acc;
                }, {});

                // Format the month-wise attendance data
                const monthWiseAttendance = Object.keys(attendanceByMonth).map(
                    (month) => ({
                        month,
                        totalClasses: attendanceByMonth[month].totalClasses,
                        attendedClasses: attendanceByMonth[month].attendedClasses,
                    })
                );

                return {
                    courseName: course.CourseName,
                    courseCode: course.CourseCode,
                    monthWiseAttendance,
                };
            })
        );

        // Filter out null values
        const filteredAttendanceData = attendanceData.filter((data) => data !== null);

        // Return the attendance data
        res.status(200).json(filteredAttendanceData);

    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
module.exports = { getAttendance, getStudentAttendanceOfParticularCourse, getCourseById, getStudentsByCurriculum, getStudentByCourse }