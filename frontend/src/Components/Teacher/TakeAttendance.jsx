import React, { useState } from "react";

const studentsData = [
  { fullName: "student4 student4", smartId: "", rollNo: "", present: false },
  { fullName: "student5 abc", smartId: "", rollNo: "", present: false },
  { fullName: "Pragati Jain", smartId: "", rollNo: "", present: true },
  { fullName: "Pragati Jain", smartId: "", rollNo: "", present: true },
];

export default function AttendancePage() {
  const [students, setStudents] = useState(studentsData);

  const toggleAttendance = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].present = !updatedStudents[index].present;
    setStudents(updatedStudents);
  };

  const markAll = (present) => {
    setStudents(students.map((student) => ({ ...student, present })));
  };

  const handleSubmit = () => {
    const attendance = students.map((student) => ({
      name: student.fullName,
      present: student.present,
    }));
    console.log("Attendance Submitted:", attendance);
    alert("Attendance Submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Mark Attendance</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <select className="bg-gray-800 text-white p-2 rounded w-40">
            <option>MCA</option>
          </select>
          <select className="bg-gray-800 text-white p-2 rounded w-40">
            <option>Semester 1</option>
          </select>
          <select className="bg-gray-800 text-white p-2 rounded w-52">
            <option>Data Structures</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow">
            Fetch Students
          </button>
        </div>

        <div className="flex justify-center gap-6 mb-6">
          <button
            onClick={() => markAll(true)}
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded shadow"
          >
            Mark All Present
          </button>
          <button
            onClick={() => markAll(false)}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded shadow"
          >
            Mark All Absent
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow border border-gray-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="border border-gray-700 px-4 py-3">Full Name</th>
                <th className="border border-gray-700 px-4 py-3">Smart ID</th>
                <th className="border border-gray-700 px-4 py-3">Roll Number</th>
                <th className="border border-gray-700 px-4 py-3 text-center">Present</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={idx} className="hover:bg-gray-800">
                  <td className="border border-gray-700 px-4 py-2">
                    {student.fullName}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {student.smartId}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {student.rollNo}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={student.present}
                      onChange={() => toggleAttendance(idx)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded text-lg shadow-lg"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
