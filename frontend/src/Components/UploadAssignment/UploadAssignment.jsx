import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AssignmentPanel() {
  const [assignments, setAssignments] = useState([
    {
      title: 'Assignment 2',
      course: 'CS104 Data Communication and Networks',
      dueDate: '2025-03-15',
      submissions: 12,
      maxMarks: 100,
    },
  ]);

  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', dueDate: '', maxMarks: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const addAssignment = () => {
    const { title, course, dueDate, maxMarks } = newAssignment;
    if (!title || !course || !dueDate || !maxMarks || maxMarks <= 0) return alert('Please fill all fields with valid data');
    setAssignments([...assignments, { ...newAssignment, submissions: 0 }]);
    setNewAssignment({ title: '', course: '', dueDate: '', maxMarks: '' });
  };

  const deleteAssignment = (index) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter((_, i) => i !== index));
    }
  };

  const updateAssignment = (index) => {
    const updatedTitle = prompt('Update Assignment Title:', assignments[index].title) || assignments[index].title;
    const updatedCourse = prompt('Update Course:', assignments[index].course) || assignments[index].course;
    const updatedDueDate = prompt('Update Due Date (YYYY-MM-DD):', assignments[index].dueDate) || assignments[index].dueDate;
    const updatedMaxMarks = prompt('Update Max Marks:', assignments[index].maxMarks);

    if (updatedMaxMarks !== null && updatedMaxMarks > 0) {
      const updatedAssignments = [...assignments];
      updatedAssignments[index] = {
        ...updatedAssignments[index],
        title: updatedTitle,
        course: updatedCourse,
        dueDate: updatedDueDate,
        maxMarks: updatedMaxMarks,
      };
      setAssignments(updatedAssignments);
    } else {
      alert('Max Marks should be a positive number.');
    }
  };

  const viewSubmissions = (index) => {
    navigate(`/submissions/${index}`, { state: { assignment: assignments[index] } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Upload Assignment</h1>

      {/* Create New Assignment Form */}
      <div className="mb-8">
        <h2 className="text-xl mb-4">Create New Assignment</h2>
        <div className="flex gap-4">
          <input
            type="text"
            name="title"
            placeholder="Assignment Title"
            value={newAssignment.title}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-800"
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={newAssignment.course}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-800"
          />
          <input
            type="date"
            name="dueDate"
            value={newAssignment.dueDate}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-800"
          />
          <input
            type="number"
            name="maxMarks"
            placeholder="Max Marks"
            value={newAssignment.maxMarks}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-800"
          />
          <button onClick={addAssignment} className="bg-blue-600 p-2 rounded">Add Assignment</button>
        </div>
      </div>

      {/* Assignment List */}
      <h2 className="text-xl mb-4">Assignment List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-4">Title</th>
              <th className="p-4">Course</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Submissions</th>
              <th className="p-4">Max Marks</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="p-4">{assignment.title}</td>
                  <td className="p-4">{assignment.course}</td>
                  <td className="p-4">{assignment.dueDate}</td>
                  <td className="p-4">{assignment.submissions}</td>
                  <td className="p-4">{assignment.maxMarks}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => viewSubmissions(index)} className="bg-green-600 p-2 rounded">View Submissions</button>
                    <button onClick={() => updateAssignment(index)} className="bg-yellow-600 p-2 rounded">Update</button>
                    <button onClick={() => deleteAssignment(index)} className="bg-red-600 p-2 rounded">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">No assignments available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
