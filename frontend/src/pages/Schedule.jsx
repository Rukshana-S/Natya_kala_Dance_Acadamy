import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
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
        const response = await axios.get(`${API_BASE_URL}/api/registrations/timetables/all`);
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
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ff9800' }}><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>
            Morning Batches (6:30 AM - 11:00 AM)
          </h2>
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
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3f51b5' }}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            Evening Batches (5:00 PM - 9:30 PM)
          </h2>
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
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#e91e63' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Weekend Batches (8:00 AM - 6:00 PM)
          </h2>
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
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#9c27b0' }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            Inclusive Dance Program
          </h2>
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
