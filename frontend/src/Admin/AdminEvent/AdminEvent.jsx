import React, { useState } from 'react';

const AdminEvent = () => {
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddEvent = () => {
    if (!description.trim()) return;
    const newEvent = {
      description,
      date: new Date().toLocaleString(),
    };
    setEvents([...events, newEvent]);
    setDescription('');
    setEditIndex(null);
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const handleEditEvent = (index) => {
    setDescription(events[index].description);
    setEditIndex(index);
  };

  const handleUpdateEvent = () => {
    const updatedEvents = [...events];
    updatedEvents[editIndex].description = description;
    setEvents(updatedEvents);
    setDescription('');
    setEditIndex(null);
  };

  return (
    <div className="container mx-auto p-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-white">Admin Event Management</h1>

      <div className="mb-6">
        <textarea
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
          placeholder="Enter event description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        ></textarea>
        <button
          onClick={editIndex !== null ? handleUpdateEvent : handleAddEvent}
          className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
        >
          {editIndex !== null ? 'Update Event' : 'Generate Event'}
        </button>
      </div>

      <div className="space-y-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800 border border-gray-600 rounded-lg shadow-md flex justify-between items-start"
          >
            <div>
              <p className="text-white whitespace-pre-wrap">{event.description}</p>
              <p className="text-sm text-gray-400 mt-2">Published on: {event.date}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditEvent(index)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteEvent(index)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvent;
