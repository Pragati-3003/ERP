import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const Assignment = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

  const curriculumId = useSelector(
    (state) => state.auth.user.userInfo.CurriculumID
  );
  const semester = useSelector((state) => state.auth.user.userInfo.Semester);
  const studentId = useSelector((state) => state.auth.user.userInfo._id);

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Provide Token");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/getAllCoursesByCurriculumId",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            curriculumId,
            semester,
          },
        }
      );
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch attendance data. Please try again.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  // fetch course wise  assignments
  const fetchAssignments = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Provide Token");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:5000/api/student/viewAssignments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            CurriculumID: curriculumId,
            CourseCode: selectedCourseCode,
            CourseName: selectedCourseName,
            StudentID: studentId, // Include StudentID in the query
          },
        }
      );
      setAssignments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch attendance data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCourseCode && selectedCourseName) {
      fetchAssignments();
    }
  }, [selectedCourseName, selectedCourseCode]);

  const handleFileUpload = (event) => {
    setUploadedPdf(event.target.files[0]);
  };
  const handleSubmitAnswer = async (assignmentId) => {
    if (!uploadedPdf) {
      alert("Please upload a PDF before submitting.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Provide Token");
      return;
    }

    const formData = new FormData();
    formData.append("AssignmentID", assignmentId);
    formData.append("StudentID", studentId);
    formData.append("pdfFile", uploadedPdf);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/student/uploadAssignmentSubmissions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the assignments state
      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment._id === assignmentId
            ? {
                ...assignment,
                status: "Submitted",
                submissionPDF: response.data.SubmissionPDF,
              }
            : assignment
        )
      );

      alert("Assignment Submitted");
      setUploadedPdf(null);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setError("Failed to submit assignment. Please try again.");
    }
  };

  const handleViewAssignment = (pdfUrl) => {
    if (!pdfUrl) {
      alert("No PDF available for this assignment.");
      return;
    }
    window.open(`http://localhost:5000/${pdfUrl}`, "_blank");
  };

  return (
    <div className="container mx-auto mt-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold">Assignment Report</h1>
        <p className="text-sm mt-1 mb-10">Semester {semester}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">
          Session: <span className="font-bold">July-Dec 2024-2025</span>
        </h1>
        {/* Subject Dropdown */}
        <div className="relative  rounded-md border border-gray-300 px-3 py-2">
          <label htmlFor="subject" className="mr-2 font-medium">
            Select Subject:
          </label>
          <select
            id="subject"
            className="border  border-gray-300 text-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCourseCode + " " + selectedCourseName}
            onChange={(e) => (
              setSelectedCourseCode(e.target.value.substring(0, 5)),
              setSelectedCourseName(e.target.value.substring(6))
            )}
          >
            <option value="" disabled>
              -- Select Subject --
            </option>
            {courses.map((course, index) => (
              <option
                key={index}
                value={course.CourseCode + " " + course.CourseName}
              >
                {course.CourseCode} {course.CourseName}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Table Section */}
      <div className=" p-4 rounded-lg shadow-lg">
        <table className="min-w-full border-collapse  rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 text-left">Action</th>
              <th className="py-2 px-4 text-left">Assignment Title </th>
              <th className="py-2 px-4 text-left">Course Name</th>
              <th className="py-2 px-4 text-left">Due Date Time</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Score</th>
              <th className="py-2 px-4 text-left">Upload Assignment</th>
            </tr>
          </thead>
          <tbody>
            {selectedCourseName ? (
              assignments.length > 0 ? (
                assignments.map((assignment, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } text-black hover:bg-gray-200`}
                  >
                    <td className="py-2 px-4 text-black">
                      {/* View Button */}
                      <button
                        onClick={() =>
                          handleViewAssignment(assignment.AssignmentPDF)
                        }
                        className="text-white bg-blue-500 hover:underline hover:bg-blue-600 px-2 py-1 rounded-md"
                      >
                        View
                      </button>
                    </td>
                    <td className="py-2 px-4">
                      {assignment.Title + " " + assignment.AssignmentNumber}
                    </td>
                    <td className="py-2 px-4">
                      {selectedCourseCode + " " + selectedCourseName}
                    </td>
                    <td className="py-2 px-4">{assignment.DueDate}</td>
                    <td
                      className={`py-2 px-4 font-bold ${
                        assignment.status === "Pending"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {assignment.status}
                    </td>
                    <td
                      className={`py-2 px-4 font-bold ${
                        assignment.status === "Pending"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {assignment.grades || "-"}
                    </td>
                    <td className="py-2 px-4 flex items-center">
                      {/* File Input and Submit Button */}
                      {assignment.status === "Submitted" ? (
                        <button
                          onClick={() =>
                            handleViewAssignment(assignment.submissionPDF)
                          }
                          className="text-white bg-red-500 hover:underline hover:bg-gray-600 px-2 py-1 rounded-md"
                        >
                          View Submission
                        </button>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            // disabled={assignment.status === "Submitted"} // Disable if already submitted
                          />
                          <button
                            className="ml-2 bg-gray-500 text-white hover:underline hover:bg-slate-600 px-2 py-1 rounded-md"
                            onClick={() => handleSubmitAnswer(assignment._id)}
                            // disabled={assignment.status === "Submitted"} // Disable if already submitted
                          >
                            Submit
                          </button>
                        </>
                      )}
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
