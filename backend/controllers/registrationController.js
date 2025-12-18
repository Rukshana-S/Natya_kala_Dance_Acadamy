const Registration = require('../models/Registration');
const Schedule = require('../models/Schedule');
const { getTimetablesByBatchAndLevel, getAllTimetables, TIMETABLES } = require('../config/timetables');

const registrationController = {
  // Get all timetables (public endpoint)
  getTimetables: async (req, res) => {
    try {
      const allTimetables = getAllTimetables();

      // Enhance static timetables with live DB data (capacity/enrolledCount)
      const enhancedTimetables = {};

      for (const [key, category] of Object.entries(allTimetables)) {
        if (!category.timetables) {
          enhancedTimetables[key] = category;
          continue;
        }

        const enhancedList = await Promise.all(category.timetables.map(async (timetable) => {
          // Find matching schedule in DB
          let schedule = await Schedule.findOne({ timetableId: timetable.id });

          // If not found (first time), we use default capacity
          // If found, we use live data
          return {
            ...timetable,
            enrolledCount: schedule ? schedule.enrolledCount : 0,
            capacity: schedule ? schedule.capacity : 999, // Default large capacity if not set
            isFull: schedule ? (schedule.enrolledCount >= schedule.capacity) : false
          };
        }));

        enhancedTimetables[key] = {
          ...category,
          timetables: enhancedList
        };
      }

      res.json(enhancedTimetables);
    } catch (error) {
      console.error('Get timetables error:', error);
      res.status(500).json({ message: 'Server error fetching timetables' });
    }
  },

  // Create new registration
  createRegistration: async (req, res) => {
    try {
      const {
        fullName,
        age,
        email,
        phoneNumber,
        preferredBatch,
        experienceLevel,
        feePlan,
        amount,
        paymentMode,
        isMentallyChallenged
      } = req.body;

      // Validate required fields
      // Validate common required fields
      if (!fullName || !age || !email || !phoneNumber || !feePlan || !amount || !paymentMode) {
        return res.status(400).json({
          message: 'All required fields must be provided'
        });
      }

      // Validate batch and experience level only if not mentally challenged
      if (!isMentallyChallenged) {
        if (!preferredBatch || !experienceLevel) {
          return res.status(400).json({
            message: 'Batch and Experience Level are required'
          });
        }
      }

      // Check if email already registered
      const existingRegistration = await Registration.findOne({ email });
      if (existingRegistration) {
        return res.status(400).json({
          message: 'This email is already registered. Please use a different email.'
        });
      }

      // Assign timetable based on mentally challenged flag and link to Schedule collection
      let timetableId, assignedTimetable, scheduleDoc;

      if (isMentallyChallenged) {
        assignedTimetable = TIMETABLES.inclusive;
        timetableId = assignedTimetable.id;
      } else {
        const levelMap = {
          'complete-beginner': 'beginner',
          'some-experience': 'beginner',
          'intermediate': 'intermediate',
          'advanced': 'advanced'
        };

        const level = levelMap[experienceLevel] || 'beginner';
        const batch = preferredBatch.toLowerCase();

        assignedTimetable = getTimetablesByBatchAndLevel(batch, level);
        if (assignedTimetable) timetableId = assignedTimetable.id;
      }

      // Try to find the corresponding Schedule document by timetableId
      if (timetableId) {
        scheduleDoc = await Schedule.findOne({ timetableId });
      }

      // If schedule not found but we have assignedTimetable, create a Schedule document
      if (!scheduleDoc && assignedTimetable) {
        const t = assignedTimetable;
        const newSchedule = new Schedule({
          timetableId: t.id || timetableId || `generated-${Date.now()}`,
          batchName: t.name || t.batch || 'Imported Batch',
          level: t.level || 'Imported',
          days: t.days || [],
          startTime: t.startTime || (t.slots && t.slots[0] ? t.slots[0].time.split('–')[0].trim() : ''),
          endTime: t.endTime || (t.slots && t.slots[t.slots.length - 1] ? t.slots[t.slots.length - 1].time.split('–')[1].trim() : ''),
          timetable: (t.slots || []).map(s => ({ day: (t.days && t.days.length) ? t.days[0] : 'Unknown', time: s.time, startTime: s.time.split('–')[0].trim(), endTime: s.time.split('–')[1] ? s.time.split('–')[1].trim() : '', activity: s.activity })),
          description: `Auto-imported timetable (${t.name || t.id})`,
          feeAmount: 0,
          capacity: 999, // Default capacity
          enrolledCount: 0,
          isActive: true
        });
        scheduleDoc = await newSchedule.save();
      }

      // CAPACITY CHECK
      if (scheduleDoc) {
        if (scheduleDoc.enrolledCount >= scheduleDoc.capacity) {
          return res.status(400).json({
            message: 'This batch is currently full. Please select another batch or contact the academy.'
          });
        }
      }

      // Create new registration data
      const registrationData = {
        fullName,
        age: parseInt(age),
        email: email.toLowerCase(),
        phoneNumber,
        feePlan,
        amount,
        paymentMode,
        isMentallyChallenged: isMentallyChallenged || false
      };

      // Only include batch and experience level if not mentally challenged
      if (!isMentallyChallenged) {
        registrationData.preferredBatch = preferredBatch;
        registrationData.experienceLevel = experienceLevel;
      }

      if (scheduleDoc) {
        registrationData.scheduleId = scheduleDoc._id;
      }

      const registration = new Registration(registrationData);

      await registration.save();

      res.status(201).json({
        message: 'Registration submitted successfully! We will contact you soon.',
        registration: {
          id: registration._id,
          fullName: registration.fullName,
          email: registration.email,
          status: registration.status,
          registrationDate: registration.registrationDate,
          isMentallyChallenged: registration.isMentallyChallenged,
          scheduleId: registration.scheduleId
        }
      });
    } catch (error) {
      console.error('Registration error:', error);

      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: errors.join(', ') });
      }

      res.status(500).json({ message: 'Server error during registration' });
    }
  },

  // Get all registrations (for students to view their own)
  getRegistrations: async (req, res) => {
    try {
      const { email } = req.query;

      let query = {};
      if (email) {
        query.email = email.toLowerCase();
      }

      const registrations = await Registration.find(query)
        .sort({ registrationDate: -1 })
        .select('-__v');

      res.json(registrations);
    } catch (error) {
      console.error('Get registrations error:', error);
      res.status(500).json({ message: 'Server error fetching registrations' });
    }
  }
};

module.exports = registrationController;