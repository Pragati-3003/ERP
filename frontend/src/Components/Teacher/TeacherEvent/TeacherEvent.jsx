import React from 'react';

const TeacherEventsPage = () => {
  const events = [
    {
      title: 'Annual Cultural Fest',
      description: 'Join us for the annual cultural fest with music, dance, and food!',
      startDate: '2023-12-01',
      endDate: '2023-12-03',
    },
    {
      title: 'Annual Cultural Fest 1',
      description: 'Join us for the annual cultural fest with music, dance, and food!',
      startDate: '2023-12-01',
      endDate: '2023-12-03',
    },
    {
      title: 'Annual Cultural Fest 2',
      description: 'Join us for the annual cultural fest with music, dance, and food!',
      startDate: '2023-12-01',
      endDate: '2023-12-03',
    },
    {
      title: 'Annual Cultural Fest 3',
      description: 'Join us for the annual cultural fest with music, dance, and food!',
      startDate: '2023-12-04',
      endDate: '2023-12-05',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-400 text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div key={index} className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{event.title}</h2>
            <p className="mb-4 text-gray-600">{event.description}</p>
            <p><strong>Start Date:</strong> {event.startDate}</p>
            <p><strong>End Date:</strong> {event.endDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherEventsPage;
