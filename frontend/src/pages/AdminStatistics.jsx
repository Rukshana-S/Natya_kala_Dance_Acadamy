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
