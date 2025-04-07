// import React, { useState } from 'react';

// const TeacherProfile = () => {
//   // Editable teacher data
//   const [teacher, setTeacher] = useState({
//     FirstName: 'Grace',
//     LastName: 'Hopper',
//     Email: 'grace.hopper@example.com',
//     PhoneNumber: '123-456-7890',
//     Address: '123 Main St, NY',
//     Designation: 'Associate Professor',
//     Specialization: 'Computer Science',
//     Gender: 'Female',
//     Qualification: 'PhD in Computer Science',
//     ExperienceYears: 15,
//     DOB: '1920-12-09',
//     EmploymentType: 'Full-Time',
//     SalaryStatus: 'Active',
//     DeptID: 'CS101'
//   });

//   const [image, setImage] = useState(null);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTeacher({ ...teacher, [name]: value });
//   };

//   // Handle image upload
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="container mx-auto p-8 dark:bg-gray-900 dark:text-white">
//       <h1 className="text-4xl font-extrabold text-center mb-10 text-white">Teacher Information</h1>

//       <div className="flex flex-col items-center">
//         <div className="mb-8 relative flex items-center" style={{ marginRight: '50px' }}>
//           {/* Image upload section */}
//           {image ? (
//             <img src={image} alt="Profile" className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover" />
//           ) : (
//             <div className="w-32 h-32 rounded-full border-4 border-blue-500 bg-gray-700"></div>
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="ml-4 text-white"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
//           <div>
//             <label className="text-lg text-white"><strong>First Name:</strong></label>
//             <input
//               type="text"
//               name="FirstName"
//               value={teacher.FirstName}
//               onChange={handleChange}
//               className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
//             />

//             <label className="text-lg mt-4 text-white"><strong>Last Name:</strong></label>
//             <input
//               type="text"
//               name="LastName"
//               value={teacher.LastName}
//               onChange={handleChange}
//               className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
//             />

//             <label className="text-lg mt-4 text-white"><strong>Email:</strong></label>
//             <input
//               type="email"
//               name="Email"
//               value={teacher.Email}
//               onChange={handleChange}
//               className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
//             />

//             <label className="text-lg mt-4 text-white"><strong>Phone Number:</strong></label>
//             <input
//               type="text"
//               name="PhoneNumber"
//               value={teacher.PhoneNumber}
//               onChange={handleChange}
//               className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
//             />

//             <label className="text-lg mt-4 text-white"><strong>Address:</strong></label>
//             <input
//               type="text"
//               name="Address"
//               value={teacher.Address}
//               onChange={handleChange}
//               className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
//             />
//           </div>

//           <div>
//             <label className="text-lg text-white"><strong>Designation:</strong></label>
//             <input
//               type="text"
//               name="Designation"
//               value={teacher.Designation}
//               onChange={handleChange}
//               className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
//             />

//             <label className="text-lg mt-4 text-white"><strong>Specialization:</strong></label>
//             <input
//               type="text"
//               name="Specialization"
//               value={teacher.Specialization}
//               onChange={handleChange}
//               className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
//             />

//             <label className="text-lg mt-4 text-white"><strong>Gender:</strong></label>
//             <select
//               name="Gender"
//               value={teacher.Gender}
//               onChange={handleChange}
//               className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
//             >
//               <option value="Female">Female</option>
//               <option value="Male">Male</option>
//               <option value="Other">Other</option>
//             </select>

//             <label className="text-lg mt-4 text-white"><strong>Employment Type:</strong></label>
//             <input
//               type="text"
//               name="EmploymentType"
//               value={teacher.EmploymentType}
//               onChange={handleChange}
//               className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
//             />

//             <div className="flex gap-8 mt-4">
//               <div>
//                 <label className="text-lg text-white"><strong>Experience (Years):</strong></label>
//                 <input
//                   type="number"
//                   name="ExperienceYears"
//                   value={teacher.ExperienceYears}
//                   onChange={handleChange}
//                   className="block w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
//                 />
//               </div>

//               <div>
//                 <label className="text-lg text-white"><strong>Date of Birth:</strong></label>
//                 <input
//                   type="date"
//                   name="DOB"
//                   value={teacher.DOB}
//                   onChange={handleChange}
//                   className="block w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <button className="mt-10 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition">Save Changes</button>
//       </div>
//     </div>
//   );
// };

// export default TeacherProfile;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const TeacherProfile = () => {
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
          `http://localhost:5000/api/teacher/getTeacherProfilebyEmail/${email}`, // ✅ Pass email as URL param
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
        "http://localhost:5000/api/teacher/updateProfile",
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
        `http://localhost:5000/api/teacher/getTeacherProfilebyEmail/${email}`, // ✅ Correct API call
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
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="input-field"
            value={userInfo?.teacherName || ""} // ✅ Prevents null error
            name="fname"
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, Name: e.target.value }))
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
            Qualification
          </label>
          <input
            type="text"
            className="input-field"
            name="phnum"
            value={userInfo?.Qualification || ""}
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
          <label className="block text-sm font-medium text-gray-700">DOB</label>
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
            value={userInfo?.ExperienceYears || ""}
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

export default TeacherProfile;
