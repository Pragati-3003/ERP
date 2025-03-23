import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AdminProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  const email = useSelector((state) => state.auth.user?.userInfo?.Email); // Ensure safety

  useEffect(() => {
    if (!email) return; // Prevent API call if email is not available

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/getAdminProfilebyEmail/${email}`, // ✅ Pass email as URL param
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchData();
  }, [token, email]); // ✅ Add email dependency

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      console.log("Submitting form data...");
      const response = await axios.patch(
        "http://localhost:5000/api/admin/updateProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);

      setProfilePicture(null);

      // Fetch the updated profile data
      const updatedProfileResponse = await axios.get(
        `http://localhost:5000/api/admin/getAdminProfilebyEmail/${email}`, // ✅ Correct API call
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserInfo(updatedProfileResponse.data);

      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePicture(file);

    // Preview the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setUserInfo((prev) => ({ ...prev, ProfilePic: reader.result }));
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
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="input-field"
            value={userInfo?.Name || ""} // ✅ Prevents null error
            name="fname"
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, Name: e.target.value }))
            }
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="input-field"
            name="email"
            value={userInfo?.Email || ""}
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, Email: e.target.value }))
            }
            disabled={!editMode}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <input
            type="text"
            className="input-field"
            name="phnum"
            value={userInfo?.Gender || ""}
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, Gender: e.target.value }))
            }
            disabled={!editMode}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
           Address
          </label>
          <input
            type="text"
            className="input-field"
            name="phnum"
            value={userInfo?.Address || ""}
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, Address: e.target.value }))
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
            value={userInfo?.PhoneNumber || ""}
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, PhoneNumber: e.target.value }))
            }
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            DOB
          </label>
          <input
            type="text"
            className="input-field"
            name="phnum"
            value={userInfo?.DOB || ""}
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, DOB: e.target.value }))
            }
            disabled={!editMode}
          />
        </div>
         
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Work Experience
          </label>
          <input
            type="text"
            className="input-field"
            value={userInfo?.WorkExperience || ""}
            name="yrstdy"
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                WorkExperience: e.target.value,
              }))
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

export default AdminProfile;
