import React, { useState } from "react";
import axios from "axios";

const UploadStudentTimetable = () => {
  const [program, setProgram] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("program", program);
    formData.append("specialization", specialization);
    formData.append("semester", semester);
    formData.append("pdfFile", file);
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication token is missing.");
      return;
    }
    try {
      await axios.put(
        "http://localhost:5000/api/admin/addStudentTimeTable",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Timetable uploaded successfully!");
      setProgram("");
      setSpecialization("");
      setSemester("");
      setFile(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to upload timetable.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Upload Student Timetable
      </h2>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("successfully")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center  p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="border  rounded p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="border  rounded p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border  rounded p-2 w-full"
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="border  rounded p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 w-full"
        >
          Upload Timetable
        </button>
      </form>
    </div>
  );
};

export default UploadStudentTimetable;
