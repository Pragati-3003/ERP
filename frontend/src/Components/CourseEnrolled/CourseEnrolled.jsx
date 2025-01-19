import React from "react";

const CourseEnrolled = () => {
  const data = {
    semesters: [
      {
        semester: 1,
        courses: [
          {
            course_code: "PHY101",
            course_name: "Physics I",
            credits: 3,
            instructor: "Dr. Richard Feynman",
            L: 3,
            T: 1,
            P: 0,
          },
          {
            course_code: "MATH101",
            course_name: "Calculus I",
            credits: 4,
            instructor: "Dr. Carl Gauss",
            L: 3,
            T: 1,
            P: 2,
          },
          {
            course_code: "CSE101",
            course_name: "Introduction to Programming",
            credits: 3,
            instructor: "Prof. Donald Knuth",
            L: 2,
            T: 1,
            P: 2,
          },
        ],
      },
      {
        semester: 2,
        courses: [
          {
            course_code: "PHY102",
            course_name: "Physics II",
            credits: 3,
            instructor: "Dr. Richard Feynman",
            L: 3,
            T: 1,
            P: 0,
          },
          {
            course_code: "MATH102",
            course_name: "Calculus II",
            credits: 4,
            instructor: "Dr. Carl Gauss",
            L: 3,
            T: 1,
            P: 2,
          },
          {
            course_code: "CSE102",
            course_name: "Object-Oriented Programming",
            credits: 3,
            instructor: "Prof. Barbara Liskov",
            L: 2,
            T: 1,
            P: 2,
          },
        ],
      },
      {
        semester: 3,
        courses: [
          {
            course_code: "MATH201",
            course_name: "Mathematics III",
            credits: 4,
            instructor: "Dr. Alan Turing",
            L: 3,
            T: 1,
            P: 0,
          },
          {
            course_code: "CSE202",
            course_name: "Data Structures",
            credits: 3,
            instructor: "Prof. Grace Hopper",
            L: 2,
            T: 1,
            P: 2,
          },
          {
            course_code: "PHY203",
            course_name: "Electromagnetic Theory",
            credits: 3,
            instructor: "Dr. Nikola Tesla",
            L: 3,
            T: 1,
            P: 1,
          },
        ],
      },
      {
        semester: 4,
        courses: [
          {
            course_code: "MATH201",
            course_name: "Mathematics III",
            credits: 4,
            instructor: "Dr. Alan Turing",
            L: 3,
            T: 1,
            P: 0,
          },
          {
            course_code: "CSE202",
            course_name: "Data Structures",
            credits: 3,
            instructor: "Prof. Grace Hopper",
            L: 2,
            T: 1,
            P: 2,
          },
          {
            course_code: "PHY203",
            course_name: "Electromagnetic Theory",
            credits: 3,
            instructor: "Dr. Nikola Tesla",
            L: 3,
            T: 1,
            P: 1,
          },
          {
            course_code: "PHY203",
            course_name: "Electromagnetic Theory",
            credits: 3,
            instructor: "Dr. Nikola Tesla",
            L: 3,
            T: 1,
            P: 1,
          },
        ],
      },
      {
        semester: 5,
        courses: [
          {
            course_code: "MATH201",
            course_name: "Mathematics III",
            credits: 4,
            instructor: "Dr. Alan Turing",
            L: 3,
            T: 1,
            P: 0,
          },
          {
            course_code: "CSE202",
            course_name: "Data Structures",
            credits: 3,
            instructor: "Prof. Grace Hopper",
            L: 2,
            T: 1,
            P: 2,
          },
          {
            course_code: "PHY203",
            course_name: "Electromagnetic Theory",
            credits: 3,
            instructor: "Dr. Nikola Tesla",
            L: 3,
            T: 1,
            P: 1,
          },
        ],
      },
      {
        semester: 6,
        courses: [
          {
            course_code: "MATH201",
            course_name: "Mathematics III",
            credits: 4,
            instructor: "Dr. Alan Turing",
            L: 3,
            T: 1,
            P: 0,
          },
          {
            course_code: "CSE202",
            course_name: "Data Structures",
            credits: 3,
            instructor: "Prof. Grace Hopper",
            L: 2,
            T: 1,
            P: 2,
          },
          {
            course_code: "PHY203",
            course_name: "Electromagnetic Theory",
            credits: 3,
            instructor: "Dr. Nikola Tesla",
            L: 3,
            T: 1,
            P: 1,
          },
          {
            course_code: "PHY203",
            course_name: "Electromagnetic Theory",
            credits: 3,
            instructor: "Dr. Nikola Tesla",
            L: 3,
            T: 1,
            P: 1,
          },
          {
            course_code: "PHY203",
            course_name: "Electromagnetic Theory",
            credits: 3,
            instructor: "Dr. Nikola Tesla",
            L: 3,
            T: 1,
            P: 1,
          },
          {
            course_code: "PHY203",
            course_name: "Electromagnetic Theory",
            credits: 3,
            instructor: "Dr. Nikola Tesla",
            L: 3,
            T: 1,
            P: 1,
          },
          {
            course_code: "PHY203",
            course_name: "Electromagnetic Theory",
            credits: 3,
            instructor: "Dr. Nikola Tesla",
            L: 3,
            T: 1,
            P: 1,
          },
          {
            course_code: "PHY203",
            course_name: "Electromagnetic Theory",
            credits: 3,
            instructor: "Dr. Nikola Tesla",
            L: 3,
            T: 1,
            P: 1,
          },
          {
            course_code: "PHY203",
            course_name: "Electromagnetic Theory",
            credits: 3,
            instructor: "Dr. Nikola Tesla",
            L: 3,
            T: 1,
            P: 1,
          },
        ],
      },
    ],
  };

  const [semester, setSemester] = React.useState(1);

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Enrolled Courses
        </h1>
        <p className="text-lg text-gray-600">
          Explore your current semester's courses
        </p>
      </div>

      {/* Semester Selector */}
      <div className="flex justify-end items-center mb-6">
        <label
          htmlFor="semester"
          className="mr-3 text-lg font-medium text-gray-700"
        >
          Select Semester:
        </label>
        <select
          id="semester"
          className="border border-gray-300 bg-white text-gray-800 rounded-lg px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="" disabled>
            -- Select Semester --
          </option>
          {data.semesters.map((sem, index) => (
            <option key={index} value={sem.semester}>
              Semester {sem.semester}
            </option>
          ))}
        </select>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.semesters[semester - 1]?.courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-t-4 border-blue-500 ml-4 mb-4"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {course.course_name}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              <strong>Code:</strong> {course.course_code}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              <strong>Instructor:</strong> {course.instructor}
            </p>
            <div className="flex justify-between text-gray-700 text-sm">
              <div>
                <strong>Credits:</strong> {course.credits}
              </div>
              <div>
                <strong>L:</strong> {course.L} <strong>T:</strong> {course.T}{" "}
                <strong>P:</strong> {course.P}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseEnrolled;
