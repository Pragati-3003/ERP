const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  NoticeID: { type: String, required: true, unique: true },
  Title: { type: String, required: true },
  Content: { type: String, required: true },
  Audience: { type: String, enum: ["Students", "Teachers", "All"] },
  CreatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notice", NoticeSchema);
