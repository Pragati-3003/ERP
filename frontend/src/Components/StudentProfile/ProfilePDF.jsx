import React, { forwardRef } from 'react';

const ProfilePDF = forwardRef(({ userInfo }, ref) => {
  return (
    <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#2563eb' }}>{userInfo.Name}</h2>
      <p style={{ textAlign: 'center', color: '#777' }}>{userInfo.Email}</p>

      <h3 style={{ borderBottom: '1px solid #ddd', marginTop: '20px' }}>Personal Information</h3>
      <p><strong>Enrollment Number:</strong> {userInfo.EnrollmentNumber}</p>
      <p><strong>Branch:</strong> {userInfo.Branch}</p>
      <p><strong>Year of Study:</strong> {userInfo.Year}</p>

      <h3 style={{ borderBottom: '1px solid #ddd', marginTop: '20px' }}>Contact Information</h3>
      <p><strong>Email:</strong> {userInfo.Email}</p>
      <p><strong>Phone:</strong> {userInfo.Phone}</p>

      <h3 style={{ borderBottom: '1px solid #ddd', marginTop: '20px' }}>Skills</h3>
      <ul>
        {userInfo.Skills.map((skill, index) => (
          <li key={index}>✅ {skill}</li>
        ))}
      </ul>

      <h3 style={{ borderBottom: '1px solid #ddd', marginTop: '20px' }}>Achievements</h3>
      <ul>
        {userInfo.Achievements.map((achievement, index) => (
          <li key={index}>🏆 {achievement}</li>
        ))}
      </ul>
    </div>
  );
});

export default ProfilePDF;
