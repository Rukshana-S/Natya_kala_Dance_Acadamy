const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Registration = require('../models/Registration');
const Schedule = require('../models/Schedule');
const connectDB = require('../db-connect/db');

const checkCounts = async () => {
    let output = '';
    const log = (msg) => { console.log(msg); output += msg + '\n'; };

    try {
        await connectDB();
        log('# Database Consistency Report');
        log(`Generated at: ${new Date().toISOString()}\n`);

        const schedules = await Schedule.find({});
        const approvedRegistrations = await Registration.find({ status: 'approved' });

        log(`**Total Schedules:** ${schedules.length}`);
        log(`**Total Approved Registrations:** ${approvedRegistrations.length}\n`);

        log('| ID | Batch Name | Level | Stored Count | Calculated Count | Capacity | Status |');
        log('|---|---|---|---|---|---|---|');

        for (const schedule of schedules) {
            // Calculate actual count from registrations
            const actualCount = approvedRegistrations.filter(r =>
                r.scheduleId && r.scheduleId.toString() === schedule._id.toString()
            ).length;

            const status = actualCount === schedule.enrolledCount ? '✅ OK' : '❌ MISMATCH';

            log(
                `| ${schedule._id} | ${schedule.batchName} | ${schedule.level} | ` +
                `${schedule.enrolledCount} | ${actualCount} | ${schedule.capacity} | ${status} |`
            );
        }
        log('\n');

        // Check for orphaned registrations
        const validScheduleIds = schedules.map(s => s._id.toString());
        const orphaned = approvedRegistrations.filter(r => !r.scheduleId || !validScheduleIds.includes(r.scheduleId.toString()));

        if (orphaned.length > 0) {
            log(`## ⚠️ Orphaned Registrations (${orphaned.length})`);
            log('These approved registrations have missing or invalid schedule IDs (not counted in any batch):');
            orphaned.forEach(r => log(`- **User**: ${r.fullName}, **ID**: ${r._id}, **ScheduleID**: ${r.scheduleId || 'NULL'}`));
        } else {
            log('## ✅ No Orphaned Registrations');
        }

        fs.writeFileSync('db_report.md', output);
        console.log('Report written to db_report.md');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
};

checkCounts();
