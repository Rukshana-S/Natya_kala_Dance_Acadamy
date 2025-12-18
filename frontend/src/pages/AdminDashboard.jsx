import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/registrations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRegistrations(response.data);
    } catch {
      setError('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (registrationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/api/admin/registrations/${registrationId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setRegistrations(registrations.map(reg =>
        reg._id === registrationId
          ? { ...reg, status: 'approved' }
          : reg
      ));
    } catch {
      setError('Failed to approve registration');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { background: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' },
      approved: { background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }
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
    <div>
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
              <div className="feature-icon">📊</div>
              <h3>Total Registrations</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--deep-maroon)' }}>
                {registrations.length}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏳</div>
              <h3>Pending Approvals</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--deep-maroon)' }}>
                {registrations.filter(reg => reg.status === 'pending').length}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
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
                            >
                              Approve
                            </button>
                          ) : (
                            <span style={{ color: 'var(--primary-maroon)', fontWeight: '600' }}>
                              ✓ Approved
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