const Registration = require('../models/Registration');
const Schedule = require('../models/Schedule');

const userScheduleController = {
    // Select a schedule
    selectSchedule: async (req, res) => {
        try {
            const { scheduleId, batchName } = req.body;
            const { email } = req.user; // Assumes auth middleware populates req.user

            if (!email) {
                return res.status(400).json({ message: 'User email not found in token' });
            }

            const schedule = await Schedule.findById(scheduleId);
            if (!schedule) {
                return res.status(404).json({ message: 'Schedule not found' });
            }

            // Check capacity
            if (schedule.enrolledCount >= schedule.capacity) {
                return res.status(400).json({ message: 'This batch is fully booked' });
            }

            // Find existing registration or create a new one
            let registration = await Registration.findOne({ email });

            if (registration) {
                // Update existing registration
                // If they are already approved for another batch, we might need to handle that.
                // For now, we allow switching, but status goes back to pending if it changes.
                if (registration.scheduleId && registration.scheduleId.toString() !== scheduleId) {
                    // If they were approved in the old one, we should probably decrement the old one? 
                    // Logic complexity: If we decrement old immediately, they lose their spot. 
                    // Simplest approach: Reset status to pending. Admin will handle the switch.
                    // BUT, if we want to be strict about capacity, we should decrement the old one if it was approved.
                    if (registration.status === 'approved') {
                        await Schedule.findByIdAndUpdate(registration.scheduleId, { $inc: { enrolledCount: -1 } });
                    }
                }

                registration.preferredBatch = batchName;
                registration.scheduleId = scheduleId;
                registration.status = 'pending'; // Reset to pending for approval
                registration.approvedBy = null;
                registration.approvedAt = null;
            } else {
                // This case shouldn't technically happen if they need to register first, 
                // but if we support "Select Batch" triggering a registration form pre-fill, that's different.
                // Based on the UI, the user is already logged in. 
                // We will assume a Registration document 'should' exist if they went through the flow, 
                // OR we create a partial one. Let's create a partial one or error?
                // Actually, the `Registration` model requires many fields (age, phone, etc). 
                // If they haven't registered, they can't select.

                // Let's try to find them by email. If not found, tell them to complete profile/registration first.
                return res.status(404).json({ message: 'Please complete your registration details first via the Register page.' });
            }

            await registration.save();

            res.json({
                message: 'Batch selection submitted for approval',
                registration
            });

        } catch (error) {
            console.error('Select schedule error:', error);
            res.status(500).json({ message: 'Server error selecting schedule' });
        }
    },

    // Deselect/Cancel schedule
    deselectSchedule: async (req, res) => {
        try {
            const { email } = req.user;

            const registration = await Registration.findOne({ email });
            if (!registration) {
                return res.status(404).json({ message: 'Registration not found' });
            }

            // If approved, decrement count
            if (registration.status === 'approved' && registration.scheduleId) {
                await Schedule.findByIdAndUpdate(registration.scheduleId, { $inc: { enrolledCount: -1 } });
            }

            registration.preferredBatch = ''; // Or handling "No Batch"
            registration.scheduleId = null;
            registration.status = 'pending'; // Or 'cancelled'? Let's keep it clean, maybe just remove the selection.
            // Actually, if we remove scheduleId, it's effectively deselected.

            // We might want to keep the registration "Active" but with no batch? 
            // Or just clear the fields.

            await registration.save();

            res.json({ message: 'Batch selection removed', registration });

        } catch (error) {
            console.error('Deselect schedule error:', error);
            res.status(500).json({ message: 'Server error deselecting schedule' });
        }
    },

    // Get current selection
    getUserSelection: async (req, res) => {
        try {
            const { email } = req.user;
            const registration = await Registration.findOne({ email });

            if (!registration) {
                return res.json({ selection: null });
            }

            res.json({
                selection: {
                    scheduleId: registration.scheduleId,
                    batchName: registration.preferredBatch,
                    status: registration.status
                }
            });
        } catch (error) {
            console.error('Get selection error:', error);
            res.status(500).json({ message: 'Server error fetching selection' });
        }
    }
};

module.exports = userScheduleController;
