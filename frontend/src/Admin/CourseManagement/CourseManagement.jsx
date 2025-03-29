import React, { useState, useEffect } from "react";
import axios from "axios";
const CourseManagement = () => {
  const [activeTab, setActiveTab] = useState("add"); // 'add', 'update', 'delete'
  const [formData, setFormData] = useState({
    CourseCode: "",
    CourseName: "",
    Type: "",
    CreditPoints: "",
    deptName: "",
    TotalLectures: "",
    Prerequisites: "",
  });
  useEffect(() => {
    setSearchResult(null); // Reset search result when switching tabs
    setFormData({
      // Reset form data
      CourseCode: "",
      CourseName: "",
      Type: "",
      CreditPoints: "",
      deptName: "",
      TotalLectures: "",
      Prerequisites: "",
    });
  }, [activeTab]); // Runs whenever activeTab changes

  const [CourseCode, setCourseCode] = useState(""); // For update/delete actions
  const [CourseName, setCourseName] = useState("");
  const [searchResult, setSearchResult] = useState(null); // For update action

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit actions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Provide Token");
      return;
    }

    if (activeTab === "add") {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/add-course",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(response.data.message);
        setSearchResult(null);
      } catch (err) {
        alert(err.response?.data?.message || "An error occurred");
      }
    } else if (activeTab === "update") {
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/admin/update-course/${CourseCode}/${CourseName}`, // Fix here
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourseCode("");
        setSearchResult(null);
        alert(response.data.message);
      } catch (err) {
        alert(err.response?.data?.message || "An error occurred");
      }
    } else if (activeTab === "delete") {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/admin/delete-course/${CourseCode}/${CourseName}`, // Fix here
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(response.data.message);
        setCourseCode("");
      } catch (err) {
        alert(err.response?.data?.message || "An error occurred");
      }
    }
  };

  // Search student for update
  const handleSearch = async () => {
    if (!CourseCode) {
      alert("Please enter Email or Smart ID");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Provide Token");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/getcourse/${CourseCode}/${CourseName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ); // Assuming your backend allows querying by email or CourseCode
      // console.log(response.data)
      setSearchResult(response.data);
      setFormData(response.data);
    } catch (err) {
      alert(err.response?.data?.message || "Student not found");
    }
  };

  return (
    <div className="flex flex-col items-center py-12">
      {/* Tab Navigation */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveTab("add")}
          className={`px-6 py-2 rounded-md ${
            activeTab === "add"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Add Course
        </button>
        <button
          onClick={() => setActiveTab("update")}
          className={`px-6 py-2 rounded-md ${
            activeTab === "update"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Update Course
        </button>
        <button
          onClick={() => setActiveTab("delete")}
          className={`px-6 py-2 rounded-md ${
            activeTab === "delete"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Delete Course
        </button>
      </div>

      {/* Forms */}
      <form
        className="shadow-sm rounded-lg border border-gray-300 p-8 w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        {activeTab === "add" && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Add Student
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 Assistant Professor">
              {Object.keys(formData).map((field) => (
                <div key={field} className="flex flex-col text-gray-700">
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    {field}
                  </label>
                  <input
                    type={field === "DOB" ? "date" : "text"}
                    id={field}
                    name={field}
                    value={formData[field] ?? ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 placeholder:text-gray-400"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full mt-8 py-3 px-6 text-white font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition duration-300"
            >
              Add Course
            </button>
          </>
        )}

        {activeTab === "update" && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Update Course
            </h2>
            <div className="mb-4">
              <label
                htmlFor="CourseCode"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Enter CourseCode and CourseName
              </label>

              <input
                type="text"
                id="CourseCode"
                name="CourseCode"
                value={CourseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter CourseCode"
              />

              <input
                type="text"
                id="CourseCode"
                name="CourseCode"
                value={CourseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Coursename"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="w-full mb-6 py-3 px-6 text-white font-semibold rounded-md bg-green-500 hover:bg-green-600 transition duration-300"
            >
              Search Course
            </button>
            {searchResult && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.keys(formData).map((field) => (
                    <div key={field} className="flex flex-col">
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium text-gray-400 mb-1"
                      >
                        {field}
                      </label>
                      <input
                        type={field === "DOB" ? "date" : "text"}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 placeholder:text-gray-400"
                        placeholder={`Enter ${field}`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full mt-8 py-3 px-6 text-white font-semibold rounded-md bg-yellow-500 hover:bg-yellow-600 transition duration-300"
                >
                  Update Student
                </button>
              </>
            )}
          </>
        )}

        {activeTab === "delete" && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Delete Student
            </h2>
            <div className="mb-4">
              <label
                htmlFor="CourseCode"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Enter CourseCode and CourseName
              </label>

              <input
                type="text"
                id="CourseCode"
                name="CourseCode"
                value={CourseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter CourseCode"
              />
              <input
                type="text"
                id="CourseCode"
                name="CourseCode"
                value={CourseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Course Name"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 text-white font-semibold rounded-md bg-red-500 hover:bg-red-600 transition duration-300"
            >
              Delete Student
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default CourseManagement;
