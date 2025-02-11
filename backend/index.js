const express = require('express')
const app = express()
const mongoose = require('mongoose')
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