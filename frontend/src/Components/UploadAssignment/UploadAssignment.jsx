import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const UploadAssignment = () => {
  const email = useSelector((state) => state.auth.user?.userInfo?.Email);
  const teacherID = localStorage.getItem("UserID");
  const [curriculums, setCurriculums] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    curriculumID: "",
    semester: "",
    courseID: "",
  });
  const [assignments, setAssignments] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignmentNumber, setAssignmentNumber] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editAssignmentID, setEditAssignmentID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await axios.get(
        `http://localhost:5000/api/assignments/curriculums`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurriculums(res1.data);
      const res2 = await axios.get(`/api/assignments/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res2.data);
    };
    fetchData();
  }, [token]);

  const fetchAssignments = () => {
    if (token) {
      axios
        .get(`/api/assignments/teachers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setAssignments(res.data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [token]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await axios.delete(`/api/assignments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: { teacherID },
        });
        setAssignments((prev) => prev.filter((a) => a._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (assignment) => {
    setEditMode(true);
    setEditAssignmentID(assignment._id);
    setTitle(assignment.Title);
    setDueDate(assignment.DueDate?.slice(0, 10));
    setAssignmentNumber(assignment.AssignmentNumber);
    setFilters({
      curriculumID: assignment.CurriculumID?._id || "",
      semester: assignment.Semester,
      courseID: assignment.CourseID?._id || "",
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file.");
    if (!title || !dueDate || !assignmentNumber)
      return alert("Fill all fields.");

    const formData = new FormData();
    formData.append("Title", title);
    formData.append("DueDate", dueDate);
    formData.append("AssignmentNumber", assignmentNumber);
    formData.append("CurriculumID", filters.curriculumID);
    formData.append("Semester", filters.semester);
    formData.append("TeacherID", teacherID);
    formData.append("CourseID", filters.courseID);
    formData.append("pdfFile", file);

    try {
      if (editMode && editAssignmentID) {
        await axios.put(
          `/api/assignments/teacher/${editAssignmentID}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setEditMode(false);
        setEditAssignmentID(null);
        alert("Assignment updated successfully!");
      } else {
        await axios.post(`/api/assignments/teacher/uploadAss`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Assignment uploaded successfully!");
      }
      setFile(null);
      setTitle("");
      setDueDate("");
      // alert("Assignment uploaded successfully!");
      setMessage("Assignment uploaded successfully!");
      setAssignmentNumber("");
      fetchAssignments();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to upload assignment."
      );
    }
  };
  // const handleViewAssignment = (pdfUrl) => {
  //   if (!pdfUrl) {
  //     alert("No PDF available for this assignment.");
  //     return;
  //   }
  //   window.open(`http://localhost:5000/${pdfUrl}`, "_blank");
  // };
  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-bold mb-4">Upload Assignments</h2> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          name="curriculumID"
          onChange={handleFilterChange}
          value={filters.curriculumID}
          className="border p-2 rounded"
        >
          <option value="">Select Curriculum</option>
          {curriculums.map((c) => (
            <option key={c._id} value={c._id}>
              {c.program}
            </option>
          ))}
        </select>

        <select
          name="semester"
          onChange={handleFilterChange}
          value={filters.semester}
          className="border p-2 rounded"
        >
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        <select
          name="courseID"
          onChange={handleFilterChange}
          value={filters.courseID}
          className="border p-2 rounded"
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.CourseName}
            </option>
          ))}
        </select>
      </div>

      <form
        onSubmit={handleFileUpload}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Assignment Number"
          value={assignmentNumber}
          onChange={(e) => setAssignmentNumber(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded mt-2 md:mt-0"
        >
          {editMode ? "Update Assignment" : "Upload Assignment"}
        </button>
      </form>

      <table className="w-full table-auto border text-sm">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Curriculum</th>
            <th className="p-2">Semester</th>
            <th className="p-2">Course</th>
            <th className="p-2">Due Date</th>
            <th className="p-2">Assignment No.</th>
            <th className="p-2">PDF</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => {
            const created = new Date(a.CreatedAt);
            const now = new Date();
            const isRecent =
              created.getMonth() === now.getMonth() &&
              created.getFullYear() === now.getFullYear();

            return (
              <tr key={a._id} className="border-t">
                <td className="p-2">{a.Title}</td>
                <td className="p-2">{a.CurriculumID?.program}</td>
                <td className="p-2">{a.Semester}</td>
                <td className="p-2">{a.CourseID?.CourseName}</td>
                <td className="p-2">{a.DueDate?.slice(0, 10)}</td>
                <td className="p-2">{a.AssignmentNumber}</td>
                <td className="p-2">
                  <a
                    href={`http://localhost:5000/${a.AssignmentPDF}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </td>
                <td className="p-2 flex gap-2">
                  {isRecent && (
                    <button
                      onClick={() => handleEdit(a)}
                      className="bg-yellow-400 px-2 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UploadAssignment;
