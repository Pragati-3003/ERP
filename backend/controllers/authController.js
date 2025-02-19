const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const createUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({    UserID: uuidv4(),Email: email, Password: hashedPassword, Role: role });
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ Email: email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const ismatch = await bcrypt.compare(password, user.Password);
        // const ismatch = password === user.Password;
        if (!ismatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //Generating JWT token
        const token = jwt.sign({
            id: user._id,
            role: user.Role,
        }, process.env.JWT_SECRET, { expiresIn: "1h" })
        console.log("User logged in");
        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { loginUser, createUser };