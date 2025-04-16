import React, { useEffect, useState } from "react";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const adminId = localStorage.getItem("UserID");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    roles: [],
  });

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/events", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle roles selection change
  const handleRolesChange = (e) => {
    const selectedRoles = [...e.target.options]
      .filter((opt) => opt.selected)
      .map((opt) => opt.value);
    setFormData({ ...formData, roles: selectedRoles });
  };

  // Handle form submission (Create or Update event)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form:", formData);

    try {
      const token = localStorage.getItem("token");

      let url = selectedEvent
        ? `http://localhost:5000/api/events/update/${selectedEvent._id}`
        : "http://localhost:5000/api/events/add";
      let method = selectedEvent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSelectedEvent(null);
      setFormData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        roles: [],
      });

      fetchEvents();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong. Please check console for details.");
    }
  };

  // Handle event edit
  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({ ...event });
  };

  // Handle form cancel (reset form)
  const handleCancel = () => {
    setSelectedEvent(null);
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      roles: [],
    });
  };

  // Handle event delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/events/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ adminId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-extrabold text-center mb-10 text-white">
        Event Management
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#0f172a] p-6 rounded-lg w-full max-w-3xl mx-auto text-white space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="title">
              Title
            </label>
            <input
              name="title"
              placeholder="Enter title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-300 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-300 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="startDate">
              Start Date
            </label>
            <input
              name="startDate"
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-300 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="endDate">
              End Date
            </label>
            <input
              name="endDate"
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold" htmlFor="roles">
              Select Roles
            </label>
            <select
              name="roles"
              multiple
              id="roles"
              value={formData.roles}
              onChange={handleRolesChange}
              required
              className="w-full p-2 rounded border border-gray-300 text-white h-32"
            >
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="ALL">ALL</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={
              !formData.title ||
              !formData.description ||
              !formData.startDate ||
              formData.roles.length === 0
            }
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold disabled:opacity-50"
          >
            {selectedEvent ? "Update" : "Create"} Event
          </button>

          {selectedEvent && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-bold text-white mt-10 mb-4 text-center">
        All Events
      </h3>
      <ul className="max-w-3xl mx-auto space-y-4 text-white">
        {events.map((event) => (
          <li key={event._id} className="border p-4 rounded bg-gray-800">
            <strong className="text-lg">{event.title}</strong>{" "}
            <span className="text-sm text-gray-300">
              ({event.roles.join(", ")})
            </span>
            <p className="mt-2">{event.description}</p>
            <p className="text-sm mt-1">
              Start: {new Date(event.startDate).toLocaleDateString()} <br />
              End:{" "}
              {event.endDate
                ? new Date(event.endDate).toLocaleDateString()
                : "N/A"}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(event)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminEvents;
