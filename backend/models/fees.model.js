const mongoose = require("mongoose");

const FeesSchema = new mongoose.Schema({
  FeesID: { type: String, required: true, unique: true },
  StudentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  Amount: { type: Number, required: true },
  Status: { type: String, enum: ["Paid", "Pending"] },
});

module.exports = mongoose.model("Fees", FeesSchema);
