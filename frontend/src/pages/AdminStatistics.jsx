import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const AdminStatistics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const COLORS = {
        primary: '#8B1538',
        secondary: '#D4AF37',
        tertiary: '#B8860B',
        quaternary: '#9C27B0',
        light: '#F4E4BC'
    };

    useEffect(() => {
        const loadStatistics = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/admin/statistics', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(response.data);
                setLoading(false);
            } catch {
                setError('Failed to fetch statistics');
                setLoading(false);
            }
        };
        loadStatistics();
    }, []);

    if (loading) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    <p>Loading statistics...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: '#f44336' }}>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Page Header */}
            <section className="page-hero">
                <div className="container">
                    <h1>Student Statistics</h1>
                    <p>Comprehensive analytics of student enrollment and distribution</p>
                </div>
            </section>

            <div className="container" style={{ padding: '3rem 20px' }}>
                {/* Summary Cards */}
                <div className="admin-stats">
                    <div className="stat-card" style={{
                        background: 'linear-gradient(135deg, #8B1538 0%, #6B1028 100%)',
                        color: 'white',
                        borderRadius: '15px',
                        padding: '2rem',
                        boxShadow: '0 8px 20px rgba(139, 21, 56, 0.3)'
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <h3 style={{ color: '#D4AF37', fontSize: '1.3rem', marginBottom: '1rem' }}>Total Students</h3>
                        <div className="stat-value" style={{ fontSize: '3rem', fontWeight: 'bold' }}>{stats.totalStudents}</div>
                    </div>

                    <div className="stat-card" style={{
                        background: 'white',
                        borderRadius: '15px',
                        padding: '2rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        border: '2px solid #D4AF37'
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B1538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>
                        </div>
                        <h3 style={{ color: '#8B1538', fontSize: '1.3rem', marginBottom: '1rem' }}>Morning Batch</h3>
                        <div className="stat-value" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#8B1538' }}>
                            {stats.batchDistribution.morning}
                        </div>
                    </div>

                    <div className="stat-card" style={{
                        background: 'white',
                        borderRadius: '15px',
                        padding: '2rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        border: '2px solid #D4AF37'
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B1538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </div>
                        <h3 style={{ color: '#8B1538', fontSize: '1.3rem', marginBottom: '1rem' }}>Evening Batch</h3>
                        <div className="stat-value" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#8B1538' }}>
                            {stats.batchDistribution.evening}
                        </div>
                    </div>

                    <div className="stat-card" style={{
                        background: 'white',
                        borderRadius: '15px',
                        padding: '2rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        border: '2px solid #D4AF37'
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B1538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        </div>
                        <h3 style={{ color: '#8B1538', fontSize: '1.3rem', marginBottom: '1rem' }}>Weekend Batch</h3>
                        <div className="stat-value" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#8B1538' }}>
                            {stats.batchDistribution.weekend}
                        </div>
                    </div>

                    <div className="stat-card" style={{
                        background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
                        color: 'white',
                        borderRadius: '15px',
                        padding: '2rem',
                        boxShadow: '0 8px 20px rgba(156, 39, 176, 0.3)'
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F4E4BC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </div>
                        <h3 style={{ color: '#F4E4BC', fontSize: '1.3rem', marginBottom: '1rem' }}>Inclusive Program</h3>
                        <div className="stat-value" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                            {stats.inclusiveStudents}
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div style={{
                    marginTop: '3rem',
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #F5F1E8 0%, #FFF8F0 100%)',
                    borderRadius: '15px',
                    border: '2px solid #D4AF37'
                }}>
                    <h3 style={{ color: '#8B1538', marginBottom: '1rem', fontSize: '1.4rem' }}>Key Insights</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '0.5rem', color: '#333' }}>
                            ✓ Total approved students: <strong>{stats.totalStudents}</strong>
                        </li>
                        <li style={{ marginBottom: '0.5rem', color: '#333' }}>
                            ✓ Most popular batch: <strong>
                                {Object.entries(stats.batchDistribution).reduce((a, b) => a[1] > b[1] ? a : b)[0].charAt(0).toUpperCase() + Object.entries(stats.batchDistribution).reduce((a, b) => a[1] > b[1] ? a : b)[0].slice(1)}
                            </strong>
                        </li>
                        <li style={{ marginBottom: '0.5rem', color: '#333' }}>
                            ✓ Inclusive program students: <strong>{stats.inclusiveStudents}</strong>
                        </li>
                    </ul>
                </div>
            </div>

            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default AdminStatistics;
