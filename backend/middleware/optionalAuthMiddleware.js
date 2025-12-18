const jwt = require('jsonwebtoken');
const User = require('../models/User');

const optionalAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            // No token, proceed without user
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.userId === 'admin') {
            req.user = { _id: 'admin', role: 'admin', email: process.env.ADMIN_EMAIL };
        } else {
            const user = await User.findById(decoded.userId).select('-password');
            if (user) {
                req.user = user;
            }
        }

        next();
    } catch (error) {
        // If token is invalid, just proceed as guest? Or error?
        // Usually if they provide a bad token, we might want to tell them.
        // But for "optional", maybe we treat as guest.
        // Let's treat as guest to avoid blocking valid public access if they have a stale token.
        console.log('Optional Auth Error (treated as guest):', error.message);
        next();
    }
};

module.exports = optionalAuthMiddleware;
