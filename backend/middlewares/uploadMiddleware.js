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

// storage to store the the end sem result of the student
// Define storage location and filename structure
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/endSemResults");  // Folder to store PDFs
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadResult = multer({
    storage: storage2,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["application/pdf"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }
    }
});

const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profilePictures");  // Folder to store profile pictures
    },
    filename: (req, file, cb) => {
        // Rename the file to avoid conflicts
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadProfilePictures = multer({
    storage: storage3,
    fileFilter: (req, file, cb) => {
        // Allow only image files
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error("Only image files (JPEG, PNG, JPG, GIF) are allowed")); // Reject the file
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
});

module.exports = { upload, uploadSubmission ,uploadResult,uploadProfilePictures};
