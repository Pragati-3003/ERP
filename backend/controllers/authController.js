const User = require("../models/user.model.js");
const Student = require("../models/student.model.js");
const Teacher = require("../models/teacher.model.js");
const Admin = require("../models/admin.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const createUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ UserID: uuidv4(), Email: email, Password: hashedPassword, Role: role });
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    try {
        const user = await User.findOne({ Email: email });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const ismatch = await bcrypt.compare(password, user.Password);
        if (!ismatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //Generating JWT token
        const token = jwt.sign({
            id: user._id,
            role: user.Role,
        }, process.env.JWT_SECRET, { expiresIn: "1h" })
        console.log("User logged in");
        let userInfo = null;
        if (user.Role === "Student") {
            userInfo = await Student.findOne({ UserID: user._id })
        }
        if (user.Role === "Teacher")
            userInfo = await Teacher.findOne({ UserID: user._id });
        if (user.Role === "Admin")
            userInfo = await Admin.findOne({ UserID: user._id });
        // console.log(userInfo);
        return res.status(200).json({
            token, user: {
                id: user._id,
                LastName: user.LastName ,
                firstName: user.FirstName,
                email: user.Email,
                role: user.Role,
                userInfo
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// @desc Update password
// @route PATCH /api/auth/update-password
// @access Private (Only logged-in user)
const updatePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // 🟢 Fetch user by email
        const user = await User.findOne({ Email:email }).select("+password");
        if (!user) return res.status(404).json({ message: "User not found" });

        // 🟢 Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.Password); // ✅ Fix: lowercase 'password'
        if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

        // 🟢 Hash new password
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(newPassword, salt);

        // 🟢 Save updated password
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
  

module.exports = {updatePassword, loginUser, createUser };