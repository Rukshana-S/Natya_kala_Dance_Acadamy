const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 5,
    max: 80
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  preferredBatch: {
    type: String,
    trim: true
  },
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  },
  isMentallyChallenged: {
    type: Boolean,
    default: false
  },
  // timetable details are stored in the `schedules` collection; registrations reference schedules by `scheduleId`
  experienceLevel: {
    type: String,
    enum: [
      'complete-beginner',
      'some-experience',
      'intermediate',
      'advanced'
    ]
  },
  feePlan: {
    type: String,
    required: true,
    enum: ['monthly', 'yearly', 'weekly']
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMode: {
    type: String,
    required: true,
    enum: ['cash', 'gpay']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient queries
registrationSchema.index({ email: 1 });
registrationSchema.index({ status: 1 });
registrationSchema.index({ registrationDate: -1 });
// Index to speed up queries by schedule
registrationSchema.index({ scheduleId: 1 });

module.exports = mongoose.model('Registration', registrationSchema);