import React, { useState, useEffect } from "react";

const AttendancePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
  // Mock data for classes
  const classes = [
    {
      id: 1,
      program: "MCA",
      subject: "Java Programming",
      teacher: "Kuldeep Sir",
      time: "10:00 PM",
      date: "2025-01-22",
      students: [
        { id: 101, name: "John Doe", present: false },
        { id: 102, name: "Jane Smith", present: false },
        { id: 103, name: "Alice Johnson", present: false },
      ],
    },
    {
      id: 2,
      program: "BCA",
      subject: "Data Structures",
      teacher: "Kuldeep Sir",
      time: "10:00 PM",
      date: "2025-01-22",
      students: [
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
        { id: 201, name: "Bob Brown", present: false },
        { id: 202, name: "Charlie White", present: false },
        { id: 203, name: "David Green", present: false },
      ],
    },
    {
        id:3,
        program: "MCA",
        subject: "Java Programming",
        teacher: "Kuldeep Sir",
        time: "10:00 PM",
        date: "2025-01-22",
        students: [
          { id: 101, name: "John Doe", present: false },
          { id: 102, name: "Jane Smith", present: false },
          { id: 103, name: "Alice Johnson", present: false },
        ],
      },
      {
        id:4,
        program: "MCA",
        subject: "Java Programming",
        teacher: "Kuldeep Sir",
        time: "10:00 PM",
        date: "2025-01-22",
        students: [
          { id: 101, name: "John Doe", present: false },
          { id: 102, name: "Jane Smith", present: false },
          { id: 103, name: "Alice Johnson", present: false },
        ],
      },
      {
        id:5,
        program: "MCA",
        subject: "Java Programming",
        teacher: "Kuldeep Sir",
        time: "10:00 PM",
        date: "2025-01-22",
        students: [
          { id: 101, name: "John Doe", present: false },
          { id: 102, name: "Jane Smith", present: false },
          { id: 103, name: "Alice Johnson", present: false },
        ],
      },
      {
        id:6,
        program: "MCA",
        subject: "Java Programming",
        teacher: "Kuldeep Sir",
        time: "10:00 PM",
        date: "2025-01-22",
        students: [
          { id: 101, name: "John Doe", present: false },
          { id: 102, name: "Jane Smith", present: false },
          { id: 103, name: "Alice Johnson", present: false },
        ],
      },
      {
        id:7,
        program: "MCA",
        subject: "Java Programming",
        teacher: "Kuldeep Sir",
        time: "10:00 PM",
        date: "2025-01-22",
        students: [
          { id: 101, name: "John Doe", present: false },
          { id: 102, name: "Jane Smith", present: false },
          { id: 103, name: "Alice Johnson", present: false },
        ],
      },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Convert time string to a Date object
  const parseTime = (timeString) => {
    const [hours, minutes, period] = timeString.match(/(\d+):(\d+) (AM|PM)/i).slice(1);
    const hours24 = period.toUpperCase() === "PM" && hours !== "12" ? +hours + 12 : +hours;
    const date = new Date();
    date.setHours(hours24, minutes);
    return date;
  };

  // Filter classes based on the current time
  const visibleClasses = classes.filter(
    (cls) =>
      cls.date === currentTime.toISOString().split("T")[0] &&
      parseTime(cls.time) <= currentTime
  );

  // Handle attendance toggle
  const toggleAttendance = (studentId) => {
    setSelectedClass((prevClass) => ({
      ...prevClass,
      students: prevClass.students.map((student) =>
        student.id === studentId
          ? { ...student, present: !student.present }
          : student
      ),
    }));
  };

  // Mark all students as present
  const markAllPresent = () => {
    setSelectedClass((prevClass) => ({
      ...prevClass,
      students: prevClass.students.map((student) => ({
        ...student,
        present: true,
      })),
    }));
  };

  // Submit attendance
  const handleSubmit = () => {
    console.log("Submitted Attendance:", selectedClass);
    alert("Attendance submitted successfully!");
    setAttendanceSubmitted(true);
  };
  const handleEdit = () => {
    setAttendanceSubmitted(false);
  };
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Attendance Page</h1>
      <p className="text-lg text-gray-600 mb-4">
        Current Time: {currentTime.toLocaleTimeString()}
      </p>

      {/* Class List */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {visibleClasses.length > 0 ? (
        visibleClasses.map((cls) => (
          <div
            key={cls.id}
            className="bg-white  shadow-md rounded-lg p-6 mb-6 border-l-4 border-blue-600"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {cls.program} - {cls.subject}
            </h2>
            <p className="text-sm text-gray-600">
              <strong>Teacher:</strong> {cls.teacher}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Time:</strong> {cls.time}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
              onClick={() => setSelectedClass(cls)}
            >
              Take Attendance
            </button>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-500">No classes available at this time.</p>
      )}
    </div>

      {/* Attendance Form */}
      {selectedClass && (
        <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-green-600 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Attendance for {selectedClass.program} - {selectedClass.subject}
          </h2>

          {/* "Mark All Present" Button */}
          {!attendanceSubmitted && (
            <button
              className="bg-green-500 text-white px-4 py-2 mb-4 rounded-md shadow hover:bg-green-600"
              onClick={markAllPresent}
            >
              Mark All Present
            </button>
          )}

          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                  Student ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                  Present
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedClass.students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="py-3 px-4">{student.id}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={student.present}
                      onChange={() => toggleAttendance(student.id)}
                      disabled={attendanceSubmitted}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Submit or Edit Buttons */}
          {!attendanceSubmitted ? (
            <button
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit Attendance
            </button>
          ) : (
            <button
              className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-md shadow hover:bg-yellow-600"
              onClick={handleEdit}
            >
              Edit Attendance
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
