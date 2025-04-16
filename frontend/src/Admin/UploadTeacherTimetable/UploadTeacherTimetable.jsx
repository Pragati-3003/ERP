import React, { useState } from "react";
import axios from "axios";

const UploadTeacherTimetable = () => {
  const [teacherEmail, setTeacherEmail] = useState("");
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
    formData.append("teacherEmail", teacherEmail);
    formData.append("pdfFile", file);
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication token is missing.");
      return;
    }
    try {
      await axios.put(
        "http://localhost:5000/api/admin/addTeacherTimeTable",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Timetable uploaded successfully!");
      setTeacherEmail("");
      setFile(null);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to upload timetable."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Upload Teacher Timetable
      </h2>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
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
          type="email"
          placeholder="Enter Teacher's Email"
          value={teacherEmail}
          onChange={(e) => setTeacherEmail(e.target.value)}
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

export default UploadTeacherTimetable;
