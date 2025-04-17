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
  const pdfPath = req.file.path;
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
      TeacherID,
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
const getAssignment = async (req, res) => {
  const { UserID } = req.params;

  try {
    // Step 1: Find the teacher by userID
    const teacher = await Teacher.findOne({ UserID });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Step 2: Find all assignments for that teacher
    const assignments = await Assignment.find({ TeacherID: teacher._id })
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
    const updateData = {
      Title: req.body.Title,
      AssignmentNumber: req.body.AssignmentNumber,
      DueDate: req.body.DueDate,
      CurriculumID: req.body.curriculumID,
      Semester: req.body.semester,
      CourseID: req.body.courseID,
    };

    if (req.file) updateData.AssignmentPDF = req.file.path;

    await Assignment.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "Assignment updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
