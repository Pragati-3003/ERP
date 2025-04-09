import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button } from "@/components/ui/button";

const TeacherPanel = () => {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    dueDate: '',
    maxMarks: '',
    filePath: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

const navigate = useNavigate();

  const courses = ["MCA"];

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({
        ...prev,
        filePath: URL.createObjectURL(file)
      }));
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const saveAssignments = () => {
    if (!formData.title || !formData.course || !formData.dueDate || !formData.maxMarks || !selectedFile) {
      alert("Please fill all fields and select a file.");
      return;
    }

    if (editingIndex !== null) {
      const updatedAssignments = [...assignments];
      updatedAssignments[editingIndex] = formData;
      setAssignments(updatedAssignments);
      setEditingIndex(null);
    } else {
      setAssignments(prev => [...prev, formData]);
    }

    alert("Assignment saved successfully. You can now Edit, View, or Delete it.");
    setFormData({
      title: '',
      course: '',
      dueDate: '',
      maxMarks: '',
      filePath: ''
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
    navigate('/submissions');
  };

  return (
    <div className="p-4 md:p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Upload Assignment
      </h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <input
          className="bg-gray-800 px-4 py-2 rounded w-full"
          placeholder="Assignment Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <select
          className="bg-gray-800 px-4 py-2 rounded w-full"
          name="course"
          value={formData.course}
          onChange={handleInputChange}
        >
          <option value="">Select Course</option>
          {courses.map((course, idx) => (
            <option key={idx} value={course}>{course}</option>
          ))}
        </select>
        <input
          type="date"
          className="bg-gray-800 px-4 py-2 rounded w-full"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
        />
        <input
          className="bg-gray-800 px-4 py-2 rounded w-full"
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

      {/* <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <Button onClick={triggerFileInput} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
          Add Assignment
        </Button>
        <Button
          onClick={saveAssignments}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
        >
          Save Assignment
        </Button>
      </div> */}

      {formData.filePath && (
        <p className="text-green-400 mb-4 text-sm break-all">
          Selected File: {formData.filePath}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Course</th>
              <th className="p-2">Due Date</th>
              <th className="p-2">Max Marks</th>
              <th className="p-2">File</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, idx) => (
              <tr key={idx} className="bg-gray-700 rounded">
                <td className="p-2">{a.title}</td>
                <td className="p-2">{a.course}</td>
                <td className="p-2">{a.dueDate}</td>
                <td className="p-2">{a.maxMarks}</td>
                <td className="p-2 break-all">
                  <a
                    href={a.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    View
                  </a>
                </td>
                {/* <td className="p-2 flex flex-col sm:flex-row gap-2">
                  <Button onClick={() => updateAssignment(idx)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs">
                    Edit
                  </Button>
                  <Button onClick={() => deleteAssignment(idx)} className="bg-red-600 hover:bg-red-700 text-white text-xs">
                    Delete
                  </Button>
                  <Button onClick={viewSubmissions} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                    View Submissions
                  </Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherPanel;
