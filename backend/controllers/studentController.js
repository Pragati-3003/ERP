const Student = require("../models/student.model.js")
const Course = require("../models/course.model.js")
const Curriculum = require("../models/curriculum.model.js")
const Teacher = require("../models/teacher.model.js")
const Assignment = require("../models/assignment.model.js")
const AssignmentSubmission = require("../models/assignmentSubmission.model.js")
const MidTermResult = require("../models/midTermExamsResult.model.js")
const Event = require("../models/events.model.js")
//@desc Get student by id
//@route GET /api/student/profile

const getStudentById = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId);
    const student = await Student.findOne({ UserID: userId })
    // console.log(student);
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    res.status(200).json(student);
  }
  catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//@desc update student by id
//@route PATCH /api/student/updateProfile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure this matches the field name in your JWT payload
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profilePicturePath = req.file.path; // Path to the uploaded file

    // Find the student by UserID and update the profile picture
    const student = await Student.findOneAndUpdate(
      { UserID: userId }, // Query to find the student
      { ProfilePic: profilePicturePath }, // Update the profile picture field
      { new: true } // Return the updated document
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Respond with the updated student profile
    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: student.ProfilePic,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

//@desc Get course 
//@route GET /api/student/course
const getCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const student = await Student.findOne({ UserID: userId }).populate("CurriculumID");
    // console.log(student);
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    const { CurriculumID, Semester } = student;
    if (!CurriculumID)
      return res.status(400).json({ message: "Curriculum not assigned to the student" });
    const curriculum = await Curriculum.findById(CurriculumID).populate("semesters.courses");
    if (!curriculum)
      return res.status(400).json({ message: "Curriculum does not exist" });
    const semesterData = curriculum.semesters.find(sem => sem.semester === Semester)
    // console.log(curriculum);
    if (!semesterData)
      return res.status(400).json({ message: "No courses found for this semester" });
    res.status(200).json(semesterData.courses);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//@desc Get curriculum  
//@route GET /api/student/curriculum

const getCurriculum = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId);
    // console.log(req.user)

    const curriculum = await Student.findOne({ UserID: userId }).populate("CurriculumID");
    // console.log(curriculum);
    const details = await Curriculum.findById(curriculum.CurriculumID).populate("semesters.courses");
    console.log(details);

    // res.status(200).json(curriculum.CurriculumID);
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//@desc Get all the courses semester wise including faulty details
//@route GET /api/student/course-enrolled

const courseEnrolled = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find student's curriculum
    const student = await Student.findOne({ UserID: userId }).populate("CurriculumID");
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    const curriculumDetails = await Curriculum.findById(student.CurriculumID)
      .populate("semesters.courses");

    if (!curriculumDetails) {
      return res.status(400).json({ message: "Courses not found" });
    }

    const studentCurriculum = student.CurriculumID;
    const courseIds = curriculumDetails.semesters.flatMap(semester =>
      semester.courses.map(course => course._id)
    );

    // Fetch only teachers who teach in the student's curriculum
    const teachers = await Teacher.find({
      "CoursesTaught.course": { $in: courseIds },
      "CoursesTaught.curriculum": studentCurriculum // Filter by student's curriculum
    }).populate("CoursesTaught.course");

    // Map courses to teachers
    const courseTeacherMap = {};
    teachers.forEach(teacher => {
      teacher.CoursesTaught.forEach(courseEntry => {
        const course = courseEntry.course;
        if (!courseTeacherMap[course._id]) {
          courseTeacherMap[course._id] = [];
        }
        courseTeacherMap[course._id].push({
          Name: `${teacher.FirstName} ${teacher.LastName}`,
          Email: teacher.Email,
          Designation: teacher.Designation
        });
      });
    });

    // Structure response
    const formattedData = curriculumDetails.semesters.map(semester => ({
      semester: semester.semester,
      courses: semester.courses.map(course => ({
        CourseCode: course.CourseCode,
        CourseName: course.CourseName,
        Type: course.Type,
        CreditPoints: course.CreditPoints,
        Teacher: courseTeacherMap[course._id] || "No teacher assigned"
      }))
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    console.error("Error in courseEnrolled:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//@desc Get all assigments of the current semester subject wise/course wise
//@route GET /api/student/viewAssignments
const viewAssignments = async (req, res) => {
  try {
    const { CourseCode, CourseName, CurriculumID } = req.query;
    const studentId = req.query.StudentID; // Add StudentID to the query

    // Find the course
    const course = await Course.findOne({ CourseCode, CourseName });
    if (!course)
      return res.status(404).json({ message: "Course not found" });

    const CourseID = course._id;

    // Find all assignments for the course
    const assignments = await Assignment.find({ CourseID, CurriculumID });
    if (!assignments || assignments.length === 0)
      return res.status(404).json({ message: "Assignments not found" });

    // Fetch submission status for each assignment
    const assignmentsWithStatus = await Promise.all(
      assignments.map(async (assignment) => {
        const submission = await AssignmentSubmission.findOne({
          AssignmentID: assignment._id,
          StudentID: studentId,
        });

        return {
          ...assignment.toObject(),
          status: submission ? submission.Status : "Pending",
          grades: submission ? submission.Grades : null,
          submissionPDF: submission ? submission.SubmissionPDF : null,
        };
      })
    );

    res.status(200).json(assignmentsWithStatus);
  } catch (err) {
    console.error("Error in viewAssignments:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//@desc Post submit assignment of particular subject
//@route Post  /api/student/uploadAssignmentSubmissions
const uploadAssignmentSubmissions = async (req, res) => {
  try {
    const { AssignmentID, StudentID } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const pdfPath = req.file.path; // This is where multer stores the file (local path)

    const assignmentSubmission = new AssignmentSubmission({
      AssignmentID,
      StudentID,
      SubmissionDate: new Date(),
      Status: "Submitted",
      SubmissionPDF: pdfPath,
      Remarks: "",
      Grades: "",
    });

    await assignmentSubmission.save();

    // Return the submission details
    res.status(201).json(assignmentSubmission);
  } catch (err) {
    console.error("Error in uploadAssignmentSubmissions:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//@desc GET get mid term exam result of all the courses
//@route GET  /api/student/getMidtermResults
const getMidtermResults = async (req, res) => {
  try {
    const { StudentSmartID, CurriculumID, semester } = req.query;

    if (!StudentSmartID || !CurriculumID || !semester) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const curriculum = await Curriculum.findOne({
      _id: CurriculumID,
      "semesters.semester": semester
    }).populate("semesters.courses");

    if (!curriculum) {
      return res.status(404).json({ message: "No curriculum found for this semester." });
    }

    const currentSemester = curriculum.semesters.find(s => s.semester === Number(semester));
    if (!currentSemester || currentSemester.courses.length === 0) {
      return res.status(404).json({ message: "No courses found for this semester." });
    }

    const courseIDs = currentSemester.courses.map(course => course._id);

    const results = await MidTermResult.find({
      StudentSmartID,
      CurriculumID,
      CourseID: { $in: courseIDs }
    }).populate('CourseID').populate('TeacherID');

    if (results.length === 0) {
      return res.status(404).json({ message: "No midterm results found for this semester." });
    }

    const midtermResults = results.map(result => ({
      teacherName: result.TeacherID.FirstName + " " + result.TeacherID.LastName,
      courseCode: result.CourseID.CourseCode,
      courseName: result.CourseID.CourseName,
      periodical1: result.Periodical1,
      assignment1: result.Assignment1,
      periodical2: result.Periodical2,
      assignment2: result.Assignment2,
      internals: result.Internals,
      remarks: result.Remarks
    }));
    res.status(200).json({
      message: "Results fetched successfully.",
      midtermResults
    });

  } catch (error) {
    console.error("Error fetching midterm results:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//@desc GET get all the events
//@route GET  /api/student/getEvents
const getEvents =async(req,res)=>{
  try {
    const role  = req.user.role; 
    // Validate role
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    // Find events where the user's role is included in the roles array or the event is for ALL
    const events = await Event.find({
      $or: [
        { roles: role }, // Events specific to the user's role
        { roles: "ALL" }, // Events accessible to all roles
      ],
    }).sort({ startDate: 1 }); // Sort by start date

    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { getEvents,updateProfile, getMidtermResults, uploadAssignmentSubmissions, viewAssignments, getStudentById, getCourse, getCurriculum, courseEnrolled };