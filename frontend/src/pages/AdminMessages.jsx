import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://${import.meta.env.VITE_API_URL}/api/contact/admin', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch messages');
            setLoading(false);
        }
    };

    const handleReplyClick = (id) => {
        setReplyingTo(id);
        setReplyContent('');
    };

    const handleSendReply = async (id) => {
        if (!replyContent.trim()) return;

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://${import.meta.env.VITE_API_URL}/api/contact/admin/${id}/reply`,
                { reply: replyContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Reply sent successfully!');
            setReplyingTo(null);
            fetchMessages(); // Refresh to show updated status
        } catch (err) {
            alert('Failed to send reply');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            unread: { background: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' },
            responded: { background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' },
            read: { background: '#e2e3e5', color: '#383d41', border: '1px solid #d6d8db' }
        };

        return (
            <span style={{
                ...styles[status],
                padding: '0.25rem 0.5rem',
                borderRadius: '5px',
                fontSize: '0.8rem',
                fontWeight: '600',
                textTransform: 'capitalize'
            }}>
                {status}
            </span>
        );
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading messages...</div>;

    return (
        <div>
            <section className="page-hero">
                <div className="container">
                    <h1>Message Inquiries</h1>
                    <p>Respond to user queries and view history</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {error && <div className="alert-error">{error}</div>}

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {messages.length === 0 ? (
                            <p style={{ textAlign: 'center' }}>No messages found.</p>
                        ) : (
                            messages.map(msg => (
                                <div key={msg._id} style={{
                                    background: 'white',
                                    borderRadius: '10px',
                                    padding: '1.5rem',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    borderLeft: `5px solid ${msg.status === 'responded' ? 'green' : 'var(--primary-maroon)'}`
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                                        <div>
                                            <h3 style={{ margin: 0, color: 'var(--deep-maroon)' }}>{msg.name}</h3>
                                            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.2rem 0' }}>{msg.email} • {msg.phone}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ marginBottom: '0.5rem' }}>{getStatusBadge(msg.status)}</div>
                                            <small style={{ color: '#888' }}>{new Date(msg.createdAt).toLocaleDateString()}</small>
                                        </div>
                                    </div>

                                    <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '5px', marginBottom: '1rem' }}>
                                        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                                    </div>

                                    {msg.adminReply && (
                                        <div style={{
                                            background: '#e8f5e9',
                                            padding: '1rem',
                                            borderRadius: '5px',
                                            marginBottom: '1rem',
                                            borderLeft: '4px solid #4caf50'
                                        }}>
                                            <strong style={{ color: '#2e7d32' }}>Admin Reply:</strong>
                                            <p style={{ margin: '0.5rem 0 0', whiteSpace: 'pre-wrap' }}>{msg.adminReply}</p>
                                            <small style={{ color: '#666', display: 'block', marginTop: '0.5rem' }}>
                                                Replied on: {new Date(msg.repliedAt).toLocaleDateString()}
                                            </small>
                                        </div>
                                    )}

                                    {replyingTo === msg._id ? (
                                        <div style={{ marginTop: '1rem' }}>
                                            <textarea
                                                value={replyContent}
                                                onChange={(e) => setReplyContent(e.target.value)}
                                                placeholder="Type your reply here..."
                                                style={{
                                                    width: '100%',
                                                    padding: '10px',
                                                    borderRadius: '5px',
                                                    border: '1px solid #ddd',
                                                    marginBottom: '10px',
                                                    minHeight: '100px'
                                                }}
                                            />
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    onClick={() => handleSendReply(msg._id)}
                                                    style={{
                                                        background: 'var(--primary-maroon)',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '8px 20px',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Send Reply
                                                </button>
                                                <button
                                                    onClick={() => setReplyingTo(null)}
                                                    style={{
                                                        background: '#ddd',
                                                        color: '#333',
                                                        border: 'none',
                                                        padding: '8px 20px',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        !msg.adminReply && (
                                            <button
                                                onClick={() => handleReplyClick(msg._id)}
                                                style={{
                                                    background: 'transparent',
                                                    color: 'var(--primary-maroon)',
                                                    border: '1px solid var(--primary-maroon)',
                                                    padding: '5px 15px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                ↩ Reply
                                            </button>
                                        )
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminMessages;
