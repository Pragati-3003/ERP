// CurriculumManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CurriculumManagement = () => {
  const [formData, setFormData] = useState({
    program: "",
    specialization: "",
    deptName: "",
    semesters: [
      {
        semester: "",
        courses: [],
      },
    ],
  });

  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("add");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const deptRes = await axios.get(
        "http://localhost:5000/api/curriculum/departments",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDepartments(deptRes.data);

      const courseRes = await axios.get(
        "http://localhost:5000/api/curriculum/courses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses(courseRes.data);
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchExisting = async () => {
      if (
        activeTab === "update" &&
        formData.program &&
        formData.specialization
      ) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/admin/curriculum?program=${formData.program}&specialization=${formData.specialization}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = res.data;
          setFormData({
            program: data.program,
            specialization: data.specialization,
            deptName: data.deptId._id,
            semesters: data.semesters.map((s) => ({
              semester: s.semester,
              courses: s.courses.map((c) => c._id),
            })),
          });
        } catch (err) {
          console.log("No curriculum found or error", err);
        }
      }
    };
    fetchExisting();
  }, [formData.program, formData.specialization, activeTab, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseCheckboxChange = (semIndex, courseId, isChecked) => {
    const updated = [...formData.semesters];
    const courseList = new Set(updated[semIndex].courses);

    if (isChecked) {
      courseList.add(courseId);
    } else {
      courseList.delete(courseId);
    }

    updated[semIndex].courses = Array.from(courseList);
    setFormData({ ...formData, semesters: updated });
  };

  const handleSemesterNameChange = (index, value) => {
    const updated = [...formData.semesters];
    updated[index].semester = value;
    setFormData({ ...formData, semesters: updated });
  };

  const handleSubmit = async () => {
    const payload = {
      program: formData.program,
      specialization: formData.specialization,
      deptId: formData.deptName,
      semesters: formData.semesters,
    };

    try {
      let response;
      if (activeTab === "add") {
        response = await axios.post(
          "http://localhost:5000/api/admin/add-curriculum",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (activeTab === "update") {
        response = await axios.patch(
          "http://localhost:5000/api/admin/update-curriculum",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (activeTab === "delete") {
        response = await axios.delete(
          "http://localhost:5000/api/admin/delete-curriculum",
          {
            headers: { Authorization: `Bearer ${token}` },
            data: {
              program: formData.program,
              specialization: formData.specialization,
            },
          }
        );
      }
      alert(response.data.message);
    } catch (err) {
      alert("Error: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl text-white mx-auto shadow rounded-md space-y-6">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "add"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800 hover:bg-green-200"
          }`}
        >
          Add
        </button>
        <button
          onClick={() => setActiveTab("update")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "update"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
        >
          Update
        </button>
        <button
          onClick={() => setActiveTab("delete")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "delete"
              ? "bg-red-600 text-white"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          }`}
        >
          Delete
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          name="program"
          placeholder="Program"
          value={formData.program}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {(activeTab === "add" || activeTab === "update") && (
          <>
            <select
              name="deptName"
              value={formData.deptName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.deptName}
                </option>
              ))}
            </select>

            {formData.semesters.map((sem, i) => (
              <div key={i} className="mb-4 border p-4 rounded ">
                <input
                  type="text"
                  placeholder="Semester Name (e.g:1)"
                  value={sem.semester}
                  onChange={(e) => handleSemesterNameChange(i, e.target.value)}
                  className="mb-4 w-full px-3 py-2 border rounded"
                />
                <div className="mb-2 font-semibold">Select Courses</div>
                <div className="grid grid-cols-2 gap-2  border rounded p-2">
                  {courses.map((course) => (
                    <label key={course._id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={sem.courses.includes(course._id)}
                        onChange={(e) =>
                          handleCourseCheckboxChange(
                            i,
                            course._id,
                            e.target.checked
                          )
                        }
                      />
                      {course.CourseName}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 font-bold"
        >
          {activeTab.toUpperCase()} Curriculum
        </button>
      </div>
    </div>
  );
};

export default CurriculumManagement;
