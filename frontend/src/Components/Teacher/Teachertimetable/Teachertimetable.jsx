// import { useState } from 'react';

// export default function TeacherTimetable() {
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [timetableImage, setTimetableImage] = useState('');

//   const courses = [
//     'CS101 Introduction to Programming',
//     'CS102 Data Structures',
//     'CS103 Algorithms',
//     'CS104 Data Communication and Networks',
//     'CS105 Database Management Systems',
//   ];

//   const courseImages = {
//     'CS101 Introduction to Programming': '/images/cs101_timetable.jpg',
//     'CS102 Data Structures': '/images/cs102_timetable.jpg',
//     'CS103 Algorithms': '/images/cs103_timetable.jpg',
//     'CS104 Data Communication and Networks': '/images/cs104_timetable.jpg',
//     'CS105 Database Management Systems': '/images/cs105_timetable.jpg',
//   };

//   const handleCourseChange = (e) => {
//     const course = e.target.value;
//     setSelectedCourse(course);
//     setTimetableImage(courseImages[course] || '');
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">Timetable</h1>

//       <div className="flex justify-center mb-8">
//         <select
//           value={selectedCourse}
//           onChange={handleCourseChange}
//           className="p-2 rounded bg-gray-800"
//         >
//           <option value="">Select Course</option>
//           {courses.map((course, index) => (
//             <option key={index} value={course}>{course}</option>
//           ))}
//         </select>
//       </div>

//       {timetableImage && (
//         <div className="flex justify-center">
//           <img src={timetableImage} alt="Timetable" className="rounded-lg shadow-lg" />
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

const Teachertimetable = () => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Provide Token");
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/teacher/getTimeTable",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        settimetable(res.data.pdfURL);
      } catch (error) {
        console.error("Error fetching timetable:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-6">University Timetable</h1>

      {loading ? (
        <p>Loading...</p>
      ) : timetable ? (
        <div>
          <embed
            src={`http://localhost:5000/${timetable}`}
            type="application/pdf"
            width="100%"
            height="600px"
          />
          <p className="mt-2 text-green-600">Timetable loaded successfully!</p>
        </div>
      ) : (
        <p className="text-red-500">No timetable available for your account.</p>
      )}
    </div>
  );
};

export default Teachertimetable;
