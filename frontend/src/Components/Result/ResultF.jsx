import React, { useState } from 'react';
import './CheckSemesterResult.css'; // Add this if you plan to use external CSS

const CheckSemesterResult = () => {
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState('');
  const [isResultVisible, setIsResultVisible] = useState(false);

  const handleInputChange = (e) => {
    setStudentId(e.target.value);
  };

  const showResult = () => {
    if (studentId === '') {
      alert('Please enter your Student ID');
      return;
    }

    // Mock result for demonstration purposes
    const mockResults = {
      '12345': 'Passed with Distinction',
      '67890': 'Passed',
      '11111': 'Failed',
    };

    const resultText = mockResults[studentId] || 'No result found for the entered ID';
    setResult(`Student ID: ${studentId} - ${resultText}`);
    setIsResultVisible(true);
  };

  return (
    <div className="check-semester-result">
      <div className="navbar">
        <a href="file:///C:/Users/Lenovo/OneDrive/Desktop/result.html" className="back-icon">
          &#8592;
        </a>
        <h1>Check Semester Result</h1>
      </div>

      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Personal Information</a></li>
          <li><a href="#">Results</a></li>
          <li><a href="#">Attendance</a></li>
          <li><a href="#">Courses</a></li>
          <li><a href="#">Notices</a></li>
          <li><a href="#">Fee Structure</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </div>

      <div className="main-content">
        <div className="result-form">
          <h2>Enter Your Student ID</h2>
          <input
            type="text"
            value={studentId}
            onChange={handleInputChange}
            placeholder="Enter Student ID"
          />
          <button onClick={showResult}>View Result</button>
        </div>
        {isResultVisible && (
          <div className="result-display">
            <h3>Result Details</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckSemesterResult;
