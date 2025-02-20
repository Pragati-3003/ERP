const mongoose = require("mongoose");

const CurriculumSchema = new mongoose.Schema({
  program: { type: String, required: true}, 
  specialization:{type:String},
  deptId: { type: Number},
  semesters: [
    {
      semester: { type: Number }, 
      courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          // required: true
        }
      ]
    }
  ]
},{timestamps:true});

module.exports = mongoose.model("Curriculum", CurriculumSchema);
