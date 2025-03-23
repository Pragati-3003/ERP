const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Name: { type: String },
  Email: { type: String, unique: true },
  ProfilePic: { type: String },
  DeptID: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  DOB: { type: Date },
  Gender: { type: String, enum: ["Male", "Female", "Other"] },
  Address: { type: String },
  WorkExperience: { type: Number },
  PhoneNumber:{type :Number}
}, { timestamps: true });

module.exports = mongoose.model("Admin", AdminSchema);
