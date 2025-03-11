const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }, // Admin who created the event
  title: { type: String, required: true }, // Event title
  description: { type: String, required: true }, // Event description
  startDate: { type: Date, required: true }, // Event start date
  endDate: { type: Date }, // Event end date
  roles: {
    type: [String],
    enum: ["Admin", "Student", "Teacher", "ALL"],
    required: true
  }, // Roles allowed to access the event
  createdAt: { type: Date, default: Date.now }, // Event creation date
});

module.exports = mongoose.model("Event", EventSchema);