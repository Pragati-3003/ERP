const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  UserID: { type: String, required: true, unique: true },
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Role: { type: String, enum: ["Student", "Teacher", "Admin"] },
  FirstName: { type: String },
  LastName: { type: String },
  Email: { type: String, unique: true },
  PhoneNumber: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
