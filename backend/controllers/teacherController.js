const Attendance = require("../models/attendance.model.js");
const Assignment = require("../models/assignment.model.js");
const mongoose = require("mongoose");
const AssignmentSubmission = require("../models/assignmentSubmission.model.js");
const Course = require("../models/course.model.js");
const Curriculum = require("../models/curriculum.model.js");
const Student = require("../models/student.model.js");
const MidTermResult = require("../models/midTermExamsResult.model.js");
const Teacher = require("../models/teacher.model.js");
const Event = require("../models/events.model.js");
//@desc Mark Attendace
//@route POST /api/teacher/markAttendance
const markAttendance = async (req, res) => {
  try {
    const {
      StudentID,
      TeacherID,
      CourseID,
      CurriculumID,
      Date,
      Status,
      Remarks,
    } = req.body;
    if (
      !StudentID ||
      !TeacherID ||
      !CourseID ||
      !CurriculumID ||
      !Date ||
      !Status
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required except Remarks" });
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
  } catch (err) {
    console.error("Error fetching students:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
const getTeacherProfilebyEmail = async (req, res) => {
  try {
    const Email = req.params.Email;
    if (!Email)
      return res.status(404).json({ message: "Please Provide Email" });
    const teacher = await Teacher.findOne({ Email });
    if (!teacher)
      return res.status(404).json({ message: "Teacher doesm't exist" });
    const updatedTeacher = {
      FirstName: teacher.FirstName || "",
      LastName: teacher.LastName || "",
      Qualification: teacher.Qualification || "",
      DOB: teacher.DOB || "",
      Gender: teacher.Gender || "",
      PhoneNumber: teacher.PhoneNumber || "",
      Email: teacher.Email || "",
      ExperienceYears: teacher.ExperienceYears || "",
      ProfilePic: teacher.ProfilePic || "",
    };
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
//@desc Update Attendace
//@route POST /api/teacher/updateAttendance
const updateAttendance = async (req, res) => {
  try {
    const { StudentID, TeacherID, CourseID, Date, Status, Remarks } = req.body;
    if (!StudentID || !TeacherID || !CourseID || !Date || !Status) {
      return res
        .status(400)
        .json({ message: "All fields are required except Remarks" });
    }
    await Attendance.updateOne(
      { StudentID, TeacherID, CourseID, Date },
      { Status, Remarks }
    );
    res.status(201).json({ message: "Attendance updated successfully" });
  } catch (err) {
    console.error("Error fetching students:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

//@desc Upload Assignment
//@route POST /api/teacher/uploadAssignment

const uploadAssignment = async (req, res) => {
  try {
    const {
      teacherId,
      courseCode,
      courseName,
      program,
      semester,
      specialization,
      title,
      assignmentNumber,
      dueDate,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const pdfPath = req.file.path; // This is where multer stores the file (local path)

    const course = await Course.findOne({
      CourseName: courseName,
      CourseCode: courseCode,
    });
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
      AssignmentPDF: pdfPath, // This will satisfy the `required` condition
    });

    await newAssignment.save();

    res.status(201).json({
      message: "Assignment uploaded successfully",
      assignment: newAssignment,
    });
  } catch (err) {
    console.error("Error uploading assignment:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

//@desc Upload/Update Mid term Marks
//@route PATCH /api/teacher/uploadMidtermResult
const uploadMidtermResult = async (req, res) => {
  try {
    const {
      program,
      teacherEmail,
      specialization,
      StudentSmartID,
      Periodical1,
      Periodical2,
      Assignment1,
      Assignment2,
      Internals,
      CourseCode,
      CourseName,
      Remarks,
    } = req.body;

    // Check Curriculum
    const curriculum = await Curriculum.findOne({ program, specialization });
    if (!curriculum)
      return res.status(404).json({ message: "Curriculum not found" });

    const CurriculumID = curriculum._id;

    // Check Student
    const student = await Student.findOne({ smartID: StudentSmartID });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const StudentID = student._id;

    // Check Course
    const course = await Course.findOne({ CourseCode, CourseName });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const CourseID = course._id;

    // Check Teacher
    const teacher = await Teacher.findOne({ Email: teacherEmail });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const TeacherID = teacher._id;

    // Check if Mid Term Result already exists for that student
    let midtermresult = await MidTermResult.findOne({
      StudentID,
      CourseID,
      TeacherID,
    });

    // ✅ If result already exists, update it (without overriding other fields)
    if (midtermresult) {
      if (Periodical1 !== undefined) midtermresult.Periodical1 = Periodical1;
      if (Periodical2 !== undefined) midtermresult.Periodical2 = Periodical2;
      if (Assignment1 !== undefined) midtermresult.Assignment1 = Assignment1;
      if (Assignment2 !== undefined) midtermresult.Assignment2 = Assignment2;
      if (Internals !== undefined) midtermresult.Internals = Internals;
      if (Remarks !== undefined) midtermresult.Remarks = Remarks;
      midtermresult.IssuedDate = new Date();

      await midtermresult.save();
      return res
        .status(200)
        .json({ message: "Result updated successfully.", midtermresult });
    }

    // ✅ If no result exists, create a new one
    midtermresult = new MidTermResult({
      CurriculumID,
      CourseID,
      TeacherID,
      StudentID,
      StudentSmartID,
      Periodical1,
      Periodical2,
      Assignment1,
      Assignment2,
      Internals,
      Remarks,
      IssuedDate: new Date(),
    });

    await midtermresult.save();
    res
      .status(201)
      .json({ message: "Result uploaded successfully.", midtermresult });
  } catch (err) {
    console.error("Error uploading result:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure this matches the field name in your JWT payload
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profilePicturePath = req.file.path; // Path to the uploaded file

    const teacher = await Teacher.findOneAndUpdate(
      { UserID: userId }, // Query to find the student
      { ProfilePic: profilePicturePath }, // Update the profile picture field
      { new: true } // Return the updated document
    );

    if (!teacher) {
      return res.status(404).json({ message: "teacher not found" });
    }

    // Respond with the updated admin profile
    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: teacher.ProfilePic,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
const getTeacherCoursesByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const teacher = await Teacher.findOne({ Email: email })
      .populate("CoursesTaught.course")
      .populate("CoursesTaught.curriculum");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(teacher.CoursesTaught);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const getStudentById = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId);
    const student = await Student.findOne({ UserID: userId });
    // console.log(student);
    if (!student)
      return res.status(400).json({ message: "Student does not exist" });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getTeacherCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    // const { Email } = req.params.Email;
    const teacher = await Teacher.findOne({ UserID: userId })
      .populate({
        path: "CoursesTaught.course",
        select: "CourseName",
      })
      .populate({
        path: "CoursesTaught.curriculum",
        select: "program semesters",
        populate: {
          path: "semesters.courses",
          select: "CourseName",
        },
      });

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json({
      coursesTaught: teacher.CoursesTaught,
      CurriculumID: teacher.CoursesTaught.curriculum,
      teacherName: `${teacher.FirstName} ${teacher.LastName}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching teacher's courses" });
  }
};
const getStudentsForAttendance = async (req, res) => {
  // const { curriculumId, semester, courseId } = req.params;
  try {
    const { CurriculumId, Semester, CourseId } = req.params;

    // Fetch the curriculum to get the correct courses for the semester
    const curriculum = await Curriculum.findById(CurriculumID).populate(
      "semesters.courses"
    );

    if (!curriculum) {
      return res.status(404).json({ error: "Curriculum not found" });
    }

    // Find if the requested course exists in the given semester
    const semesterData = curriculum.semesters.find(
      (s) => s.semester === Semester
    );
    if (
      !semesterData ||
      !semesterData.courses.some((c) => c._id.toString() === CourseId)
    ) {
      return res
        .status(400)
        .json({ error: "Course not found in selected semester" });
    }

    // Fetch students whose curriculum and semester match, and who should be taking this course
    const students = await Student.find({
      CurriculumId,
      Semester,
    }).select("FirstName LastName SmartID RollNumber");

    res.json(students);
  } catch (error) {
    console.error("Error fetching students", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  uploadMidtermResult,
  markAttendance,
  updateAttendance,
  uploadAssignment,
  getTeacherProfilebyEmail,
  getTeacherCoursesByEmail,
  getTeacherCourses,
  updateProfile,
  getStudentsForAttendance,
};
