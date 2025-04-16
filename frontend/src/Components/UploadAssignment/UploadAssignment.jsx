// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UploadAssignment() {
//   const [assignments, setAssignments] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     curriculum: "",
//     course: "",
//     dueDate: "",
//     maxMarks: "",
//     // filePath: "",
//   });
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [editingIndex, setEditingIndex] = useState(null);

//   const navigate = useNavigate();

//   // Added new curriculum and course options
//   const curriculums = ["MCA"];
//   const courses = ["Data Structure"];

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setFormData((prev) => ({
//         ...prev,
//         filePath: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const triggerFileInput = () => {
//     document.getElementById("fileInput").click();
//   };

//   const saveAssignments = () => {
//     if (
//       !formData.title ||
//       !formData.curriculum ||
//       !formData.course ||
//       !formData.dueDate ||
//       !formData.maxMarks ||
//       !selectedFile
//     ) {
//       alert("Please fill all fields and select a file.");
//       return;
//     }

//     if (editingIndex !== null) {
//       const updatedAssignments = [...assignments];
//       updatedAssignments[editingIndex] = formData;
//       setAssignments(updatedAssignments);
//       setEditingIndex(null);
//     } else {
//       setAssignments((prev) => [...prev, formData]);
//     }

//     alert("Assignment saved successfully.");
//     setFormData({
//       title: "",
//       curriculum: "",
//       course: "",
//       dueDate: "",
//       maxMarks: "",
//       filePath: "",
//     });
//     setSelectedFile(null);
//   };

//   const updateAssignment = (index) => {
//     const assignment = assignments[index];
//     setFormData(assignment);
//     setSelectedFile({ name: assignment.filePath });
//     setEditingIndex(index);
//   };

//   const deleteAssignment = (index) => {
//     if (window.confirm("Are you sure you want to delete this assignment?")) {
//       const updatedAssignments = assignments.filter((_, i) => i !== index);
//       setAssignments(updatedAssignments);
//       alert("Assignment deleted successfully.");
//     }
//   };

//   const viewSubmissions = () => {
//     navigate("/teacher/view-submissions");
//   };

//   return (
//     <div className="p-14 -mt-14 md:p-8  text-white ">
//       <h1 className="text-2xl md:text-3xl font-bold mt-0 mb-6 text-center md:text-left">
//         Upload Assignment
//       </h1>

//       <div className="flex flex-wrap gap-4 mb-6">
//         <input
//           className="bg-gray-800 px-4 py-2 rounded w-full sm:w-60"
//           placeholder="Assignment Title"
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//         />

//         <select
//           className="bg-gray-800 px-4 py-2 rounded w-full sm:w-60"
//           name="curriculum"
//           value={formData.curriculum}
//           onChange={handleInputChange}
//         >
//           <option value="">Select Curriculum</option>
//           <option value="MCA">MCA</option>
//         </select>

//         <select
//           className="bg-gray-800 px-4 py-2 rounded w-full sm:w-60"
//           name="course"
//           value={formData.course}
//           onChange={handleInputChange}
//         >
//           <option value="">Select Course</option>
//           <option value="Data Structure">Data Structure</option>
//         </select>
//         <label for="date" className="py-2">
//           Due Date:
//         </label>
//         <input
//           type="date"
//           id="date"
//           className="bg-gray-800 px-4 py-2 rounded w-full sm:w-60"
//           name="dueDate"
//           value={formData.dueDate}
//           onChange={handleInputChange}
//           placeholder="Set Due Date"
//         />

//         <input
//           className="bg-gray-800 px-4 py-2 rounded w-full sm:w-60"
//           placeholder="Max Marks"
//           name="maxMarks"
//           value={formData.maxMarks}
//           onChange={handleInputChange}
//         />
//       </div>

//       <input
//         type="file"
//         id="fileInput"
//         className="hidden"
//         onChange={handleFileSelect}
//       />

//       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
//         <button
//           onClick={triggerFileInput}
//           className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Choose File
//         </button>
//         <button
//           onClick={saveAssignments}
//           className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//         >
//           Upload
//         </button>
//       </div>

//       {formData.filePath && (
//         <p className="text-green-400 mb-4 text-sm break-all">
//           Selected File: {formData.filePath}
//         </p>
//       )}

//       <div className="overflow-y-auto max-h-[300px] overflow-x-auto rounded border border-gray-700">
//         <table className="w-full table-auto text-sm text-center">
//           <thead className="sticky top-0 bg-gray-800">
//             <tr>
//               <th className="p-2 border-r border-gray-700">Title</th>
//               <th className="p-2 border-r border-gray-700">Curriculum</th>
//               <th className="p-2 border-r border-gray-700">Course</th>
//               <th className="p-2 border-r border-gray-700">Due Date</th>
//               <th className="p-2 border-r border-gray-700">Max Marks</th>
//               <th className="p-2 border-r border-gray-700">File</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {assignments.map((a, idx) => (
//               <tr key={idx} className="bg-gray-700">
//                 <td className="p-2 border-r border-gray-800">{a.title}</td>
//                 <td className="p-2 border-r border-gray-800">{a.curriculum}</td>
//                 <td className="p-2 border-r border-gray-800">{a.course}</td>
//                 <td className="p-2 border-r border-gray-800">{a.dueDate}</td>
//                 <td className="p-2 border-r border-gray-800">{a.maxMarks}</td>
//                 <td className="p-2 border-r border-gray-800 break-all">
//                   <a
//                     href={a.filePath}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-400 underline"
//                   >
//                     View
//                   </a>
//                 </td>
//                 <td className="p-2 flex flex-col sm:flex-row gap-2">
//                   <button
//                     onClick={() => updateAssignment(idx)}
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => deleteAssignment(idx)}
//                     className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={viewSubmissions}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded"
//                   >
//                     View Submissions
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadAssignment = () => {
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

  // Fetch teacher-specific curriculum and courses
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
    if (filters.curriculumID && filters.semester && filters.courseID) {
      axios
        .get(`/api/assignments/teacher/${teacherID}`, { params: filters })
        .then((res) => setAssignments(res.data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [filters, teacherID]);

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
        let res = await axios.put(`/api/assignments/teacher`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setEditMode(false);
        setEditAssignmentID(null);
      } else {
        await axios.post(`/api/assignments/teacher/uploadAss`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setFile(null);
      setTitle("");
      setDueDate("");
      setMessage("Assignment uploaded successfully!");
      setAssignmentNumber("");
      fetchAssignments();
    } catch (error) {
      setMessage(error.res?.data?.message || "Failed to upload timetable.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Assignments</h2>

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
                    href={`/${a.AssignmentPDF}`}
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
