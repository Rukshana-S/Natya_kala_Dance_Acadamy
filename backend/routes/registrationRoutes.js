const express = require('express');
const registrationController = require('../controllers/registrationController');

const router = express.Router();

// GET /api/registrations/timetables - Get all timetables (public)
router.get('/timetables/all', registrationController.getTimetables);

// POST /api/registrations - Create new registration
router.post('/', registrationController.createRegistration);

// GET /api/registrations - Get registrations (with optional email filter)
router.get('/', registrationController.getRegistrations);

module.exports = router;