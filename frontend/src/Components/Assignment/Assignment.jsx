import React, { useState } from 'react';

const Assignment = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const subjects = ["OOPS", "C", "DS", "DBMS"];

  const assignments = {
    OOPS: [
      {
        subject: "OOPS Assignment 1",
        createdDate: "01-Dec-2024",
        dueDateTime: "10/12/2024 20:00:00",
        cutoffDateTime: "10-Dec-2024 - 08:00:00 PM",
        status: "Pending",
        questionPdf: null,
        studentAnswerPdf: null,
        marks: null,
      },
      {
        subject: "OOPS Assignment 1",
        createdDate: "01-Dec-2024",
        dueDateTime: "10/12/2024 20:00:00",
        cutoffDateTime: "10-Dec-2024 - 08:00:00 PM",
        status: "Pending",
        questionPdf: null,
        studentAnswerPdf: null,
        marks: null,
      },
    ],
    C: [{
      subject: "OOPS Assignment 1",
      createdDate: "01-Dec-2024",
      dueDateTime: "10/12/2024 20:00:00",
      cutoffDateTime: "10-Dec-2024 - 08:00:00 PM",
      status: "Pending",
      questionPdf: null,
      studentAnswerPdf: null,
      marks: null,
    },],
    DS: [],
    DBMS: [],
  };

  const handleFileUpload = (event) => {
    setUploadedPdf(event.target.files[0]);
  };

  const handleSubmitAnswer = (assignmentIndex) => {
    const assignment = assignments[selectedSubject][assignmentIndex];
    assignment.studentAnswerPdf = uploadedPdf;
    assignment.status = "Submitted";
    setUploadedPdf(null);
  };


  
  return (
    <div className="container mx-auto mt-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">
          Session: <span className="font-bold">July-Dec 2024-2025</span>
        </h1>

        {/* Subject Dropdown */}
        <div className="relative bg-white rounded-md border border-gray-300 px-3 py-2">
          <label htmlFor="subject" className="mr-2 font-medium">
            Select Subject:
          </label>
          <select
            id="subject"
            className="border bg-white border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="" disabled>
              -- Select Subject --
            </option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <table className="min-w-full border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 text-left">Action</th>
              <th className="py-2 px-4 text-left">Subject</th>
              <th className="py-2 px-4 text-left">Created Date</th>
              <th className="py-2 px-4 text-left">Due Date Time</th>
              <th className="py-2 px-4 text-left">Cut-Off Date Time</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Score</th>
              <th className="py-2 px-4 text-left">Upload Assignment</th>
            </tr>
          </thead>
          <tbody>
            {selectedSubject && assignments[selectedSubject] ? (
              assignments[selectedSubject].length > 0 ? (
                assignments[selectedSubject].map((assignment, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
                  >
                    <td className="py-2 px-4">
                      <button className="text-white bg-gray-500 hover:underline hover:bg-gray-600 px-2 py-1 rounded-md">
                        View
                      </button>
                    </td>
                    <td className="py-2 px-4">{assignment.subject}</td>
                    <td className="py-2 px-4">{assignment.createdDate}</td>
                    <td className="py-2 px-4">{assignment.dueDateTime}</td>
                    <td className="py-2 px-4">{assignment.cutoffDateTime}</td>
                    <td
                      className={`py-2 px-4 font-bold ${assignment.status === "Pending" ? "text-green-500" : "text-red-500"}`}
                    >
                      {assignment.status}
                    </td>
                    <td
                      className={`py-2 px-4 font-bold ${assignment.status === "Pending" ? "text-green-500" : "text-red-500"}`}
                    >
                      {assignment.marks !== null ? assignment.marks : "-"}
                    </td>

                    <td className="py-2 px-4 flex items-center">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                      />
                      <button
                        className="ml-2 bg-gray-500 text-white hover:underline hover:bg-slate-600"
                        onClick={() => handleSubmitAnswer(index)}
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="py-4 px-4 text-center text-gray-500 font-medium"
                  >
                    No assignments available for this subject.
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-4 px-4 text-center text-gray-500 font-medium"
                >
                  Please select a subject to view assignments.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignment;
