const Student = require("../models/student.model.js")
const User = require("../models/user.model.js")
const mongoose = require("mongoose");
const Admin = require("../models/admin.model.js")
const bcrypt = require("bcryptjs");
const Event = require("../models/events.model.js")
const Teacher = require("../models/teacher.model.js")
const Course = require("../models/course.model.js")
const Curriculum = require("../models/curriculum.model.js")
const EndSemesterResult = require("../models/endSemesterResult.model.js")
const StudentTimetable = require("../models/student_timetables.model.js")
const TeacherTimetable = require("../models/teacher_timetables.model.js")
const Department = require("../models/department.model.js")
// @desc Add Student 
// route api/admin/add-student
const addStudent = async (req, res) => {
  try {
    const {
      FirstName, LastName, Address, EnrollmentNumber, YearOfStudy, DOB, Gender, smartID,
      FatherName, MotherName, Semester, GuardianEmail, PhoneNumber, Email, program, specialization,
      deptName } = req.body;

    if (!Email || !FirstName || !LastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const curriculum = await Curriculum.findOne({ program, specialization });

    if (!curriculum)
      return res.status(400).json({ message: "Curriculum not exist exists" });
    const CurriculumID = curriculum._id
    const existingStudent = await Student.findOne({ Email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const department = await Department.findOne({ deptName });
    if (!department) {
      return res.status(400).json({ message: "Invalid department: department does not exist" });
    }
    const DeptID = department._id
    let user = await User.findOne({ email: Email });

    if (!user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("banasthali", saltRounds);
      user = new User({
        Email,
        Role: "Student",
        Password: hashedPassword,
        smartID
      });

      await user.save();
    }

    const newStudent = new Student({
      UserID: user._id, Semester, smartID, Address,
      FirstName, LastName, EnrollmentNumber, DeptID, YearOfStudy, DOB, Gender,
      FatherName, MotherName, GuardianEmail, PhoneNumber, Email,
      CurriculumID, DeptID
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully!", student: newStudent });

  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// @desc Update Student
// @route PATCH /api/admin/update-student/:smartID
const updateStudent = async (req, res) => {
  try {
    const smartID = req.params.smartID;  // Change this
    const updates = req.body;

    const student = await Student.findOne({ smartID });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    Object.assign(student, updates);
    await student.save();



    res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


// @desc Delete Student
// @route DELETE /api/admin/delete-student/:smartID
const deleteStudent = async (req, res) => {
  try {
    const smartID = req.params.smartID;  // Change this
    const student = await Student.findOne({ smartID });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const id = student._id;
    await Student.findByIdAndDelete(id);
    await User.findOneAndDelete({ Email: student.Email });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


// @desc Add Teacher 
// route api/admin/add-teacher

const addTeacher = async (req, res) => {
  try {
    const {
      FirstName, LastName, PhoneNumber, Email, deptName, Designation, Specialization,
      DOB, Gender, EmploymentType, Qualification, ExperienceYears, CoursesTaught
    } = req.body;

    if (!Email || !FirstName || !LastName) {
      return res.status(400).json({ message: "Missing required fields: Email, FirstName, or LastName" });
    }

    const department = await Department.findOne({ deptName });
    if (!department) {
      return res.status(400).json({ message: "Invalid department: department does not exist" });
    }


    const DeptID = department._id;
    const existingTeacher = await Teacher.findOne({ Email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    let user = await User.findOne({ Email });
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

    // ✅ Ensure CoursesTaught is formatted correctly
    let formattedCoursesTaught = [];
    if (Array.isArray(CoursesTaught)) {
      formattedCoursesTaught = CoursesTaught.map(course => ({
        course: new mongoose.Types.ObjectId(course.course),
        curriculum: new mongoose.Types.ObjectId(course.curriculum)
      }));
    }

    const newTeacher = new Teacher({
      UserID: user._id,
      FirstName, LastName, PhoneNumber, Email, DeptID, Designation, Specialization,
      DOB, Gender, EmploymentType, ExperienceYears, Qualification,
      CoursesTaught: formattedCoursesTaught,  // ✅ Correctly formatted array
    });

    await newTeacher.save();
    res.status(201).json({ message: "Teacher added successfully!", teacher: newTeacher });

  } catch (err) {
    console.error("Error adding teacher:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};



// @desc delete Course 
// route api/admin/delete-course/:CourseCode/:CourseName
const addCourse = async (req, res) => {
  try {
    const { deptName, CourseName, CreditPoints, CourseCode
      , Programs, Prerequisites, TotalLectures, Type
    } = req.body
    // console.log(req.body)
    const isExist = await Course.findOne({ CourseCode });
    if (isExist)
      return res.status(404).json({ message: "Course Already Exist" });
    const department = await Department.findOne({ deptName })
    if (!department)
      return res.status(404).json({ message: "Department Not Exist" });
    const DeptID = department._id;
    const newCourse = new Course({
      DeptID, CourseCode, CourseName, CreditPoints
      , Programs, Prerequisites, TotalLectures, Type
    })
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
// @desc Add Course 
// route api/admin/delete-course/:CourseCode/:CourseName
const deleteCourse = async (req, res) => {
  try {
    const { CourseCode, CourseName } = req.params;

    const deletedCourse = await Course.findOneAndDelete({ CourseCode, CourseName });
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Course", error: error.message });
  }
};



// @desc update Course 
// route patch api/admin/update-course/:CourseCode/:CourseName
const updateCourse = async (req, res) => {
  try {
    const { CourseCode, CourseName } = req.params;
    const updateData = req.body;

    const updatedCourse = await Course.findOneAndUpdate({ CourseCode, CourseName }, updateData, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "COurse updated successfully", updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
}

// @desc Add Curriculum 
// route api/admin/add-curriculum

const addCurriculum = async (req, res) => {
  try {
    const { semesters, deptId, program, specialization } = req.body;
    const newCurriculum = new Curriculum({ semesters, deptId, program, specialization })
    await newCurriculum.save();
    res.status(201).json({ message: "Curriculum added successfully", curriculum: newCurriculum });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// @desc Add End Semester Result of the student by the smart ID 
// route api/admin/addEndSemResBySmartId

const addEndSemResultBySmartID = async (req, res) => {
  try {
    const { CourseCode, CourseName, program, specialization, Semester, StudentSmartID } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }
    const pdfPath = req.file.path;
    // console.log(pdfPath); 
    const curriculum = await Curriculum.findOne({ program, specialization });
    if (!curriculum)
      return res.status(404).json({ message: "Curriculum not found" });
    const CurriculumID = curriculum._id;
    const student = await Student.findOne({ smartID: StudentSmartID })
    if (!student)
      return res.status(404).json({ message: "Student not found" });
    // console.log(student)
    const StudentID = student._id;

    const result = new EndSemesterResult({
      CurriculumID,
      ResultPDF: pdfPath,
      StudentID,
      StudentSmartID,
      IssuedDate: new Date(),
      Remarks: "Upload",
      Semester: Semester,

    })
    await result.save();
    res.status(201).json({ message: "Result  added successfully", result });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// @desc Add Events
// route  POST api/admin/addEvents
const addEvents = async (req, res) => {
  try {
    const { adminId, title, description, startDate, endDate, roles } = req.body;

    // Validate required fields
    if (!adminId || !title || !description || !startDate || !endDate || !roles) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate roles array
    if (!Array.isArray(roles) || roles.length === 0) {
      return res.status(400).json({ message: "Roles must be a non-empty array" });
    }

    // Ensure all roles are valid
    const validRoles = ["Admin", "Student", "Teacher", "ALL"];
    for (const role of roles) {
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: `Invalid role: ${role}` });
      }
    }

    // Create a new event
    const newEvent = new Event({
      adminId,
      title,
      description,
      startDate,
      endDate,
      roles,
    });

    // Save the event to the database
    await newEvent.save();

    // Return the created event
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// @desc Add Timetable by curriculum Id and the Semester
// route  PUT api/admin/addStudentTimeTable
const addStudentTimeTable = async (req, res) => {
  try {
    const { program, specialization, semester } = req.body;

    if (!req.file) return res.status(400).json({ message: "PDF file is required" });
    const pdfPath = req.file.path;
    if (!semester) return res.status(400).json({ message: "Semester is required" });

    const curriculum = await Curriculum.findOne({ program, specialization });
    if (!curriculum) return res.status(404).json({ message: "Curriculum not found" });

    const curriculumID = curriculum._id;

    // Check if timetable exists for the given curriculum & semester
    let timetable = await StudentTimetable.findOne({ curriculumID, semester });

    if (timetable) {
      // Update existing timetable
      timetable.pdfURL = pdfPath;
      await timetable.save();
      return res.status(200).json({ message: "Timetable updated successfully", timetable });
    } else {
      // Create a new timetable
      timetable = new StudentTimetable({ curriculumID, semester, pdfURL: pdfPath });
      await timetable.save();
      return res.status(201).json({ message: "Timetable added successfully", timetable });
    }
  } catch (err) {
    console.error("Error adding/updating timetable:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// @desc Add Timetable by curriculum Id and the Semester
// route  PUT api/admin/addTeacherTimeTable
const addTeacherTimeTable = async (req, res) => {
  try {
    const { teacherEmail } = req.body;

    if (!req.file) return res.status(400).json({ message: "PDF file is required" });
    const pdfPath = req.file.path;

    const teacher = await Teacher.findOne({ Email: teacherEmail });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const teacherID = teacher._id;

    // Check if a timetable already exists for the teacher
    let timetable = await TeacherTimetable.findOne({ teacherID });

    if (timetable) {
      // Update existing timetable
      timetable.pdfURL = pdfPath;
      await timetable.save();
      return res.status(200).json({ message: "Timetable updated successfully", timetable });
    } else {
      // Create a new timetable
      timetable = new TeacherTimetable({ teacherID, pdfURL: pdfPath });
      await timetable.save();
      return res.status(201).json({ message: "Timetable added successfully", timetable });
    }
  } catch (err) {
    console.error("Error adding/updating timetable:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// @desc Update Teacher by Email
// @route PATCH /api/admin/update-teacher/:email
const updateTeacherByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const updatedTeacher = await Teacher.findOneAndUpdate({ Email: email }, updateData, { new: true });
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher updated successfully", updatedTeacher });
  } catch (error) {
    res.status(500).json({ message: "Error updating teacher", error: error.message });
  }
};

// @desc Delete Teacher by Email
// @route DELETE /api/admin/delete-teacher/:email
const deleteTeacherByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const deletedTeacher = await Teacher.findOneAndDelete({ Email: email });
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting teacher", error: error.message });
  }
};

const addCourseToTeacher = async (req, res) => {
  try {
    const { teacherEmail, courseCode, courseName, program, specialization } = req.body;
    // console.log(req.body)

    const teacher = await Teacher.findOne({ Email: teacherEmail });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // ✅ Find Course ID using courseCode
    const course = await Course.findOne({ CourseCode: courseCode, CourseName: courseName });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Find Curriculum ID using program & specialization
    const curriculum = await Curriculum.findOne({ program, specialization });
    console.log(program, specialization)
    if (!curriculum) {
      return res.status(404).json({ message: "Curriculum not found" });
    }

    // ✅ Check if course already assigned to teacher
    const isAlreadyAssigned = teacher.CoursesTaught.some(
      (taught) => taught.course.equals(course._id) && taught.curriculum.equals(curriculum._id)
    );

    if (!isAlreadyAssigned) {
      teacher.CoursesTaught.push({ course: course._id, curriculum: curriculum._id });

      //  console.log(teacher)
      await teacher.save();
    }
    res.status(200).json({ message: "Course assigned to teacher successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getTeacherCoursesByEmail = async (req, res) => {
  // console.log(req.params);
  try {
    const { teacherEmail } = req.params;
    // console.log(teacherEmail);

    const teacher = await Teacher.findOne({ Email: teacherEmail }).populate({
      path: "CoursesTaught.course",
      select: "CourseName CourseCode",
    }).populate({
      path: "CoursesTaught.curriculum",
      select: "program specialization",
    });
    console.log(teacher.CoursesTaught);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json(teacher.CoursesTaught);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

const deleteTeacherCourseByEmailandCourseTaught = async (req, res) => {
  try {
    const { teacherEmail, courseId } = req.params;

    const teacher = await Teacher.findOne({ Email: teacherEmail });
    // console.log(courseId)
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    teacher.CoursesTaught = teacher.CoursesTaught.filter(
      (c) => c._id.toString() !== courseId
    );
    // console.log(teacher.CoursesTaught)
    await teacher.save();

    res.status(200).json({ message: "Course removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

const getAdminProfilebyEmail = async (req, res) => {
  try {
    const Email = req.params.Email
    if (!Email)
      return res.status(404).json({ message: "Please Provide Email" })
    const admin = await Admin.findOne({ Email });
    if (!admin)
      return res.status(404).json({ message: "Admin doesm't exist" });
    const updatedAdmin = {
      Name: admin.Name || "",
      Address: admin.Address || "",
      DOB: admin.DOB || "",
      Gender: admin.Gender || "",
      PhoneNumber: admin.PhoneNumber || "",
      Email: admin.Email || "",
      WorkExperience: admin.WorkExperience || "",
      ProfilePic: admin.ProfilePic || ""
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }

}


//@desc update admin by id
//@route PATCH /api/admin/updateProfile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure this matches the field name in your JWT payload
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profilePicturePath = req.file.path; // Path to the uploaded file

    const admin = await Admin.findOneAndUpdate(
      { UserID: userId }, // Query to find the student
      { ProfilePic: profilePicturePath }, // Update the profile picture field
      { new: true } // Return the updated document
    );

    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }

    // Respond with the updated admin profile
    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: admin.ProfilePic,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const addAdmin = async (req, res) => {
  try {
    const {
     Name, Address, DOB, Gender, PhoneNumber, Email,WorkExperience,
      deptName } = req.body;

    if (!Email || !Name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
 
    const existingAdmin = await Admin.findOne({ Email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const department = await Department.findOne({ deptName });
    if (!department) {
      return res.status(400).json({ message: "Invalid department: department does not exist" });
    }
    const DeptID = department._id
    let user = await User.findOne({ email: Email });

    if (!user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("banasthali", saltRounds);
      user = new User({
        Email,
        Role: "Admin",
        Password: hashedPassword,
      });

      await user.save();
    }

    const newAdmin = new Admin({
      UserID: user._id, Address,
      Name, DeptID, DOB, Gender,
      WorkExperience,
      PhoneNumber, Email, DeptID
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin added successfully!", Admin: newAdmin });

  } catch (err) {
    console.error("Error adding Admin:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const addSemesterResult = async (req, res) => {
  try {
    const { StudentSmartID, Semester } = req.body;
    const resultPDF = req.file ? req.file.path : null; 

    let existingResult = await EndSemesterResult.findOne({ StudentSmartID });

    if (!existingResult) {
      existingResult = new EndSemesterResult({
        StudentSmartID,
        Semester,
        ResultPDF: resultPDF,
        IssuedDate: new Date()
      });
    } else {
      existingResult.ResultPDF = resultPDF || existingResult.ResultPDF;
      existingResult.Semester = Semester || existingResult.Semester;
      existingResult.IssuedDate = new Date();
    }

    await existingResult.save();

    res.status(201).json({
      message: "Result added successfully",
      result: existingResult,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding result", error: error.message });
  }
};

module.exports = {addSemesterResult,addAdmin, updateProfile,getAdminProfilebyEmail, updateCourse, deleteCourse, deleteTeacherCourseByEmailandCourseTaught, getTeacherCoursesByEmail, addCourseToTeacher, deleteTeacherByEmail, updateTeacherByEmail, deleteStudent, updateStudent, addTeacherTimeTable, addEvents, addStudentTimeTable, addEndSemResultBySmartID, addStudent, addTeacher, addCourse, addCurriculum } 