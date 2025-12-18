const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
    trim: true
  },
  timetableId: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  level: {
    type: String,
    trim: true
  },
  days: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  }],
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true,
    trim: true
  },
  feeAmount: {
    type: Number,
    required: true,
    min: 0
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  enrolledCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  timetable: [{
    day: { type: String, enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], required: true },
    time: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    activity: { type: String, trim: true }
  }],
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for efficient queries
scheduleSchema.index({ batchName: 1 });
scheduleSchema.index({ days: 1 });
scheduleSchema.index({ isActive: 1 });
scheduleSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Schedule', scheduleSchema);
