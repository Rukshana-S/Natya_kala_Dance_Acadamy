import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/schedule.css';

const TimetableTable = ({ timetable }) => (
  <div className="timetable-card">
    <h4>{timetable.name}</h4>
    <div className="timetable-info">
      <p><strong>Time:</strong> {timetable.startTime} - {timetable.endTime}</p>
      <p><strong>Days:</strong> {timetable.days.join(', ')}</p>
    </div>
    <table className="schedule-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Activity</th>
        </tr>
      </thead>
      <tbody>
        {timetable.slots && timetable.slots.map((slot, idx) => (
          <tr key={idx}>
            <td>{slot.time}</td>
            <td>{slot.activity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function Schedule() {
  const [timetables, setTimetables] = useState({
    morning: [],
    evening: [],
    weekend: [],
    inclusive: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/registrations/timetables/all');
        setTimetables(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching timetables:', err);
        setError('Failed to load timetables');
        setLoading(false);
      }
    };
    
    fetchTimetables();
  }, []);

  if (loading) {
    return <div className="schedule-container"><p>Loading timetables...</p></div>;
  }

  if (error) {
    return <div className="schedule-container"><p className="error">{error}</p></div>;
  }

  return (
    <div className="schedule-container">
      <h1>Class Timetables</h1>
      <p className="intro-text">
        Explore our dance classes offered across different timings and experience levels. 
        Click the register button to join a class!
      </p>

      {/* Morning Batches */}
      {timetables.morning && timetables.morning.length > 0 && (
        <div className="batch-section">
          <h2>🌅 Morning Batches (6:30 AM - 11:00 AM)</h2>
          <div className="timetables-grid">
            {timetables.morning.map((timetable) => (
              <TimetableTable key={timetable.id} timetable={timetable} />
            ))}
          </div>
        </div>
      )}

      {/* Evening Batches */}
      {timetables.evening && timetables.evening.length > 0 && (
        <div className="batch-section">
          <h2>🌆 Evening Batches (5:00 PM - 9:30 PM)</h2>
          <div className="timetables-grid">
            {timetables.evening.map((timetable) => (
              <TimetableTable key={timetable.id} timetable={timetable} />
            ))}
          </div>
        </div>
      )}

      {/* Weekend Batches */}
      {timetables.weekend && timetables.weekend.length > 0 && (
        <div className="batch-section">
          <h2>🎭 Weekend Batches (8:00 AM - 6:00 PM)</h2>
          <div className="timetables-grid">
            {timetables.weekend.map((timetable) => (
              <TimetableTable key={timetable.id} timetable={timetable} />
            ))}
          </div>
        </div>
      )}

      {/* Inclusive Program */}
      {timetables.inclusive && (
        <div className="batch-section inclusive-section">
          <h2>💜 Inclusive Dance Program</h2>
          <p className="inclusive-description">
            Our inclusive program is specially designed for students with intellectual disabilities. 
            We focus on movement, rhythm, and self-expression in a supportive and joyful environment.
          </p>
          <div className="timetables-grid">
            <TimetableTable timetable={timetables.inclusive} />
          </div>
        </div>
      )}

      <div className="cta-section">
        <p>Ready to join our dance academy?</p>
        <a href="/register" className="btn-register">Register Now</a>
      </div>
    </div>
  );
}
