const TIMETABLES = {
  morning: {
    beginner: {
      id: 'morning-beginner',
      name: 'Beginner – Morning',
      batch: 'Morning',
      level: 'Beginner',
      startTime: '06:30',
      endTime: '07:45',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      slots: [
        { time: '6:30–6:45', activity: 'Warm-up' },
        { time: '6:45–7:05', activity: 'Adavus (Basic)' },
        { time: '7:05–7:25', activity: 'Rhythm (Tala)' },
        { time: '7:25–7:45', activity: 'Stretching' }
      ]
    },
    intermediate: {
      id: 'morning-intermediate',
      name: 'Intermediate – Morning',
      batch: 'Morning',
      level: 'Intermediate',
      startTime: '07:45',
      endTime: '09:15',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      slots: [
        { time: '7:45–8:00', activity: 'Warm-up' },
        { time: '8:00–8:30', activity: 'Adavus (Speed)' },
        { time: '8:30–9:00', activity: 'Abhinaya' },
        { time: '9:00–9:15', activity: 'Cool Down' }
      ]
    },
    advanced: {
      id: 'morning-advanced',
      name: 'Advanced – Morning',
      batch: 'Morning',
      level: 'Advanced',
      startTime: '09:30',
      endTime: '11:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      slots: [
        { time: '9:30–9:45', activity: 'Warm-up' },
        { time: '9:45–10:15', activity: 'Varnam' },
        { time: '10:15–10:45', activity: 'Abhinaya' },
        { time: '10:45–11:00', activity: 'Stretching' }
      ]
    }
  },
  evening: {
    beginner: {
      id: 'evening-beginner',
      name: 'Beginner – Evening',
      batch: 'Evening',
      level: 'Beginner',
      startTime: '17:00',
      endTime: '18:15',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      slots: [
        { time: '5:00–5:15', activity: 'Warm-up' },
        { time: '5:15–5:40', activity: 'Adavus' },
        { time: '5:40–6:00', activity: 'Rhythm' },
        { time: '6:00–6:15', activity: 'Games' }
      ]
    },
    intermediate: {
      id: 'evening-intermediate',
      name: 'Intermediate – Evening',
      batch: 'Evening',
      level: 'Intermediate',
      startTime: '18:30',
      endTime: '19:45',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      slots: [
        { time: '6:30–6:45', activity: 'Warm-up' },
        { time: '6:45–7:15', activity: 'Jatis' },
        { time: '7:15–7:35', activity: 'Abhinaya' },
        { time: '7:35–7:45', activity: 'Cool Down' }
      ]
    },
    advanced: {
      id: 'evening-advanced',
      name: 'Advanced – Evening',
      batch: 'Evening',
      level: 'Advanced',
      startTime: '20:00',
      endTime: '21:30',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      slots: [
        { time: '8:00–8:15', activity: 'Warm-up' },
        { time: '8:15–8:50', activity: 'Varnam' },
        { time: '8:50–9:15', activity: 'Abhinaya' },
        { time: '9:15–9:30', activity: 'Stretch' }
      ]
    }
  },
  weekend: {
    beginner: {
      id: 'weekend-beginner',
      name: 'Beginner – Weekend',
      batch: 'Weekend',
      level: 'Beginner',
      startTime: '08:00',
      endTime: '09:30',
      days: ['Saturday', 'Sunday'],
      slots: [
        { time: '8:00–8:15', activity: 'Warm-up' },
        { time: '8:15–8:45', activity: 'Adavus' },
        { time: '8:45–9:15', activity: 'Rhythm' },
        { time: '9:15–9:30', activity: 'Stretch' }
      ]
    },
    intermediate: {
      id: 'weekend-intermediate',
      name: 'Intermediate – Weekend',
      batch: 'Weekend',
      level: 'Intermediate',
      startTime: '10:00',
      endTime: '11:30',
      days: ['Saturday', 'Sunday'],
      slots: [
        { time: '10:00–10:15', activity: 'Warm-up' },
        { time: '10:15–10:45', activity: 'Jatis' },
        { time: '10:45–11:15', activity: 'Abhinaya' },
        { time: '11:15–11:30', activity: 'Stretch' }
      ]
    },
    advanced: {
      id: 'weekend-advanced',
      name: 'Advanced – Weekend',
      batch: 'Weekend',
      level: 'Advanced',
      startTime: '16:00',
      endTime: '18:00',
      days: ['Saturday', 'Sunday'],
      slots: [
        { time: '4:00–4:15', activity: 'Warm-up' },
        { time: '4:15–5:00', activity: 'Varnam' },
        { time: '5:00–5:40', activity: 'Abhinaya' },
        { time: '5:40–6:00', activity: 'Stretch' }
      ]
    }
  },
  inclusive: {
    id: 'inclusive-special',
    name: 'Inclusive Dance Program (Mentally Challenged Students)',
    batch: 'Special Inclusive',
    level: 'Inclusive',
    startTime: '19:00',
    endTime: '20:00',
    days: ['Saturday', 'Sunday'],
    slots: [
      { time: '7:00–7:10', activity: 'Free Movement' },
      { time: '7:10–7:25', activity: 'Rhythm Games' },
      { time: '7:25–7:40', activity: 'Expression with Gestures' },
      { time: '7:40–8:00', activity: 'Assisted Dance & Relaxation' }
    ]
  }
};

// Helper functions
const getTimetableById = (id) => {
  for (const batch in TIMETABLES) {
    if (batch === 'inclusive') {
      if (TIMETABLES.inclusive.id === id) return TIMETABLES.inclusive;
    } else {
      for (const level in TIMETABLES[batch]) {
        if (TIMETABLES[batch][level].id === id) {
          return TIMETABLES[batch][level];
        }
      }
    }
  }
  return null;
};

const getTimetablesByBatchAndLevel = (batch, level) => {
  if (batch === 'Special Inclusive' || level === 'Inclusive') {
    return TIMETABLES.inclusive;
  }
  if (TIMETABLES[batch] && TIMETABLES[batch][level]) {
    return TIMETABLES[batch][level];
  }
  return null;
};

const getAllTimetables = () => {
  const result = {
    morning: Object.values(TIMETABLES.morning),
    evening: Object.values(TIMETABLES.evening),
    weekend: Object.values(TIMETABLES.weekend),
    inclusive: TIMETABLES.inclusive
  };
  return result;
};

module.exports = {
  TIMETABLES,
  getTimetableById,
  getTimetablesByBatchAndLevel,
  getAllTimetables
};
