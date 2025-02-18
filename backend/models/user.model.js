const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Username: { type: String },
  Password: { type: String, required: true },
  Role: { type: String, required:true, enum: ["Student", "Teacher", "Admin"] },
  FirstName: { type: String },
  LastName: { type: String },
  Email: { type: String, unique: true,required: true },
  PhoneNumber: { type: String },
} 
,
{timestamps : true});

module.exports = mongoose.model("User", UserSchema);
