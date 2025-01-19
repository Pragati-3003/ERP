import React from 'react';

const CourseAllocated = () => {
  const data = {
    teacher: {
      name: "Prof. Grace Hopper",
      designation: "Associate Professor",
    },
    courses: [
      {
        course_name: "Data Structures",
        course_code: "CSE202",
        semester: 3,
        department: "Computer Science",
        program: "MCA",
      },
      {
        course_name: "Operating Systems",
        course_code: "CSE301",
        semester: 5,
        department: "Computer Science",
        program: "B.Tech CS",
      },
      {
        course_name: "Mathematics III",
        course_code: "MATH201",
        semester: 3,
        department: "Mathematics",
        program: "BCA",
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Courses Allocated</h1>
        <p className="text-xl text-gray-600 mt-2">
          Courses assigned to {data.teacher.name}, {data.teacher.designation}
        </p>
      </div>

      {/* Session Info */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium text-gray-700">
          Session: <span className="font-bold text-blue-700">July-Dec 2024-2025</span>
        </h1>
      </div>

      {/* Table Section */}
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <table className="min-w-full border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">Program</th>
              <th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">Semester</th>
              <th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">Course Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">Course Code</th>
              <th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">Department</th>
            </tr>
          </thead>
          <tbody>
            {data.courses.length > 0 ? (
              data.courses.map((course, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors duration-300`}
                >
                  <td className="py-4 px-6 text-sm text-gray-700">{course.program}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{course.semester}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{course.course_name}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{course.course_code}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{course.department}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 px-4 text-center text-gray-500 font-medium"
                >
                  No courses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseAllocated;
