const Event = require("../models/events.model.js");
const fetchEvent = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
};
const addEvent = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { title, description, startDate, endDate, roles } = req.body;

    const event = new Event({
      title,
      description,
      startDate,
      endDate,
      roles,
      adminId,
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to create event." });
  }
};
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startDate, endDate, roles } = req.body;

    await Event.findByIdAndUpdate(id, {
      title,
      description,
      startDate,
      endDate,
      roles,
    });

    res.json({ message: "Event updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update event." });
  }
};
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body;

    // Optional: ensure only the creator admin can delete
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (adminId && event.adminId !== adminId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this event." });
    }

    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event." });
  }
};
module.exports = {
  addEvent,
  updateEvent,
  deleteEvent,
  fetchEvent,
};
