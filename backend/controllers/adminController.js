const Student = require("../models/student.model.js")
const Teacher = require("../models/teacher.model.js")
const Course = require("../models/course.model.js")
const Curriculum = require("../models/curriculum.model.js")
// @desc Add Student 
// route api/admin/add-student
const addStudent = async (req, res) => {
  try {
    const { FirstName, LastName, EnrollmentNumber, DeptID, YearOfStudy, DOB, Gender, FatherName, MotherName, GuardianEmail, PhoneNumber, Email } = req.body;
    const isExist = await Student.findOne({ Email });
    if (isExist)
      return res.status(404).json({ message: "Student Already Exist" });
    const newStudent = new Student({
      FirstName, LastName, EnrollmentNumber, DeptID, YearOfStudy, DOB, Gender, FatherName, MotherName, GuardianEmail, PhoneNumber, Email
    })
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully!", student: newStudent });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


// @desc Add Teacher 
// route api/admin/add-teacher

const addTeacher = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      PhoneNumber,
      Email,
      DeptID,
      Designation,
      Specialization,
      DOB,
      Gender,
      EmploymentType,
      Qualification,
      ExperienceYears
    } = req.body;

    const isExist = await Teacher.findOne({ Email });
    if (isExist)
      return res.status(404).json({ message: "Teacher Already Exist" });
    const newTeacher = new Teacher({
      Email, FirstName, LastName, PhoneNumber, DeptID, Designation, Specialization, DOB,
      Gender, EmploymentType, ExperienceYears, Qualification
    })
    await newTeacher.save();
    res.status(201).json({ message: "Teacher added successfully!", teacher: newTeacher });

  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


// @desc Add Course 
// route api/admin/add-course
const addCourse = async (req, res) => {
  try {
    const { DeptID, CourseName, CreditPoints, CourseCode
      , Programs, Prerequisites, Syllabus, TotalLectures
    } = req.body
    const isExist = await Course.findOne({ CourseCode });
    if (isExist)
      return res.status(404).json({ message: "Course Already Exist" });
    const newCourse = new Course({
      DeptID, CourseCode, CourseName, CreditPoints
      , Programs, Prerequisites, Syllabus, TotalLectures
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

const addCurriculum = async(req,res)=>{
  try{
        const {semesters,program,specialization}=req.body;
        const newCurriculum = new Curriculum({semesters,program,specialization})
        await newCurriculum.save();
        res.status(201).json({ message: "Curriculum added successfully", curriculum: newCurriculum });
  }catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}




module.exports = { addStudent, addTeacher, addCourse ,addCurriculum} 