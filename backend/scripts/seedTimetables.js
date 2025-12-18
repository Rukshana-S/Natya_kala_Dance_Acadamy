const mongoose = require('mongoose');
const connect = require('../db-connect/db');
const { TIMETABLES } = require('../config/timetables');
const Schedule = require('../models/Schedule');
const User = require('../models/User');

async function seed() {
  await connect();

  // Ensure an admin user exists (create one if not)
  let admin = await User.findOne({ role: 'admin' });
  if (!admin) {
    console.log('No admin user found. Creating default admin user: admin@natya.local / Admin@123');
    admin = new User({
      email: 'admin@natya.local',
      password: 'Admin@123',
      role: 'admin',
      fullName: 'Default Admin',
      acceptedPrivacyPolicy: true,
      acceptedTerms: true
    });
    await admin.save();
  }

  const upserts = [];

  // TIMETABLES structure: morning/evening/weekend/inclusive
  Object.keys(TIMETABLES).forEach(category => {
    if (category === 'inclusive') {
      const t = TIMETABLES.inclusive;
      const doc = {
        timetableId: t.id,
        batchName: t.name || t.batch || 'Inclusive Program',
        level: t.level || 'Inclusive',
        days: t.days || [],
        startTime: t.startTime,
        endTime: t.endTime,
        timetable: (t.slots || []).map(s => ({
          day: (t.days && t.days.length) ? t.days[0] : 'Saturday',
          time: s.time,
          startTime: s.time.split('–')[0].trim(),
          endTime: s.time.split('–')[1] ? s.time.split('–')[1].trim() : '',
          activity: s.activity
        })),
        description: `Imported timetable (${t.name || t.id})`,
        feeAmount: 0,
        capacity: 50,
        enrolledCount: 0,
        isActive: true,
        createdBy: admin._id
      };
      upserts.push({ filter: { timetableId: doc.timetableId }, doc });
      return;
    }

    const group = TIMETABLES[category];
    Object.keys(group).forEach(levelKey => {
      const t = group[levelKey];
      const doc = {
        timetableId: t.id,
        batchName: t.name || `${category} ${levelKey}`,
        level: t.level || levelKey,
        days: t.days || [],
        startTime: t.startTime,
        endTime: t.endTime,
        timetable: (t.slots || []).map(s => ({
          day: (t.days && t.days.length) ? t.days[0] : 'Monday',
          time: s.time,
          startTime: s.time.split('–')[0].trim(),
          endTime: s.time.split('–')[1] ? s.time.split('–')[1].trim() : '',
          activity: s.activity
        })),
        description: `Imported timetable (${t.name || t.id})`,
        feeAmount: 0,
        capacity: 50,
        enrolledCount: 0,
        isActive: true,
        createdBy: admin._id
      };
      upserts.push({ filter: { timetableId: doc.timetableId }, doc });
    });
  });

  for (const u of upserts) {
    try {
      await Schedule.findOneAndUpdate(u.filter, u.doc, { upsert: true, new: true, setDefaultsOnInsert: true });
      console.log('Upserted timetable', u.filter);
    } catch (e) {
      console.error('Failed upsert', u.filter, e.message);
    }
  }

  console.log('Timetable seed complete.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed', err);
  process.exit(1);
});
