const multer = require("multer");
const path = require("path");

// Define storage location and filename structure
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/assignments");  // Folder to store PDFs
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["application/pdf"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }
    }
});

// storage to store the assigment submitted by the student
// Define storage location and filename structure
const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/studentSubmissions");  // Folder to store PDFs
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadSubmission = multer({
    storage: storage1,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["application/pdf"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }
    }
});


module.exports = { upload, uploadSubmission };
