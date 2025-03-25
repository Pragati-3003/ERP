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
    <div className="container mx-auto mt-8 px-4 overflow-x-auto dark:bg-gray-900 dark:text-white">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold">Courses Allocated</h1>
        <p className="text-xl mt-2">
          Courses assigned to {data.teacher.name}, {data.teacher.designation}
        </p>
      </div>

      {/* Session Info */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium">
          Session: <span className="font-bold text-blue-500 dark:text-blue-300">July-Dec 2024-2025</span>
        </h1>
      </div>

      {/* Table Section */}
      <div className="p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-x-auto mb-8">
        <table className="min-w-full border-collapse rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-700 text-white dark:bg-blue-600">
              <th className="py-3 px-6 text-left text-sm font-semibold">Program</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Semester</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Course Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Course Code</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Department</th>
            </tr>
          </thead>
          <tbody>
            {data.courses.length > 0 ? (
              data.courses.map((course, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300`}
                >
                  <td className="py-4 px-6 text-sm">{course.program}</td>
                  <td className="py-4 px-6 text-sm">{course.semester}</td>
                  <td className="py-4 px-6 text-sm">{course.course_name}</td>
                  <td className="py-4 px-6 text-sm">{course.course_code}</td>
                  <td className="py-4 px-6 text-sm">{course.department}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 px-4 text-center font-medium"
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
