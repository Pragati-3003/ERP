const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  AdminID: { type: String, required: true, unique: true },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Name: { type: String },
  smartID:{type:String ,required:true},
  Email: { type: String, unique: true },
} ,{timestamps : true});

module.exports = mongoose.model("Admin", AdminSchema);
