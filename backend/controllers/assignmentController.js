const Assignment = require("../models/assignment.model.js");
const Course = require("../models/course.model.js");
const Curriculum = require("../models/curriculum.model.js");
const Teacher = require("../models/teacher.model.js");
const getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

const getTeacherCurriculums = async (req, res) => {
  try {
    const curriculums = await Curriculum.find({});
    res.status(200).json(curriculums);
  } catch (error) {
    console.error("Error fetching curriculums:", error.message);
    res.status(500).json({ message: "Failed to fetch curriculums" });
  }
};
const uploadAssignments = async (req, res) => {
  // 🔍 Debug: Log what's coming in
  console.log("📂 File received:", req.file);
  console.log("📝 Body received:", req.body);
  const userId = req.user.id;
  const pdfPath = req.file ? req.file.path : null;
  const {
    Title,
    DueDate,
    TeacherID,
    AssignmentNumber,
    CourseID,
    Semester,
    CurriculumID,
  } = req.body;

  if (
    !Title ||
    !DueDate ||
    !TeacherID ||
    !CourseID ||
    !Semester ||
    !CurriculumID ||
    !AssignmentNumber ||
    !pdfPath
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const assignment = new Assignment({
      Title,
      DueDate,
      TeacherID: userId,
      CourseID,
      Semester,
      CurriculumID,
      AssignmentNumber,
      AssignmentPDF: pdfPath,
    });

    await assignment.save();
    res.status(201).json({ message: "Assignment uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const uploadAssignments = async (req, res) => {
//   const pdfPath = req.file ? req.file.path : null;
//   const {
//     Title,
//     DueDate,
//     TeacherID,
//     AssignmentNumber,
//     CourseID,
//     Semester,
//     CurriculumID,
//   } = req.body;

//   if (
//     !Title ||
//     !DueDate ||
//     !TeacherID ||
//     !CourseID ||
//     !Semester ||
//     !CurriculumID ||
//     !AssignmentNumber ||
//     !pdfPath
//   ) {
//     return res.status(400).json({ message: "All fields are required" });
//   }
//   try {
//     const assignment = new Assignment({
//       Title,
//       DueDate,
//       TeacherID,
//       CourseID,
//       Semester,
//       CurriculumID,
//       AssignmentNumber,
//       AssignmentPDF: pdfPath,
//     });

//     await assignment.save();
//     res.status(201).json({ message: "Assignment uploaded successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const getAssignment = async (req, res) => {
  const UserID = req.user.id;

  try {
    // Step 1: Find the teacher by userID
    const teacher = await Teacher.findOne({ UserID });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Step 2: Use teacher._id to fetch assignments
    const assignments = await Assignment.find({ TeacherID: req.user.id })
      .populate("CurriculumID")
      .populate("CourseID")
      .sort({ CreatedAt: -1 });

    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const {
      Title,
      AssignmentNumber,
      DueDate,
      curriculumID,
      semester,
      courseID,
    } = req.body;

    const updateData = {
      Title,
      AssignmentNumber,
      DueDate,
      CurriculumID: curriculumID,
      Semester: semester,
      CourseID: courseID,
    };

    if (req.file) {
      updateData.AssignmentPDF = req.file.path;
    }

    const updated = await Assignment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({
      message: "Assignment updated successfully",
      assignment: updated,
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Server error while updating assignment" });
  }
};

module.exports = {
  getTeacherCourses,
  getTeacherCurriculums,
  uploadAssignments,
  deleteAssignment,
  updateAssignment,
  getAssignment,
};
