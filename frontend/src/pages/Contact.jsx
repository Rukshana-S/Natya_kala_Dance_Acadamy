import { useState } from 'react';
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
      await axios.post('http://localhost:5000/api/contact', formData);
      setSuccess('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
                  <h3 style={{ color: 'var(--deep-maroon)', marginBottom: '0.5rem' }}>📍 Address</h3>
                  <p>Natya Kala Dance Academy<br />
                  Chennai, Tamil Nadu<br />
                  India</p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--deep-maroon)', marginBottom: '0.5rem' }}>📞 Phone</h3>
                  <p>+91 98765 43210</p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--deep-maroon)', marginBottom: '0.5rem' }}>✉️ Email</h3>
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
        </div>
      </section>
    </div>
  );
};

export default Contact;
