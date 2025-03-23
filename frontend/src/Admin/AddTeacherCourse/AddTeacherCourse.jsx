import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTeacherCourse = () => {
    const [activeTab, setActiveTab] = useState("add");
    const [teacherEmail, setTeacherEmail] = useState("");
    const [formData, setFormData] = useState({ courseName: "", courseCode: "", program: "", specialization: "" });
    const [assignedCourses, setAssignedCourses] = useState([]);

    // Fetch assigned courses
    const fetchAssignedCourses = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Provide Token");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/get-courses-teacher/${teacherEmail}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data);
            // setTeacherEmail("");
            setAssignedCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        if (teacherEmail) fetchAssignedCourses();
    }, [teacherEmail]);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add course
    const handleAddCourse = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Provide Token");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/admin/add-course-teacher", { teacherEmail, ...formData }, { headers: { Authorization: `Bearer ${token}` } });
            alert("Course assigned successfully!");
            fetchAssignedCourses();
        } catch (err) {
            alert("Error assigning course");
        }
    };

    // Update course
    const handleUpdateCourse = async (courseId) => {
        const newCourseCode = prompt("Enter new course code:");
        if (!newCourseCode) return;
        try {
            await axios.put("http://localhost:5000/api/admin/update-course-teacher", { teacherEmail, courseId, newCourseCode });
            alert("Course updated successfully!");
            fetchAssignedCourses();
        } catch (err) {
            alert("Error updating course");
        }
    };

    // Delete course
    const handleDeleteCourse = async (courseId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Provide Token");
            return;
        }
        try {
            await axios.delete(`http://localhost:5000/api/admin/delete-course-teacher/${teacherEmail}/${courseId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Course deleted successfully!");
            setTeacherEmail("");
            fetchAssignedCourses();
        } catch (err) {
            alert("Error deleting course");
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Teacher Course Management</h2>

            <div className="flex mb-6">
                {['add', 'delete'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} rounded-md mx-1`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)} Course
                    </button>
                ))}
            </div>

            <div>
                {activeTab === "add" && (
                    <form onSubmit={handleAddCourse} className="space-y-4">
                        <input type="email" placeholder="Teacher Email" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} className="w-full px-4 py-2 border rounded" required />
                        {Object.keys(formData).map((field) => (
                            <input key={field} type="text" name={field} value={formData[field]} onChange={handleChange} placeholder={`Enter ${field}`} className="w-full px-4 py-2 border rounded" required />
                        ))}
                        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Assign Course</button>
                    </form>
                )}

                {/* {activeTab === "update" && (
                    <div>
                        <input type="email" placeholder="Teacher Email" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} className="w-full px-4 py-2 border rounded mb-4" />
                        <button onClick={fetchAssignedCourses} className="w-full bg-blue-500 text-white py-2 rounded mb-4">Fetch Courses</button>
                        {assignedCourses.length > 0 &&
                            assignedCourses.map((course) => (
                                <div key={course.course?._id} className="flex justify-between border-b py-2">
                                    <span>{course.course?.CourseCode || "N/A"} ({course.course?.CourseName || "N/A"})</span>
                                    <span>{course.curriculum?.program || "N/A"} ({course.curriculum?.specialization || "N/A"})</span>
                                    <button
                                        onClick={() => handleUpdateCourse(course.course?._id)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            ))}

                    </div>
                )} */}

                {activeTab === "delete" && (
                    <div>
                        <input type="email" placeholder="Teacher Email" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} className="w-full px-4 py-2 border rounded mb-4" />
                        <button onClick={fetchAssignedCourses} className="w-full bg-red-500 text-white py-2 rounded mb-4">Fetch Courses</button>
                        {assignedCourses.length > 0 &&
                            assignedCourses.map((course) => (
                                <div key={course.course?._id} className="flex justify-between border-b py-2">
                                    <span>{course.course?.CourseCode || "N/A"} ({course.course?.CourseName || "N/A"})</span>
                                    <span>{course.curriculum?.program || "N/A"} ({course.curriculum?.specialization || "N/A"})</span>
                                    <button
                                        onClick={() => handleDeleteCourse(course?._id)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddTeacherCourse;
