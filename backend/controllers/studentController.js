const Student =require("../models/student.model.js")

//@desc Get student by id
//@route GET /api/student/:id

const getStudentById  = async(req,res)=>{
    try{
            const userId= req.user.id;
            console.log(userId);
            
            const student = await Student.findOne({ UserID: userId })
            console.log(student);
            
            if(!student)
              return res.status(400).json({ message: "Student does not exist" });
            res.status(200).json(student);
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
      }
}


module.exports = {getStudentById};