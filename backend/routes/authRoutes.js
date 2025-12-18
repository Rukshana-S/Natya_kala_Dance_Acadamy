const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/signup - Student signup
router.post('/signup', authController.signup);

// POST /api/auth/login - Login (Student/Admin)
router.post('/login', authController.login);

// POST /api/auth/forgot-password
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/reset-password/:token
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;