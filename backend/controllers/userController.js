const Course = require("../models/course.model.js")
const Student = require("../models/student.model.js")
const Curriculum = require("../models/curriculum.model.js")
const Attendance = require("../models/attendance.model.js")
const Teacher = require("../models/teacher.model.js")
const User = require("../models/user.model.js")
const EndSemesterResult = require("../models/endSemesterResult.model.js")
//@desc Get course  bycourse id
//@route GET /api/users/course/:CourseCode/:CourseName

const getCourseByNameandCode = async (req, res) => {
    try {
        const {CourseCode,CourseName} = req.params;
      
        const course = await Course.findOne({CourseCode,CourseName});
        if (!course)
            return res.status(400).json({ message: "Course doesn't exist" })
        const updatedCourse= {
            CourseCode:course.CourseCode || "",
            CourseName : course.CourseName || "",
            CreditPoints:course.CreditPoints|| "",
            Type:course.Type|| "",
            Prerequisites:course.Prerequisites|| "",
            TotalLectures:course.TotalLectures|| ""

        }
        res.status(200).json(updatedCourse);
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

//@desc Get all the courses of the particular Curriculum  ---> Example Get all  the courses of MCA according to their current Semester
//@route GET /api/users/getAllCoursesByCurriculumId
const getAllCoursesByCurriculumID = async (req, res) => {
    try {
        const { curriculumId, semester } = req.query;
        const curriculum = await Curriculum.findById(curriculumId).populate("semesters.courses")
        //  console.log(curriculumId)
        if (!curriculum) {
            return res.status(404).json({ message: "Curriculum not found" });
        }
        // console.log(curriculum.semesters)
        const semestersDetail = curriculum.semesters.find(sem => sem.semester === parseInt(semester))

        res.status(200).json(semestersDetail.courses);
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

//@desc Get end semester result for student by studentID
//@route GET /api/users/getEndSemRes
const getSemesterResultByStudentId = async (req, res) => {
    try {
        const { smartCardId } = req.query;
        const student = await Student.findOne({ smartID: smartCardId });
        if (!student)
            return res.status(404).json({ message: "Student doesn't exist" })
        const studentId = student._id;
        // console.log(studentId)
        // const result = await EndSemesterResult.findOne({ StudentID: studentId })
        const result = await EndSemesterResult.findOne({ StudentSmartID: smartCardId })
        // console.log(result);
        if (!result)
            return res.status(404).json({ message: "Result doesn't exist" })

        res.status(200).json(result);
    }
    catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}


//@desc Get Student by smartid 
//@route GET /api/users/student/:smartID
const getStudentsBySmartID = async (req, res) => {
    try {
        const smartID = req.query.smartID;

        if (!smartID) {
            return res.status(400).json({ message: "Smart ID is required" });
        }

        const student = await Student.findOne({ smartID });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const updatedStudent = {
            FirstName: student.FirstName || "",
            LastName: student.LastName || "",
            Address: student.Address || "",
            EnrollmentNumber: student.EnrollmentNumber || "",
            YearOfStudy: student.YearOfStudy || "",
            DOB: student.DOB || "",
            Gender: student.Gender || "",
            smartID: student.smartID || "",
            FatherName: student.FatherName || "",
            MotherName: student.MotherName || "",
            Semester: student.Semester || "",
            GuardianEmail: student.GuardianEmail || "",
            PhoneNumber: student.PhoneNumber || "",
            Email: student.Email || "",
            HostelName: student.HostelName || "",
            Scholarship: student.Scholarship || "",
        };
        res.status(200).json(updatedStudent);
    } catch (err) {
        console.error("Error fetching student:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//@desc Get Teacher by email
//@route GET /api/users/getteacher/:email
const getTeacherByEmail = async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const teacher = await Teacher.findOne({ Email: email })
            .populate({
                path: "CoursesTaught.course",
                model: "Course",  // Ensure you specify the correct model
                select: "CourseCode CourseName",
            })
            .populate({
                path: "CoursesTaught.curriculum",
                model: "Curriculum",
                select: "program specialization",
            });

        //   console.log(teacher.CoursesTaught);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        // Formatting response
        const updatedTeacher = {
            FirstName: teacher.FirstName || "",
            LastName: teacher.LastName || "",
            Address: teacher.Address || "",
            DOB: teacher.DOB || "",
            Gender: teacher.Gender || "",
            PhoneNumber: teacher.PhoneNumber || "",
            Email: teacher.Email || "",
            Designation: teacher.Designation || "",
            Specialization: teacher.Specialization || "",
            EmploymentType: teacher.EmploymentType || "",
            Qualification: teacher.Qualification || "",
            ExperienceYears: teacher.ExperienceYears || 0,
            SalaryStatus: teacher.SalaryStatus || "",
            CoursesTaught: teacher.CoursesTaught.map((course) => ({
                CourseCode: course.course?.CourseCode || "",
                CourseName: course.course?.CourseName || "",
                Program: course.curriculum?.program || "",
                Specialization: course.curriculum?.specialization || "",
            })),
        };

        res.status(200).json(updatedTeacher);
    } catch (err) {
        console.error("Error fetching teacher:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getTeacherByEmail, getStudentsBySmartID, getSemesterResultByStudentId, getAllCoursesByCurriculumID, getAttendance, getStudentAttendanceOfParticularCourse, getCourseByNameandCode, getStudentsByCurriculum, getStudentByCourse }