import React, { useState } from 'react';

const TeacherProfile = () => {
  // Editable teacher data
  const [teacher, setTeacher] = useState({
    FirstName: 'Grace',
    LastName: 'Hopper',
    Email: 'grace.hopper@example.com',
    PhoneNumber: '123-456-7890',
    Address: '123 Main St, NY',
    Designation: 'Associate Professor',
    Specialization: 'Computer Science',
    Gender: 'Female',
    Qualification: 'PhD in Computer Science',
    ExperienceYears: 15,
    DOB: '1920-12-09',
    EmploymentType: 'Full-Time',
    SalaryStatus: 'Active',
    DeptID: 'CS101'
  });

  const [image, setImage] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-white">Teacher Information</h1>

      <div className="flex flex-col items-center">
        <div className="mb-8 relative flex items-center" style={{ marginRight: '50px' }}>
          {/* Image upload section */}
          {image ? (
            <img src={image} alt="Profile" className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover" />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-blue-500 bg-gray-700"></div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="ml-4 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
          <div>
            <label className="text-lg text-white"><strong>First Name:</strong></label>
            <input
              type="text"
              name="FirstName"
              value={teacher.FirstName}
              onChange={handleChange}
              className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />

            <label className="text-lg mt-4 text-white"><strong>Last Name:</strong></label>
            <input
              type="text"
              name="LastName"
              value={teacher.LastName}
              onChange={handleChange}
              className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />

            <label className="text-lg mt-4 text-white"><strong>Email:</strong></label>
            <input
              type="email"
              name="Email"
              value={teacher.Email}
              onChange={handleChange}
              className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />

            <label className="text-lg mt-4 text-white"><strong>Phone Number:</strong></label>
            <input
              type="text"
              name="PhoneNumber"
              value={teacher.PhoneNumber}
              onChange={handleChange}
              className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />

            <label className="text-lg mt-4 text-white"><strong>Address:</strong></label>
            <input
              type="text"
              name="Address"
              value={teacher.Address}
              onChange={handleChange}
              className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="text-lg text-white"><strong>Designation:</strong></label>
            <input
              type="text"
              name="Designation"
              value={teacher.Designation}
              onChange={handleChange}
              className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />

            <label className="text-lg mt-4 text-white"><strong>Specialization:</strong></label>
            <input
              type="text"
              name="Specialization"
              value={teacher.Specialization}
              onChange={handleChange}
              className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />

            <label className="text-lg mt-4 text-white"><strong>Gender:</strong></label>
            <select
              name="Gender"
              value={teacher.Gender}
              onChange={handleChange}
              className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>

            <label className="text-lg mt-4 text-white"><strong>Employment Type:</strong></label>
            <input
              type="text"
              name="EmploymentType"
              value={teacher.EmploymentType}
              onChange={handleChange}
              className="block w-full p-2 mt-1 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />

            <div className="flex gap-8 mt-4">
              <div>
                <label className="text-lg text-white"><strong>Experience (Years):</strong></label>
                <input
                  type="number"
                  name="ExperienceYears"
                  value={teacher.ExperienceYears}
                  onChange={handleChange}
                  className="block w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-lg text-white"><strong>Date of Birth:</strong></label>
                <input
                  type="date"
                  name="DOB"
                  value={teacher.DOB}
                  onChange={handleChange}
                  className="block w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <button className="mt-10 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition">Save Changes</button>
      </div>
    </div>
  );
};

export default TeacherProfile;
