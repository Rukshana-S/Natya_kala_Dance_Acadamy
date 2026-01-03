import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AdminScheduleManager = () => {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    batchName: '',
    days: [],
    startTime: '',
    endTime: '',
    startTime: '',
    endTime: '',
    feeAmount: '',
    capacity: '',
    timetable: [],
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('token');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const fetchSchedules = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/schedules', {
        headers: { Authorization: 'Bearer ' + token }
      });
      setSchedules(response.data);
      setLoading(false);
    } catch {
      setError('Failed to load schedules');
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      await fetchSchedules();
    })();
  }, [token, fetchSchedules]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const addTimetableEntry = () => {
    setFormData(prev => ({ ...prev, timetable: [...(prev.timetable || []), { day: 'Monday', startTime: '', endTime: '' }] }));
  };

  const updateTimetableEntry = (index, field, value) => {
    setFormData(prev => {
      const t = Array.isArray(prev.timetable) ? [...prev.timetable] : [];
      t[index] = { ...t[index], [field]: value };
      return { ...prev, timetable: t };
    });
  };

  const removeTimetableEntry = (index) => {
    setFormData(prev => {
      const t = Array.isArray(prev.timetable) ? [...prev.timetable] : [];
      t.splice(index, 1);
      return { ...prev, timetable: t };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!formData.batchName || !formData.feeAmount || !formData.capacity) {
        setError('Please fill all required fields');
        return;
      }

      if (editingId) {
        // Update existing schedule
        await axios.patch(
          `http://localhost:5000/api/schedules/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('Schedule updated successfully');
      } else {
        // Create new schedule
        await axios.post(
          'http://localhost:5000/api/schedules',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('Schedule created successfully');
      }

      resetForm();
      fetchSchedules();
    } catch {
      setError(editingId ? 'Failed to update schedule' : 'Failed to create schedule');
    }
  };

  const handleEdit = (schedule) => {
    setEditingId(schedule._id);
    setFormData({
      batchName: schedule.batchName,
      days: schedule.days,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      feeAmount: schedule.feeAmount,
      capacity: schedule.capacity,
      timetable: schedule.timetable || [],
      description: schedule.description
    });
  };

  const handleDelete = async (scheduleId) => {
    if (!window.confirm('Are you sure you want to delete this schedule?')) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/schedules/${scheduleId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Schedule deleted successfully');
      fetchSchedules();
    } catch {
      setError('Failed to delete schedule');
    }
  };

  const resetForm = () => {
    setFormData({
      batchName: '',
      days: [],
      startTime: '',
      endTime: '',
      startTime: '',
      endTime: '',
      feeAmount: '',
      capacity: '',
      timetable: [],
      description: ''
    });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading schedules...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9f7f4', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--primary-maroon)', marginBottom: '2rem', fontSize: '2.5rem', textAlign: 'center' }}>
          Schedule Management
        </h1>

        {error && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            background: '#d4edda',
            color: '#155724',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            {success}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '3rem' }}>
          {/* Form */}
          <form onSubmit={handleSubmit} style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            border: '2px solid #f0e6d8'
          }}>
            <h2 style={{ color: 'var(--primary-maroon)', marginBottom: '1.5rem' }}>
              {editingId ? 'Edit Schedule' : 'Create New Schedule'}
            </h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--dark-brown)' }}>
                Batch Name *
              </label>
              <input
                type="text"
                name="batchName"
                value={formData.batchName}
                onChange={handleInputChange}
                placeholder="e.g., Morning Weekday Batch"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--dark-brown)' }}>
                Days *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {daysOfWeek.map(day => (
                  <label key={day} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.days.includes(day)}
                      onChange={() => handleDayToggle(day)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--dark-brown)' }}>
                  Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--dark-brown)' }}>
                  End Time *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>



            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--dark-brown)' }}>
                  Fee Amount (₹) *
                </label>
                <input
                  type="number"
                  name="feeAmount"
                  value={formData.feeAmount}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--dark-brown)' }}>
                  Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--dark-brown)' }}>
                Timetable (admin-only editable)
              </label>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {(formData.timetable || []).map((entry, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <select value={entry.day} onChange={(e) => updateTimetableEntry(idx, 'day', e.target.value)} style={{ padding: '0.5rem' }}>
                      {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <input type="time" value={entry.startTime || ''} onChange={(e) => updateTimetableEntry(idx, 'startTime', e.target.value)} />
                    <input type="time" value={entry.endTime || ''} onChange={(e) => updateTimetableEntry(idx, 'endTime', e.target.value)} />
                    <button type="button" onClick={() => removeTimetableEntry(idx)} style={{ padding: '0.4rem 0.6rem' }}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={addTimetableEntry} style={{ padding: '0.5rem', marginTop: '0.5rem' }}>Add Timetable Entry</button>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--dark-brown)' }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add optional description"
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button
                type="submit"
                style={{
                  background: 'var(--antique-gold)',
                  color: 'var(--primary-maroon)',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#c9985d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--antique-gold)';
                }}
              >
                {editingId ? 'Update Schedule' : 'Create Schedule'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    background: '#e0e0e0',
                    color: '#333',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Schedules List */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            border: '2px solid #f0e6d8',
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            <h2 style={{ color: 'var(--primary-maroon)', marginBottom: '1.5rem' }}>All Schedules</h2>

            {schedules.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--dark-brown)' }}>No schedules yet. Create one!</p>
            ) : (
              <div>
                {schedules.map(schedule => (
                  <div key={schedule._id} style={{
                    padding: '1rem',
                    borderBottom: '1px solid #f0e6d8',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <h3 style={{ color: 'var(--primary-maroon)', margin: '0', fontSize: '1.1rem' }}>
                        {schedule.batchName}
                      </h3>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleEdit(schedule)}
                          style={{
                            background: 'var(--antique-gold)',
                            color: 'var(--primary-maroon)',
                            border: 'none',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(schedule._id)}
                          style={{
                            background: '#ffebee',
                            color: '#c62828',
                            border: 'none',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {Array.isArray(schedule.timetable) && schedule.timetable.length > 0 ? (
                      <div style={{ margin: '0.3rem 0', fontSize: '0.9rem', color: 'var(--dark-brown)' }}>
                        <strong>Timetable:</strong>
                        <ul style={{ margin: '0.3rem 0 0.3rem 1rem' }}>
                          {schedule.timetable.map((t, i) => (
                            <li key={i}>{t.day}: {t.startTime} - {t.endTime}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <>
                        <p style={{ margin: '0.3rem 0', fontSize: '0.9rem', color: 'var(--dark-brown)' }}>
                          <strong>Days:</strong> {schedule.days.join(', ')}
                        </p>
                        <p style={{ margin: '0.3rem 0', fontSize: '0.9rem', color: 'var(--dark-brown)' }}>
                          <strong>Time:</strong> {schedule.startTime} - {schedule.endTime}
                        </p>
                      </>
                    )}

                    <p style={{ margin: '0.3rem 0', fontSize: '0.9rem', color: 'var(--dark-brown)' }}>
                      <strong>Fee:</strong> ₹{schedule.feeAmount} | <strong>Capacity:</strong> {schedule.enrolledCount}/{schedule.capacity}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminScheduleManager;
