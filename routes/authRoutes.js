const express = require('express');
const router = express.Router();
const { validateRegister, validateLogin } = require('../api/validate');
const { register, login } = require('../controllers/authController');
const upload = require('../api/upload');

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

router.post('/register', upload.single('profile_image'), validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;
