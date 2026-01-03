const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// GET /api/auth - Auth API status
router.get('/', (req, res) => {
    res.json({
        message: 'Auth API',
        endpoints: {
            login: '/api/auth/login',
            signup: '/api/auth/signup',
            forgotPassword: '/api/auth/forgot-password'
        }
    });
});

// POST /api/auth/signup - Student signup
router.post('/signup', authController.signup);

// POST /api/auth/login - Login (Student/Admin)
router.post('/login', authController.login);

// POST /api/auth/forgot-password
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/reset-password/:token
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;