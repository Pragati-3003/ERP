const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  AdminID: { type: String, required: true, unique: true },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Name: { type: String },
  Email: { type: String, unique: true },
});

module.exports = mongoose.model("Admin", AdminSchema);
