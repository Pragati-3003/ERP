import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherManagement = () => {
  const [activeTab, setActiveTab] = useState("add"); // 'add', 'update', 'delete'
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    email: "",
    DOB: "",
    Gender: "",
    Email: "",
    PhoneNumber: "",
    Qualification: "",
    deptName: "",
    Experience: "",
    Designation: "",
  });

  const [email, setemail] = useState(""); // For update/delete actions
  const [searchResult, setSearchResult] = useState(null); // For update action

  useEffect(() => {
    setSearchResult(null);
    setFormData({
      FirstName: "",
      LastName: "",
      Address: "",
      DOB: "",
      Gender: "",
      Email: "",
      PhoneNumber: "",
      Qualification: "",
      deptName: "",
      Experience: "",
      Designation: "",
    });
  }, [activeTab]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit actions for Add, Update, Delete
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Provide Token");
      return;
    }

    try {
      let response;
      if (activeTab === "add") {
        response = await axios.post(
          "http://localhost:5000/api/admin/add-teacher",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (activeTab === "update") {
        response = await axios.patch(
          `http://localhost:5000/api/admin/update-teacher/${email}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (activeTab === "delete") {
        response = await axios.delete(
          `http://localhost:5000/api/admin/delete-teacher/${email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      alert(response.data.message);
      setemail("");
      setSearchResult(null);
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  // Search teacher for update
  const handleSearch = async () => {
    if (!email) {
      alert("Please enter Email");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Provide Token");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/getTeacherByemail?email=${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSearchResult(response.data);
      setFormData(response.data);
    } catch (err) {
      alert(err.response?.data?.message || "Teacher not found");
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
          Add Teacher
        </button>
        <button
          onClick={() => setActiveTab("update")}
          className={`px-6 py-2 rounded-md ${
            activeTab === "update"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Update Teacher
        </button>
        <button
          onClick={() => setActiveTab("delete")}
          className={`px-6 py-2 rounded-md ${
            activeTab === "delete"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Delete Teacher
        </button>
      </div>

      {/* Forms */}
      <form
        className="shadow-sm rounded-lg border border-gray-300 p-8 w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        {activeTab === "add" && (
          <>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Add Teacher
            </h2>
            <div className="grid grid-cols-1  text-white md:grid-cols-2 gap-6">
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
                    value={formData[field] ?? ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full mt-8 py-3 px-6 text-white font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition duration-300"
            >
              Add Teacher
            </button>
          </>
        )}

        {activeTab === "update" && (
          <>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Update Teacher
            </h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Enter Email or Smart ID
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Teacher Email"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="w-full mb-6 py-3 px-6 text-white font-semibold rounded-md bg-green-500 hover:bg-green-600 transition duration-300"
            >
              Search Teacher
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
                        value={formData[field] ?? ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder={`Enter ${field}`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full mt-8 py-3 px-6 text-white font-semibold rounded-md bg-yellow-500 hover:bg-yellow-600 transition duration-300"
                >
                  Update Teacher
                </button>
              </>
            )}
          </>
        )}

        {activeTab === "delete" && (
          <>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Delete Teacher
            </h2>
            <input
              type="text"
              placeholder="Enter  Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full py-3 px-6 text-white font-semibold rounded-md bg-red-500 hover:bg-red-600 transition duration-300"
            >
              Delete Teacher
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default TeacherManagement;
