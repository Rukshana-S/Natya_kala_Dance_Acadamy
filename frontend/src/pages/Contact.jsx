import { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserMessages(token);
    }
  }, []);

  const fetchUserMessages = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/contact/my-messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      await axios.post('http://localhost:5000/api/contact', formData, config);

      setSuccess('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Refresh messages if logged in
      if (token) {
        fetchUserMessages(token);
      }
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with Natya Kala Dance Academy</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="two-column">
            {/* Contact Information */}
            <div className="column-content">
              <h2>Get In Touch</h2>
              <p>
                Have questions about our Bharatanatyam classes, schedules, or want to join our academy?
                We'd love to hear from you. Reach out to us through the contact form or visit our academy.
              </p>

              <div style={{ marginTop: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--deep-maroon)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    Address
                  </h3>
                  <p>Natya Kala Dance Academy<br />
                    Chennai, Tamil Nadu<br />
                    India</p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--deep-maroon)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Phone
                  </h3>
                  <p>+91 98765 43210</p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--deep-maroon)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    Email
                  </h3>
                  <p>info@natyakala.com</p>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="column-content">
              <div className="form-container">
                <h2>Send us a Message</h2>

                {success && (
                  <div style={{
                    background: '#d4edda',
                    color: '#155724',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    textAlign: 'center'
                  }}>
                    {success}
                  </div>
                )}

                {error && (
                  <div style={{
                    background: '#f8d7da',
                    color: '#721c24',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    textAlign: 'center'
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      fontSize: '1.1rem',
                      marginTop: '1rem'
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* User Message History */}
          {isLoggedIn && userMessages.length > 0 && (
            <div style={{ marginTop: '4rem', borderTop: '1px solid #eee', paddingTop: '3rem' }}>
              <h2 style={{ marginBottom: '2rem', color: 'var(--deep-maroon)' }}>Your Message History</h2>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {userMessages.map((msg) => (
                  <div key={msg._id} style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    borderLeft: `4px solid ${msg.status === 'responded' ? 'green' : 'var(--primary-maroon)'}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{
                        background: msg.status === 'responded' ? '#e8f5e9' : '#fff3cd',
                        color: msg.status === 'responded' ? '#2e7d32' : '#856404',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {msg.status}
                      </span>
                      <small style={{ color: '#888' }}>{new Date(msg.createdAt).toLocaleDateString()}</small>
                    </div>

                    <p style={{ marginBottom: msg.adminReply ? '1rem' : '0' }}>{msg.message}</p>

                    {msg.adminReply && (
                      <div style={{
                        background: '#f5f5f5',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginTop: '1rem',
                        borderLeft: '3px solid var(--primary-maroon)'
                      }}>
                        <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-maroon)' }}>
                          Admin Reply:
                        </strong>
                        <p style={{ margin: 0 }}>{msg.adminReply}</p>
                        <small style={{ display: 'block', marginTop: '0.5rem', color: '#888' }}>
                          Replied on: {new Date(msg.repliedAt).toLocaleDateString()}
                        </small>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contact;
