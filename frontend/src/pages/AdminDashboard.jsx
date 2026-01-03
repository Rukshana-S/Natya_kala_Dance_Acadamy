import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import '../styles/admin.css';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [timetables, setTimetables] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [registrationsRes, messagesRes, schedulesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/registrations`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE_URL}/api/contact/admin`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE_URL}/api/schedules?isActive=true`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      setRegistrations(registrationsRes.data);
      setTimetables(schedulesRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    // Re-fetch both to ensure counts are synced after actions
    fetchData();
  };

  const handleApprove = async (registrationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_BASE_URL}/api/admin/registrations/${registrationId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Show success message
      alert('Registration Approved Successfully!');

      // Refresh data to ensure we see the latest from DB
      fetchRegistrations();
      setError('');
    } catch (err) {
      console.error('Approve error:', err);
      const data = err.response?.data;
      const message = data?.message || 'Failed to approve registration';
      setError(message);
      alert(message); // Force user to see the error
    }
  };

  const handleReject = async (registrationId) => {
    const reason = window.prompt("Please enter a reason for rejection:");
    if (reason === null) return; // User cancelled

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_BASE_URL}/api/admin/registrations/${registrationId}/reject`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Registration Rejected');
      fetchRegistrations(); // Refresh data
      setError('');
    } catch (err) {
      console.error('Reject error:', err);
      const data = err.response?.data;
      const message = data?.message || 'Failed to reject registration';
      setError(message);
      alert(message);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { background: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' },
      approved: { background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' },
      rejected: { background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }
    };

    return (
      <span style={{
        ...styles[status],
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.8rem',
        fontWeight: '600',
        textTransform: 'capitalize'
      }}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid var(--antique-gold)',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Dashboard Header */}
      <section className="page-hero">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Manage student registrations and academy operations</p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="section">
        <div className="container">
          {error && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <h3>Total Registrations</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--deep-maroon)' }}>
                {registrations.length}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3>Pending Approvals</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--deep-maroon)' }}>
                {registrations.filter(reg => reg.status === 'pending').length}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h3>Approved Students</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--deep-maroon)' }}>
                {registrations.filter(reg => reg.status === 'approved').length}
              </p>
            </div>
          </div>

          {/* Registrations Table */}
          <div style={{
            background: 'var(--cream)',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 5px 20px var(--soft-shadow)'
          }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--deep-maroon)' }}>
              Student Registrations
            </h2>

            {registrations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--dark-brown)' }}>
                  No registrations found.
                </p>
              </div>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr style={{ background: 'var(--primary-maroon)', color: 'white' }}>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Student Name</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Age</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Batch</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Experience</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Fee Plan</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Amount (₹)</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Payment</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration, index) => (
                      <tr key={registration._id} style={{
                        borderBottom: '1px solid #f0f0f0',
                        backgroundColor: index % 2 === 0 ? '#fafafa' : 'white'
                      }}>
                        <td style={{ padding: '1rem', fontWeight: '600' }}>
                          {registration.fullName}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {registration.email}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {registration.age}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {registration.isMentallyChallenged ? 'Evening' : registration.preferredBatch?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {registration.isMentallyChallenged ? 'Mentally disabled' : registration.experienceLevel?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </td>
                        <td style={{ padding: '1rem', textTransform: 'capitalize' }}>
                          {registration.feePlan}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {registration.amount}
                        </td>
                        <td style={{ padding: '1rem', textTransform: 'uppercase' }}>
                          {registration.paymentMode}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {getStatusBadge(registration.status)}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {registration.status === 'pending' ? (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button
                                onClick={() => handleApprove(registration._id)}
                                style={{
                                  background: 'var(--antique-gold)',
                                  color: 'var(--primary-maroon)',
                                  border: 'none',
                                  padding: '0.5rem 1rem',
                                  borderRadius: '20px',
                                  fontSize: '0.9rem',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease'
                                }}
                                title="Approve"
                              >
                                ✓ Approve
                              </button>
                              <button
                                onClick={() => handleReject(registration._id)}
                                style={{
                                  background: '#dc3545',
                                  color: 'white',
                                  border: 'none',
                                  padding: '0.5rem 1rem',
                                  borderRadius: '20px',
                                  fontSize: '0.9rem',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease'
                                }}
                                title="Reject"
                              >
                                ✕ Reject
                              </button>
                            </div>
                          ) : (
                            <span style={{
                              color: registration.status === 'approved' ? 'var(--primary-maroon)' : '#dc3545',
                              fontWeight: '600'
                            }}>
                              {registration.status === 'approved' ? '✓ Approved' : '✕ Rejected'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;