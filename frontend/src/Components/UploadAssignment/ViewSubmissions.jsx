import React, { useState } from "react";

const ViewSubmissions = () => {
  const [selectedCourse, setSelectedCourse] = useState("MCA");
  const [selectedCurriculum, setSelectedCurriculum] = useState("Semester 1");
  const [selectedSubject, setSelectedSubject] = useState("Data Structures");

  const courses = ["MCA", "MBA", "B.Tech"];
  const curriculums = ["Semester 1", "Semester 2", "Semester 3"];
  const subjects = ["Data Structures", "Operating Systems", "Mathematics"];

  const submissions = [
    {
      course: "MCA",
      curriculum: "Semester 1",
      subject: "Data Structures",
      studentName: "Pragati Jain",
      studentId: "MCA001",
      status: "Submitted",
    },
    {
      course: "MCA",
      curriculum: "Semester 1",
      subject: "Data Structures",
      studentName: "Shweta Sindhu",
      studentId: "MCA002",
      status: "Pending",
    },
    {
      course: "MBA",
      curriculum: "Semester 2",
      subject: "Mathematics",
      studentName: "Alice Johnson",
      studentId: "MBA003",
      status: "Submitted",
    },
  ];

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.course === selectedCourse &&
      submission.curriculum === selectedCurriculum &&
      submission.subject === selectedSubject
  );

  return (
    <div className="p-6  text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Student Submissions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <select
          className="bg-gray-800 px-4 py-2 rounded"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>

        <select
          className="bg-gray-800 px-4 py-2 rounded"
          value={selectedCurriculum}
          onChange={(e) => setSelectedCurriculum(e.target.value)}
        >
          {curriculums.map((curriculum, index) => (
            <option key={index} value={curriculum}>
              {curriculum}
            </option>
          ))}
        </select>

        <select
          className="bg-gray-800 px-4 py-2 rounded"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 text-sm text-center">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 border-r border-gray-700">Student Name</th>
              <th className="p-3 border-r border-gray-700">Student ID</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((submission, idx) => (
              <tr key={idx} className="bg-gray-700 border-t border-gray-600">
                <td className="p-3 border-r border-gray-980">
                  {submission.studentName}
                </td>
                <td className="p-3 border-r border-gray-980">
                  {submission.studentId}
                </td>
                <td className="p-3">{submission.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSubmissions;
