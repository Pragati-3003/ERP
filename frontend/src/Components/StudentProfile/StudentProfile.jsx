import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
const StudentProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/student/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchData();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      console.log("Submitting form data...");
      const response = await axios.patch(
        "http://localhost:5000/api/student/updateProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);

      // Reset the profile picture state
      setProfilePicture(null);

      // Fetch the updated profile data
      const updatedProfileResponse = await axios.get(
        "http://localhost:5000/api/student/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserInfo(updatedProfileResponse.data);

      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      //   alert("Failed to update profile. Please try again.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePicture(file);

    // Preview the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setUserInfo({ ...userInfo, ProfilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  if (!userInfo) return <h2>Loading...</h2>;

  return (
    <div className="container mx-auto mt-8 p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
        My Profile
      </h1>

      {/* Profile Picture */}
      <div className="text-center mb-4">
        <img
          src={
            profilePicture
              ? URL.createObjectURL(profilePicture)
              : `http://localhost:5000/${userInfo.ProfilePic}`
          }
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="mt-2"
          />
        )}
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Personal Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            className="input-field"
            value={userInfo.FirstName}
            name="fname"
            onChange={(e) =>
              setUserInfo({ ...userInfo, FirstName: e.target.value })
            }
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            className="input-field"
            name="lname"
            value={userInfo.LastName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, LastName: e.target.value })
            }
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="input-field"
            name="email"
            value={userInfo.Email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, Email: e.target.value })
            }
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            className="input-field"
            name="phnum"
            value={userInfo.PhoneNumber}
            onChange={(e) =>
              setUserInfo({ ...userInfo, PhoneNumber: e.target.value })
            }
            disabled={!editMode}
          />
        </div>

        {/* Guardian Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Father's Name
          </label>
          <input
            type="text"
            className="input-field"
            name="fathername"
            value={userInfo.FatherName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, FatherName: e.target.value })
            }
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mother's Name
          </label>
          <input
            type="text"
            className="input-field"
            name="mothername"
            value={userInfo.MotherName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, MotherName: e.target.value })
            }
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Guardian Email
          </label>
          <input
            type="email"
            className="input-field"
            name="gdmail"
            value={userInfo.GuardianEmail}
            onChange={(e) =>
              setUserInfo({ ...userInfo, GuardianEmail: e.target.value })
            }
            disabled={!editMode}
          />
        </div>

        {/* Academic Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enrollment Number
          </label>
          <input
            type="text"
            className="input-field "
            name="elnum"
            value={userInfo.EnrollmentNumber}
            onChange={(e) =>
              setUserInfo({ ...userInfo, EnrollmentNumber: e.target.value })
            }
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department ID
          </label>
          <input
            type="text"
            className="input-field"
            value={userInfo.DeptID}
            name="deptid"
            onChange={(e) =>
              setUserInfo({ ...userInfo, DeptID: e.target.value })
            }
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year of Study
          </label>
          <input
            type="text"
            className="input-field"
            value={userInfo.YearOfStudy}
            name="yrstdy"
            onChange={(e) =>
              setUserInfo({ ...userInfo, YearOfStudy: e.target.value })
            }
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Semester
          </label>
          <input
            type="text"
            className="input-field"
            name="sem"
            value={userInfo.Semester}
            onChange={(e) =>
              setUserInfo({ ...userInfo, Semester: e.target.value })
            }
            disabled={!editMode}
          />
        </div>

        {/* ✅ Toggle Button */}
        <div className="col-span-2 text-center mt-4">
          {editMode ? (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
