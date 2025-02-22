const Student = require("../models/student.model.js")
const Course = require("../models/course.model.js")
const Curriculum = require("../models/curriculum.model.js")

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
    const curriculum = await Student.findOne({ UserID: userId }).populate("CurriculumID");
    res.status(200).json(curriculum.CurriculumID);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//@desc Get  particular course by course id 
//@route GET /api/student/:courseid


module.exports = { getStudentById, getCourse, getCurriculum };