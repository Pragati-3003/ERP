import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    curriculum: "",
    course: "",
    dueDate: "",
    maxMarks: "",
    // filePath: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const navigate = useNavigate();

  // Added new curriculum and course options
  const curriculums = ["MCA"];
  const courses = ["Data Structure"];

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        filePath: URL.createObjectURL(file),
      }));
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const saveAssignments = () => {
    if (
      !formData.title ||
      !formData.curriculum ||
      !formData.course ||
      !formData.dueDate ||
      !formData.maxMarks ||
      !selectedFile
    ) {
      alert("Please fill all fields and select a file.");
      return;
    }

    if (editingIndex !== null) {
      const updatedAssignments = [...assignments];
      updatedAssignments[editingIndex] = formData;
      setAssignments(updatedAssignments);
      setEditingIndex(null);
    } else {
      setAssignments((prev) => [...prev, formData]);
    }

    alert("Assignment saved successfully.");
    setFormData({
      title: "",
      curriculum: "",
      course: "",
      dueDate: "",
      maxMarks: "",
      filePath: "",
    });
    setSelectedFile(null);
  };

  const updateAssignment = (index) => {
    const assignment = assignments[index];
    setFormData(assignment);
    setSelectedFile({ name: assignment.filePath });
    setEditingIndex(index);
  };

  const deleteAssignment = (index) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      const updatedAssignments = assignments.filter((_, i) => i !== index);
      setAssignments(updatedAssignments);
      alert("Assignment deleted successfully.");
    }
  };

  const viewSubmissions = () => {
    navigate("/teacher/view-submissions");
  };

  return (
    <div className="p-14 -mt-14 md:p-8  text-white ">
      <h1 className="text-2xl md:text-3xl font-bold mt-0 mb-6 text-center md:text-left">
        Upload Assignment
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          className="bg-gray-800 px-4 py-2 rounded w-full sm:w-60"
          placeholder="Assignment Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <select
          className="bg-gray-800 px-4 py-2 rounded w-full sm:w-60"
          name="curriculum"
          value={formData.curriculum}
          onChange={handleInputChange}
        >
          <option value="">Select Curriculum</option>
          <option value="MCA">MCA</option>
        </select>

        <select
          className="bg-gray-800 px-4 py-2 rounded w-full sm:w-60"
          name="course"
          value={formData.course}
          onChange={handleInputChange}
        >
          <option value="">Select Course</option>
          <option value="Data Structure">Data Structure</option>
        </select>
        <label for="date" className="py-2">
          Due Date:
        </label>
        <input
          type="date"
          id="date"
          className="bg-gray-800 px-4 py-2 rounded w-full sm:w-60"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          placeholder="Set Due Date"
        />

        <input
          className="bg-gray-800 px-4 py-2 rounded w-full sm:w-60"
          placeholder="Max Marks"
          name="maxMarks"
          value={formData.maxMarks}
          onChange={handleInputChange}
        />
      </div>

      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <button
          onClick={triggerFileInput}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Choose File
        </button>
        <button
          onClick={saveAssignments}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      {formData.filePath && (
        <p className="text-green-400 mb-4 text-sm break-all">
          Selected File: {formData.filePath}
        </p>
      )}

      <div className="overflow-y-auto max-h-[300px] overflow-x-auto rounded border border-gray-700">
        <table className="w-full table-auto text-sm text-center">
          <thead className="sticky top-0 bg-gray-800">
            <tr>
              <th className="p-2 border-r border-gray-700">Title</th>
              <th className="p-2 border-r border-gray-700">Curriculum</th>
              <th className="p-2 border-r border-gray-700">Course</th>
              <th className="p-2 border-r border-gray-700">Due Date</th>
              <th className="p-2 border-r border-gray-700">Max Marks</th>
              <th className="p-2 border-r border-gray-700">File</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, idx) => (
              <tr key={idx} className="bg-gray-700">
                <td className="p-2 border-r border-gray-800">{a.title}</td>
                <td className="p-2 border-r border-gray-800">{a.curriculum}</td>
                <td className="p-2 border-r border-gray-800">{a.course}</td>
                <td className="p-2 border-r border-gray-800">{a.dueDate}</td>
                <td className="p-2 border-r border-gray-800">{a.maxMarks}</td>
                <td className="p-2 border-r border-gray-800 break-all">
                  <a
                    href={a.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    View
                  </a>
                </td>
                <td className="p-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => updateAssignment(idx)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAssignment(idx)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={viewSubmissions}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded"
                  >
                    View Submissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
