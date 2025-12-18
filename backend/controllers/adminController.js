const Registration = require('../models/Registration');
const Schedule = require('../models/Schedule');

const adminController = {
  // Get all registrations for admin dashboard
  getAllRegistrations: async (req, res) => {
    try {
      const { status, page = 1, limit = 50 } = req.query;

      let query = {};
      if (status && ['pending', 'approved', 'rejected'].includes(status)) {
        query.status = status;
      }

      const registrations = await Registration.find(query)
        .sort({ registrationDate: -1 })
        .select('-__v');

      res.json(registrations);
    } catch (error) {
      console.error('Get all registrations error:', error);
      res.status(500).json({ message: 'Server error fetching registrations' });
    }
  },

  // Approve registration
  approveRegistration: async (req, res) => {
    try {
      const { id } = req.params;

      const registration = await Registration.findById(id);
      if (!registration) {
        return res.status(404).json({ message: 'Registration not found' });
      }

      if (registration.status === 'approved') {
        return res.status(400).json({ message: 'Registration is already approved' });
      }

      // If scheduleId is missing, try to find a matching schedule based on preferredBatch
      if (!registration.scheduleId && registration.preferredBatch) {
        // Convert kebab-case 'morning-weekday' to 'Morning Weekday' pattern for loosely matching
        // OR better, try to find a schedule that *contains* the words or ignore case.
        // Given the frontend values: 'morning-weekday', 'evening-weekday', 'weekend-morning', 'weekend-afternoon'
        // We will try to match these to Schedule batchNames.

        let searchName = registration.preferredBatch.replace(/-/g, ' ');
        // Regex to match case-insensitive
        const schedule = await Schedule.findOne({
          batchName: { $regex: new RegExp(searchName, 'i') },
          isActive: true
        });

        if (schedule) {
          registration.scheduleId = schedule._id;
        }
      }

      // Check capacity before approving
      if (registration.scheduleId) {
        const schedule = await Schedule.findById(registration.scheduleId);
        if (schedule) {
          if (schedule.enrolledCount >= schedule.capacity) {
            return res.status(400).json({ message: 'Cannot approve: Class is full' });
          }
          schedule.enrolledCount += 1;
          await schedule.save();
        }
      }

      registration.status = 'approved';
      // Only set approvedBy when we have a real ObjectId user
      if (req.user && req.user._id && req.user._id !== 'admin') {
        registration.approvedBy = req.user._id;
      } else {
        registration.approvedBy = null;
      }
      registration.approvedAt = new Date();

      await registration.save();

      res.json({
        message: 'Registration approved successfully',
        registration: {
          id: registration._id,
          fullName: registration.fullName,
          email: registration.email,
          status: registration.status,
          approvedAt: registration.approvedAt,
          scheduleId: registration.scheduleId
        }
      });
    } catch (error) {
      console.error('Approve registration error:', error);
      res.status(500).json({ message: 'Server error approving registration' });
    }
  },

  // Reject registration
  rejectRegistration: async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const registration = await Registration.findById(id);
      if (!registration) {
        return res.status(404).json({ message: 'Registration not found' });
      }

      if (registration.status === 'rejected') {
        return res.status(400).json({ message: 'Registration is already rejected' });
      }

      registration.status = 'rejected';
      registration.rejectedBy = req.user._id;
      registration.rejectedAt = new Date();
      registration.rejectionReason = reason;

      await registration.save();

      res.json({
        message: 'Registration rejected',
        registration: {
          id: registration._id,
          fullName: registration.fullName,
          email: registration.email,
          status: registration.status,
          rejectedAt: registration.rejectedAt
        }
      });
    } catch (error) {
      console.error('Reject registration error:', error);
      res.status(500).json({ message: 'Server error rejecting registration' });
    }
  },

  // Get dashboard statistics
  getDashboardStats: async (req, res) => {
    try {
      const totalRegistrations = await Registration.countDocuments();
      const pendingRegistrations = await Registration.countDocuments({ status: 'pending' });
      const approvedRegistrations = await Registration.countDocuments({ status: 'approved' });
      const rejectedRegistrations = await Registration.countDocuments({ status: 'rejected' });

      // Recent registrations (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentRegistrations = await Registration.countDocuments({
        registrationDate: { $gte: sevenDaysAgo }
      });

      res.json({
        totalRegistrations,
        pendingRegistrations,
        approvedRegistrations,
        rejectedRegistrations,
        recentRegistrations
      });
    } catch (error) {
      console.error('Dashboard stats error:', error);
      res.status(500).json({ message: 'Server error fetching dashboard statistics' });
    }
  },

  // Get Statistics (Student Analytics)
  getStatistics: async (req, res) => {
    try {
      // Get only approved registrations for statistics
      const approvedRegistrations = await Registration.find({ status: 'approved' });

      // Total students
      const totalStudents = approvedRegistrations.length;

      // Batch distribution
      const batchDistribution = {
        morning: 0,
        evening: 0,
        weekend: 0,
        inclusive: 0
      };

      // Experience level distribution
      const experienceLevel = {
        'complete-beginner': 0,
        'some-experience': 0,
        'intermediate': 0,
        'advanced': 0
      };

      // Count inclusive students
      let inclusiveStudents = 0;

      approvedRegistrations.forEach(reg => {
        // Batch distribution
        if (reg.isMentallyChallenged) {
          batchDistribution.inclusive++;
          inclusiveStudents++;
        } else if (reg.preferredBatch) {
          const batch = reg.preferredBatch.toLowerCase();
          if (batch.includes('morning')) {
            batchDistribution.morning++;
          } else if (batch.includes('evening')) {
            batchDistribution.evening++;
          } else if (batch.includes('weekend')) {
            batchDistribution.weekend++;
          }
        }

        // Experience level (only for non-inclusive students)
        if (!reg.isMentallyChallenged && reg.experienceLevel) {
          if (experienceLevel[reg.experienceLevel] !== undefined) {
            experienceLevel[reg.experienceLevel]++;
          }
        }
      });

      res.json({
        totalStudents,
        batchDistribution,
        experienceLevel,
        inclusiveStudents
      });
    } catch (error) {
      console.error('Statistics error:', error);
      res.status(500).json({ message: 'Server error fetching statistics' });
    }
  },

  // Get Revenue Data
  getRevenue: async (req, res) => {
    try {
      // Get only approved registrations for revenue calculation
      const approvedRegistrations = await Registration.find({ status: 'approved' });

      // Calculate total revenue
      let totalRevenue = 0;
      const monthlyRevenue = {};
      const batchRevenue = {
        morning: 0,
        evening: 0,
        weekend: 0,
        inclusive: 0
      };
      const feePlanRevenue = {
        monthly: 0,
        quarterly: 0,
        yearly: 0
      };
      const paymentModeDistribution = {
        cash: 0,
        gpay: 0
      };

      approvedRegistrations.forEach(reg => {
        const amount = parseFloat(reg.amount) || 0;
        totalRevenue += amount;

        // Monthly revenue (by registration month)
        const month = new Date(reg.registrationDate).toLocaleString('default', { month: 'short' });
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + amount;

        // Batch revenue
        if (reg.isMentallyChallenged) {
          batchRevenue.inclusive += amount;
        } else if (reg.preferredBatch) {
          const batch = reg.preferredBatch.toLowerCase();
          if (batch.includes('morning')) {
            batchRevenue.morning += amount;
          } else if (batch.includes('evening')) {
            batchRevenue.evening += amount;
          } else if (batch.includes('weekend')) {
            batchRevenue.weekend += amount;
          }
        }

        // Fee plan revenue
        if (reg.feePlan) {
          const plan = reg.feePlan.toLowerCase();
          if (feePlanRevenue[plan] !== undefined) {
            feePlanRevenue[plan] += amount;
          }
        }

        // Payment mode distribution
        if (reg.paymentMode) {
          const mode = reg.paymentMode.toLowerCase();
          if (paymentModeDistribution[mode] !== undefined) {
            paymentModeDistribution[mode] += amount;
          }
        }
      });

      // Convert monthly revenue object to array for charts
      const monthlyRevenueArray = Object.keys(monthlyRevenue).map(month => ({
        month,
        amount: monthlyRevenue[month]
      }));

      res.json({
        totalRevenue: Math.round(totalRevenue),
        monthlyRevenue: monthlyRevenueArray,
        batchRevenue,
        feePlanRevenue,
        paymentModeDistribution
      });
    } catch (error) {
      console.error('Revenue error:', error);
      res.status(500).json({ message: 'Server error fetching revenue data' });
    }
  }
};

module.exports = adminController;