const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// GET /api/admin - Admin API status
router.get('/', (req, res) => {
    res.json({
        message: 'Admin API',
        endpoints: {
            dashboardStats: '/api/admin/dashboard-stats',
            registrations: '/api/admin/registrations',
            statistics: '/api/admin/statistics',
            revenue: '/api/admin/revenue'
        }
    });
});

// Apply auth and admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// GET /api/admin/registrations - Get all registrations
router.get('/registrations', adminController.getAllRegistrations);

// PATCH /api/admin/registrations/:id/approve - Approve registration
router.patch('/registrations/:id/approve', adminController.approveRegistration);

// PATCH /api/admin/registrations/:id/reject - Reject registration
router.patch('/registrations/:id/reject', adminController.rejectRegistration);

// GET /api/admin/dashboard-stats - Get dashboard statistics
router.get('/dashboard-stats', adminController.getDashboardStats);

// GET /api/admin/statistics - Get student statistics
router.get('/statistics', adminController.getStatistics);

// GET /api/admin/revenue - Get revenue data
router.get('/revenue', adminController.getRevenue);

module.exports = router;