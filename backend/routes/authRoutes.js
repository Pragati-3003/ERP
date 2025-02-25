const express = require('express');
const router = express.Router();
const { loginUser,createUser } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', createUser);

module.exports = router;