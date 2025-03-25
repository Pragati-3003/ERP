import { useState } from 'react';

export default function TeacherTimetable() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [timetableImage, setTimetableImage] = useState('');

  const courses = [
    'CS101 Introduction to Programming',
    'CS102 Data Structures',
    'CS103 Algorithms',
    'CS104 Data Communication and Networks',
    'CS105 Database Management Systems',
  ];

  const courseImages = {
    'CS101 Introduction to Programming': '/images/cs101_timetable.jpg',
    'CS102 Data Structures': '/images/cs102_timetable.jpg',
    'CS103 Algorithms': '/images/cs103_timetable.jpg',
    'CS104 Data Communication and Networks': '/images/cs104_timetable.jpg',
    'CS105 Database Management Systems': '/images/cs105_timetable.jpg',
  };

  const handleCourseChange = (e) => {
    const course = e.target.value;
    setSelectedCourse(course);
    setTimetableImage(courseImages[course] || '');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Timetable</h1>

      <div className="flex justify-center mb-8">
        <select
          value={selectedCourse}
          onChange={handleCourseChange}
          className="p-2 rounded bg-gray-800"
        >
          <option value="">Select Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>{course}</option>
          ))}
        </select>
      </div>

      {timetableImage && (
        <div className="flex justify-center">
          <img src={timetableImage} alt="Timetable" className="rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}
