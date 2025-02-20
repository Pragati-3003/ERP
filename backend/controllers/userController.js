const Course = require("../models/course.model.js")

//@desc Get course  bycourse id
//@route GET /api/users/course/:courseId

const getCourseById = async (req, res) =>{
    try{
         const courseId = req.params.courseId;
         if(!courseId)
            return res.status(400).json({message : "Course Id is required"})
        const course = await Course.findById(courseId);
        if(!course)
            return res.status(400).json({message:"Course doesn't exist"})
         res.status(200).json(course);    
    }catch(err){
        res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports = {getCourseById}