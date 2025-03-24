import React, { useState } from "react";
import axios from "axios";

const AddSemesterResult = () => {
  const [file, setFile] = useState(null);
  const [studentSmartID, setStudentSmartID] = useState("");
  const [semester, setSemester] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Please provide a valid token.");
      return;
    }

    if (!file || !studentSmartID || !semester) {
      setErrorMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("resultPDF", file);
    formData.append("StudentSmartID", studentSmartID);
    formData.append("Semester", semester);

    try {
      await axios.put("http://localhost:5000/api/admin/addSemesterResult", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Result uploaded successfully");
      setFile(null);
      setStudentSmartID("");
      setSemester("");
      setErrorMessage(""); // Clear error message on success
    } catch (error) {
      setErrorMessage("Failed to upload the result. Please try again.");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center  ">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Student Result</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-md  p-6 rounded-lg shadow-md space-y-4"
      >
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
        <input
          type="text"
          placeholder="Student Smart ID"
          value={studentSmartID}
          onChange={(e) => setStudentSmartID(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        >
          Upload Result
        </button>
      </form>
    </div>
  );
};

export default AddSemesterResult;
