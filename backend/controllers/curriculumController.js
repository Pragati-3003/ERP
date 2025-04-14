const Course = require("../models/course.model.js");
const Curriculum = require("../models/curriculum.model.js");
const Department = require("../models/department.model.js");
const getDeptName = async (req, res) => {
  try {
    const departments = await Department.find({}, "_id deptName");
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching departments" });
  }
};
const getCourseName = async (req, res) => {
  try {
    const courses = await Course.find({}, "_id CourseName");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};
module.exports = { getDeptName, getCourseName };
