const express = require('express');
const router = express.Router();
const {
    submitContactForm,
    getAllMessages,
    replyToMessage,
    getUserMessages
} = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// POST /api/contact - Submit contact form (Public or Authenticated)
// We use a custom middleware wrapper or just handle req.user if authMiddleware is optional?
// The current authMiddleware sends 401 if no token. We need a flexible one for public submission.
// For now, let's keep public submission public. But if frontend sends token, we want to decode it.
// We'll create a "optionalAuth" approach inline or use authMiddleware conditionally. 
// Actually, easiest is frontend calls with token if logged in. 
// But if authMiddleware is strict, we can't use it on public route.
// Let's make a "tryAuth" middleware or just handle it in controller if we parse it manually.
// For simplicity, let's use a separate route or rely on frontend sending token and us decoding it manually in controller? 
// No, standard is to use middleware. 
// Let's rely on a new route for authenticated submission OR just allow public submission without ID 
// and authenticated submission with ID on the same route? 
// If I use authMiddleware, it blocks public. 
// I will create a specific route for user history. 
// For submission, I'll allow the controller to parse token manually if present, or just leave it for now 
// and enforce authMiddleware only on the new routes.

// Actually users might want to submit without login too.
// Let's modify the submission route to be flexible in the controller? 
// Or I can add a specific middleware that doesn't error if no token.
const optionalAuth = async (req, res, next) => {
    try {
        const jwt = require('jsonwebtoken');
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { _id: decoded.userId };
        }
        next();
    } catch (err) {
        next();
    }
};

router.post('/', optionalAuth, submitContactForm);

// GET /api/contact/my-messages - Get logged in user's messages
router.get('/my-messages', authMiddleware, getUserMessages);

// Admin Routes
// GET /api/contact/admin - GetAll
router.get('/admin', authMiddleware, adminMiddleware, getAllMessages);

// POST /api/contact/admin/:id/reply - Reply
router.post('/admin/:id/reply', authMiddleware, adminMiddleware, replyToMessage);

module.exports = router;
