const Schedule = require('../models/Schedule');
const Registration = require('../models/Registration');

const scheduleController = {
  // Admin: Create new schedule
  createSchedule: async (req, res) => {
    try {
      const { batchName, days, startTime, endTime, instructor, feeAmount, capacity, description, timetable } = req.body;

      // Validate required fields
      if (!batchName || feeAmount === undefined || capacity === undefined || !instructor) {
        return res.status(400).json({ message: 'Required fields missing' });
      }

      const schedule = new Schedule({
        batchName,
        days: days || [],
        startTime: startTime || '',
        endTime: endTime || '',
        instructor,
        feeAmount,
        capacity,
        description: description || '',
        timetable: Array.isArray(timetable) ? timetable : [],
        createdBy: req.user._id
      });

      await schedule.save();

      res.status(201).json({ message: 'Schedule created successfully', schedule });
    } catch (error) {
      console.error('Create schedule error:', error);
      res.status(500).json({ message: 'Server error creating schedule' });
    }
  },

  // Admin: Get all schedules (with filters)
  getAllSchedules: async (req, res) => {
    try {
      const { isActive, batchName } = req.query;
      let query = {};

      if (isActive !== undefined) query.isActive = isActive === 'true';
      if (batchName) query.batchName = { $regex: batchName, $options: 'i' };

      const schedules = await Schedule.find(query)
        .populate('createdBy', 'fullName email')
        .sort({ createdAt: -1 });

      res.json(schedules);
    } catch (error) {
      console.error('Get schedules error:', error);
      res.status(500).json({ message: 'Server error fetching schedules' });
    }
  },

  // Public: Get active schedules only
  getPublicSchedules: async (req, res) => {
    try {
      const schedules = await Schedule.find({ isActive: true })
        .select('batchName days startTime endTime instructor feeAmount capacity enrolledCount description timetable')
        .sort({ createdAt: -1 });

      res.json(schedules);
    } catch (error) {
      console.error('Get public schedules error:', error);
      res.status(500).json({ message: 'Server error fetching schedules' });
    }
  },

  // Admin: Get single schedule
  getScheduleById: async (req, res) => {
    try {
      const schedule = await Schedule.findById(req.params.id)
        .populate('createdBy', 'fullName email');

      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }

      res.json(schedule);
    } catch (error) {
      console.error('Get schedule error:', error);
      res.status(500).json({ message: 'Server error fetching schedule' });
    }
  },

  // Admin: Update schedule
  updateSchedule: async (req, res) => {
    try {
      const { batchName, days, startTime, endTime, instructor, feeAmount, capacity, isActive, description, timetable } = req.body;

      const schedule = await Schedule.findById(req.params.id);
      if (!schedule) return res.status(404).json({ message: 'Schedule not found' });

      // Update fields
      if (batchName) schedule.batchName = batchName;
      if (days) schedule.days = days;
      if (startTime) schedule.startTime = startTime;
      if (endTime) schedule.endTime = endTime;
      if (instructor) schedule.instructor = instructor;
      if (feeAmount !== undefined) schedule.feeAmount = feeAmount;
      if (capacity !== undefined) schedule.capacity = capacity;
      if (isActive !== undefined) schedule.isActive = isActive;
      if (description !== undefined) schedule.description = description;
      if (Array.isArray(timetable)) schedule.timetable = timetable;

      await schedule.save();

      res.json({ message: 'Schedule updated successfully', schedule });
    } catch (error) {
      console.error('Update schedule error:', error);
      res.status(500).json({ message: 'Server error updating schedule' });
    }
  },

  // Admin: Delete schedule
  deleteSchedule: async (req, res) => {
    try {
      const schedule = await Schedule.findByIdAndDelete(req.params.id);

      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }

      res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
      console.error('Delete schedule error:', error);
      res.status(500).json({ message: 'Server error deleting schedule' });
    }
  }
};

module.exports = scheduleController;
