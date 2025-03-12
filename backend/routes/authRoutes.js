const express = require('express');
const router = express.Router();
const { loginUser,createUser,updatePassword } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', createUser);
router.patch("/update-password", updatePassword);



module.exports = router;