import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const AdminRevenue = () => {
    const [revenue, setRevenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/admin/revenue', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRevenue(response.data);
                setLoading(false);
            } catch {
                setError('Failed to fetch revenue data');
                setLoading(false);
            }
        };

        fetchRevenue();
    }, []);

    const formatCurrency = (amount) => {
        const value = Number.isFinite(amount) ? amount : 0;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const safeMaxKey = (obj) => {
        const entries = Object.entries(obj || {});
        if (!entries.length) return 'N/A';
        const max = entries.reduce((a, b) => (a[1] > b[1] ? a : b));
        return String(max[0]);
    };

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
                    <p>Loading revenue data...</p>
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
                    <h1>Revenue Analytics</h1>
                    <p>Comprehensive financial overview and revenue distribution</p>
                </div>
            </section>

            <div className="container" style={{ padding: '3rem 20px' }}>
                {/* Total Revenue Card */}
                <div style={{ marginBottom: '3rem' }}>
                    <div className="stat-card" style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                        color: 'white',
                        borderRadius: '15px',
                        padding: '3rem',
                        boxShadow: '0 8px 20px rgba(212, 175, 55, 0.4)',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ color: '#8B1538', fontSize: '1.8rem', marginBottom: '1rem' }}>Total Revenue</h2>
                        <div className="stat-value" style={{ fontSize: '4.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            {formatCurrency(revenue.totalRevenue)}
                        </div>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>From all approved registrations</p>
                    </div>
                </div>

                {/* Batch Revenue Cards */}
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ color: '#8B1538', marginBottom: '1.5rem', textAlign: 'center' }}>Revenue by Batch</h2>
                    <div className="admin-stats">
                        <div className="stat-card" style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '2rem',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            border: '2px solid #D4AF37'
                        }}>
                            <h3 style={{ color: '#8B1538', fontSize: '1.3rem', marginBottom: '1rem' }}>Morning Batch</h3>
                            <div className="stat-value" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8B1538' }}>
                                {formatCurrency(revenue.batchRevenue.morning)}
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
                            <div className="stat-value" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8B1538' }}>
                                {formatCurrency(revenue.batchRevenue.evening)}
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
                            <div className="stat-value" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8B1538' }}>
                                {formatCurrency(revenue.batchRevenue.weekend)}
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
                            <div className="stat-value" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                                {formatCurrency(revenue.batchRevenue.inclusive)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fee Plan Revenue */}
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ color: '#8B1538', marginBottom: '1.5rem', textAlign: 'center' }}>Revenue by Fee Plan</h2>
                    <div className="admin-stats">
                        <div className="stat-card" style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '2rem',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            border: '2px solid #8B1538'
                        }}>
                            <h3 style={{ color: '#8B1538', fontSize: '1.3rem', marginBottom: '1rem' }}>Monthly Plan</h3>
                            <div className="stat-value" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8B1538' }}>
                                {formatCurrency(revenue.feePlanRevenue.monthly)}
                            </div>
                        </div>

                        <div className="stat-card" style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '2rem',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            border: '2px solid #8B1538'
                        }}>
                            <h3 style={{ color: '#8B1538', fontSize: '1.3rem', marginBottom: '1rem' }}>Weekly Plan</h3>
                            <div className="stat-value" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8B1538' }}>
                                {formatCurrency(revenue.feePlanRevenue.weekly)}
                            </div>
                        </div>

                        <div className="stat-card" style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '2rem',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            border: '2px solid #8B1538'
                        }}>
                            <h3 style={{ color: '#8B1538', fontSize: '1.3rem', marginBottom: '1rem' }}>Yearly Plan</h3>
                            <div className="stat-value" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8B1538' }}>
                                {formatCurrency(revenue.feePlanRevenue.yearly)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Mode Distribution */}
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ color: '#8B1538', marginBottom: '1.5rem', textAlign: 'center' }}>Payment Mode Distribution</h2>
                    <div className="admin-stats" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <div className="stat-card" style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '2rem',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            border: '2px solid #D4AF37'
                        }}>
                            <h3 style={{ color: '#8B1538', fontSize: '1.3rem', marginBottom: '1rem' }}>Cash Payments</h3>
                            <div className="stat-value" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8B1538' }}>
                                {formatCurrency(revenue.paymentModeDistribution.cash)}
                            </div>
                            <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                                {((revenue.paymentModeDistribution.cash / revenue.totalRevenue) * 100).toFixed(1)}% of total
                            </p>
                        </div>

                        <div className="stat-card" style={{
                            background: 'white',
                            borderRadius: '15px',
                            padding: '2rem',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            border: '2px solid #D4AF37'
                        }}>
                            <h3 style={{ color: '#8B1538', fontSize: '1.3rem', marginBottom: '1rem' }}>GPay Payments</h3>
                            <div className="stat-value" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8B1538' }}>
                                {formatCurrency(revenue.paymentModeDistribution.gpay)}
                            </div>
                            <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                                {((revenue.paymentModeDistribution.gpay / revenue.totalRevenue) * 100).toFixed(1)}% of total
                            </p>
                        </div>
                    </div>
                </div>

                {/* Financial Insights */}
                <div style={{
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #F5F1E8 0%, #FFF8F0 100%)',
                    borderRadius: '15px',
                    border: '2px solid #D4AF37'
                }}>
                    <h3 style={{ color: '#8B1538', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 16.5 8 4.5 4.5 0 0 0 12 3.5 4.5 4.5 0 0 0 7.5 8c0 1.54.8 2.87 2 3.75a7.51 7.51 0 0 1 1 2.25"></path></svg>
                        Financial Insights
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '0.5rem', color: '#333' }}>
                            ✓ Total revenue collected: <strong>{formatCurrency(revenue.totalRevenue)}</strong>
                        </li>
                        <li style={{ marginBottom: '0.5rem', color: '#333' }}>
                            ✓ Highest revenue batch: <strong>
                                {(() => {
                                    const key = safeMaxKey(revenue.batchRevenue);
                                    return key === 'N/A' ? 'N/A' : key.charAt(0).toUpperCase() + key.slice(1);
                                })()}
                            </strong>
                        </li>
                        <li style={{ marginBottom: '0.5rem', color: '#333' }}>
                            ✓ Most popular payment mode: <strong>
                                {(() => {
                                    const cash = (revenue.paymentModeDistribution && Number.isFinite(revenue.paymentModeDistribution.cash)) ? revenue.paymentModeDistribution.cash : 0;
                                    const gpay = (revenue.paymentModeDistribution && Number.isFinite(revenue.paymentModeDistribution.gpay)) ? revenue.paymentModeDistribution.gpay : 0;
                                    return cash >= gpay ? 'Cash' : 'GPay';
                                })()}
                            </strong>
                        </li>
                        <li style={{ marginBottom: '0.5rem', color: '#333' }}>
                            ✓ Most popular fee plan: <strong>
                                {(() => {
                                    const key = safeMaxKey(revenue.feePlanRevenue);
                                    return key === 'N/A' ? 'N/A' : key.charAt(0).toUpperCase() + key.slice(1);
                                })()}
                            </strong>
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

export default AdminRevenue;
