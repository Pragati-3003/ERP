import React, { useState } from 'react';

const TeacherAttendance = () => {
  const data = {
    teacher: {
      name: "Prof. Grace Hopper",
      designation: "Associate Professor",
      session: "Even Semester (Jan-Apr 2025)",
    },
    subjects: [
      {
        subjectName: "Data Structures",
        subjectCode: "CSE202",
        monthlyAttendance: {
          January: { attended: 5, total: 6 },
          February: { attended: 6, total: 7 },
          March: { attended: 4, total: 5 },
          April: {},
          May: {},
        },
      },
      {
        subjectName: "Operating Systems",
        subjectCode: "CSE301",
        monthlyAttendance: {
          January: { attended: 4, total: 5 },
          February: { attended: 4, total: 5 },
          March: { attended: 4, total: 5 },
          April: {},
          May: {},
        },
      },
      {
        subjectName: "Mathematics III",
        subjectCode: "MATH201",
        monthlyAttendance: {
          January: { attended: 5, total: 5 },
          February: { attended: 5, total: 6 },
          March: { attended: 4, total: 5 },
          April: {},
          May: {},
        },
      },
    ],
  };

  const [selectedMonth, setSelectedMonth] = useState("Overall");

  const monthList = ["Overall", "January", "February", "March", "April", "May"];

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const getAttendanceData = () => {
    return data.subjects.map((subject) => {
      if (selectedMonth === "Overall") {
        const totalAttended = Object.values(subject.monthlyAttendance).reduce((sum, month) => sum + (month.attended || 0), 0);
        const totalClasses = Object.values(subject.monthlyAttendance).reduce((sum, month) => sum + (month.total || 0), 0);
        return { ...subject, attendance: { attended: totalAttended, total: totalClasses } };
      }
      const attendance = subject.monthlyAttendance[selectedMonth];
      return {
        ...subject,
        attendance: attendance && Object.keys(attendance).length > 0 ? attendance : { attended: "Data is not available", total: "Data is not available" },
      };
    });
  };

  const attendanceData = getAttendanceData();

  return (
    <div className="container mx-auto mt-8 px-4 pb-32" style={{ background: 'linear-gradient(135deg, #0d1117, #131720)' }}>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-white">Teacher Attendance</h1>
        <p className="text-xl mt-2 text-white">
          Attendance record for {data.teacher.name} ({data.teacher.designation})
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Session: {data.teacher.session}</h2>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="month" className="text-xl font-semibold text-white">
          Select Month:
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border rounded-lg p-2 bg-[#0F2A47] text-white"
        >
          {monthList.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="p-8 rounded-lg shadow-xl border border-[#2C4D76]" style={{ background: '#1C212A' }}>
        <table className="min-w-full border-collapse rounded-lg">
          <thead>
            <tr style={{ background: '#2563eb', color: 'white' }}>
              <th className="py-3 px-6 text-left text-sm font-semibold">Subject Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Subject Code</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Classes Attended</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Total Classes</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Attendance (%)</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Classes Remaining</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((subject, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-[#0D365D]" : "bg-[#144C7E]"
                } hover:bg-[#1A5D95] transition-colors duration-300`}
              >
                <td className="py-4 px-6 text-sm" style={{ color: '#A6C9FF' }}>{subject.subjectName}</td>
                <td className="py-4 px-6 text-sm" style={{ color: '#A6C9FF' }}>{subject.subjectCode}</td>
                <td className="py-4 px-6 text-sm" style={{ color: '#A6C9FF' }}>{subject.attendance.attended}</td>
                <td className="py-4 px-6 text-sm" style={{ color: '#A6C9FF' }}>{subject.attendance.total}</td>
                <td className="py-4 px-6 text-sm" style={{ color: '#A6C9FF' }}>
                  {typeof subject.attendance.attended === "number" && typeof subject.attendance.total === "number"
                    ? ((subject.attendance.attended / subject.attendance.total) * 100).toFixed(2) + "%"
                    : "Data is not available"}
                </td>
                <td className="py-4 px-6 text-sm" style={{ color: '#A6C9FF' }}>
                  {typeof subject.attendance.attended === "number" && typeof subject.attendance.total === "number"
                    ? subject.attendance.total - subject.attendance.attended
                    : "Data is not available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherAttendance;
