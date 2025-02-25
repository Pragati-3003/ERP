const Student = require("../models/student.model.js")
const User = require("../models/user.model.js")
const bcrypt = require("bcryptjs");
const Teacher = require("../models/teacher.model.js")
const Course = require("../models/course.model.js")
const Curriculum = require("../models/curriculum.model.js")
// @desc Add Student 
// route api/admin/add-student
const addStudent = async (req, res) => {
  try {
    const {
      FirstName, LastName, EnrollmentNumber, DeptID, YearOfStudy, DOB, Gender,
      FatherName, MotherName,Semester, GuardianEmail, PhoneNumber, Email, CurriculumID
    } = req.body;

    if (!Email || !FirstName || !LastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingStudent = await Student.findOne({ Email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const curriculum = await Curriculum.findById(CurriculumID);
    if (!curriculum) {
      return res.status(400).json({ message: "Invalid CurriculumID: Curriculum does not exist" });
    }
    let user = await User.findOne({ email: Email });

    if (!user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("banasthali", saltRounds);
      user = new User({
        Email,
        Role: "Student",
        Password: hashedPassword,
      });

      await user.save();
    }

    const newStudent = new Student({
      UserID: user._id,Semester,
      FirstName, LastName, EnrollmentNumber, DeptID, YearOfStudy, DOB, Gender,
      FatherName, MotherName, GuardianEmail, PhoneNumber, Email,
      CurriculumID: curriculum._id,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully!", student: newStudent });

  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// @desc Add Teacher 
// route api/admin/add-teacher

const addTeacher = async (req, res) => {
  try {
    const {
      FirstName, LastName, PhoneNumber, Email, DeptID, Designation, Specialization,
      DOB, Gender, EmploymentType, Qualification, ExperienceYears,CoursesTaught
    } = req.body;

    if (!Email || !FirstName || !LastName) {
      return res.status(400).json({ message: "Missing required fields: Email, FirstName, or LastName" });
    }

    const existingTeacher = await Teacher.findOne({ Email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    let user = await User.findOne({ email: Email });
    if (!user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("banasthali", saltRounds);
      user = new User({
        Email,
        Role: "Teacher",
        Password: hashedPassword,
      });
      await user.save();
    }

    const newTeacher = new Teacher({
      UserID: user._id,
      FirstName, LastName, PhoneNumber, Email, DeptID, Designation, Specialization,
      DOB, Gender, EmploymentType, ExperienceYears, Qualification,CoursesTaught
    });

    await newTeacher.save();
    res.status(201).json({ message: "Teacher added successfully!", teacher: newTeacher });

  } catch (err) {
    console.error("Error adding teacher:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


// @desc Add Course 
// route api/admin/add-course
const addCourse = async (req, res) => {
  try {
    const { DeptID, CourseName, CreditPoints, CourseCode
      , Programs, Prerequisites, Syllabus, TotalLectures,Type
    } = req.body
    const isExist = await Course.findOne({ CourseCode });
    if (isExist)
      return res.status(404).json({ message: "Course Already Exist" });
    const newCourse = new Course({
      DeptID, CourseCode, CourseName, CreditPoints
      , Programs, Prerequisites, Syllabus, TotalLectures,Type
    })
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// @desc Add Curriculum 
// route api/admin/add-curriculum

const addCurriculum = async (req, res) => {
  try {
    const { semesters, deptId,program, specialization } = req.body;
    const newCurriculum = new Curriculum({ semesters, deptId,program, specialization })
    await newCurriculum.save();
    res.status(201).json({ message: "Curriculum added successfully", curriculum: newCurriculum });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}




module.exports = { addStudent, addTeacher, addCourse, addCurriculum } 