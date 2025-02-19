const express = require('express')
const app = express();
app.use(express.json());
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js')
const studentRoutes = require('./routes/studentRoutes.js')
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL



app.get('/', (req, res) => {
    res.send("Hello from the backend , byw ");
})

mongoose.connect(MONGO_URL, {})
    .then(() => {
        console.log("MongoDB connected")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch(err => console.log("MongoDB connection error", err))

app.use('/api/auth', authRoutes)  
app.use('/api/admin', adminRoutes)  
app.use('/api/user', userRoutes) 
app.use('/api/student', studentRoutes) 

