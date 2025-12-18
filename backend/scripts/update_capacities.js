const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Schedule = require('../models/Schedule');
const connectDB = require('../db-connect/db');

const updateCapacities = async () => {
    try {
        await connectDB();
        console.log('\n--- Updating Schedule Capacities ---\n');

        // Update all schedules to have capacity 20
        const result = await Schedule.updateMany({}, { $set: { capacity: 20 } });

        console.log(`Updated ${result.modifiedCount} schedules to Capacity: 20`);

        // Verify
        const schedules = await Schedule.find({});
        console.log('\nNew Capacities:');
        schedules.forEach(s => {
            console.log(`- ${s.batchName} (${s.level}): ${s.capacity}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
};

updateCapacities();
