const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const userScheduleController = require('../controllers/userScheduleController');

const router = express.Router();

// Public routes - view active schedules
router.get('/public', scheduleController.getPublicSchedules);

// User routes - require authentication only
router.use(authMiddleware);
router.post('/select', userScheduleController.selectSchedule);
router.post('/deselect', userScheduleController.deselectSchedule);
router.get('/my-selection', userScheduleController.getUserSelection);

// Admin routes - require admin role
router.use(adminMiddleware);

router.post('/', scheduleController.createSchedule);
router.get('/', scheduleController.getAllSchedules);
router.get('/:id', scheduleController.getScheduleById);
router.patch('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
