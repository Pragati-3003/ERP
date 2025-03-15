import React from 'react';

const Profile = ({ userInfo }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-2 text-center">
        <img
          src={userInfo.ProfilePic || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold">{userInfo.FirstName} {userInfo.LastName}</h2>
        <p className="text-gray-500">{userInfo.Email}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <p><strong>Enrollment Number:</strong> {userInfo.EnrollmentNumber}</p>
        <p><strong>Smart ID:</strong> {userInfo.smartID}</p>
        <p><strong>Gender:</strong> {userInfo.Gender}</p>
        <p><strong>DOB:</strong> {new Date(userInfo.DOB).toLocaleDateString()}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <p><strong>Phone Number:</strong> {userInfo.PhoneNumber}</p>
        <p><strong>Scholarship:</strong> {userInfo.Scholarship || 'N/A'}</p>
        <p><strong>Attendance Status:</strong> {userInfo.AttendanceStatus || 'N/A'}</p>
        <p><strong>Hostel Name:</strong> {userInfo.HostelName || 'N/A'}</p>
      </div>

      <div className="col-span-2 bg-blue-100 p-4 rounded-md">
        <h3 className="font-semibold text-lg">Guardian Details</h3>
        <p><strong>Father's Name:</strong> {userInfo.FatherName}</p>
        <p><strong>Mother's Name:</strong> {userInfo.MotherName}</p>
        <p><strong>Guardian Email:</strong> {userInfo.GuardianEmail}</p>
      </div>
    </div>
  );
};

export default Profile;
