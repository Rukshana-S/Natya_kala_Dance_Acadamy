import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/admin-signup', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        adminCode: formData.adminCode
      });

      navigate('/admin/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Admin signup failed. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("/auth.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div style={{
          maxWidth: '450px',
          margin: '0 auto',
          background: 'var(--cream)',
          padding: '3rem',
          borderRadius: '15px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'var(--antique-gold)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '1.5rem',
            color: 'var(--primary-maroon)'
          }}>
            👑
          </div>
          
          <h1 style={{ 
            color: 'var(--deep-maroon)', 
            marginBottom: '0.5rem',
            fontSize: '2rem'
          }}>
            Admin Registration
          </h1>
          <p style={{ 
            color: 'var(--dark-brown)', 
            marginBottom: '2rem',
            fontSize: '1rem'
          }}>
            Create admin account for academy management
          </p>

          {error && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="adminCode">Admin Code</label>
              <input
                type="password"
                id="adminCode"
                name="adminCode"
                value={formData.adminCode}
                onChange={handleChange}
                placeholder="Use: ADMIN123"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: 'var(--antique-gold)',
                color: 'var(--primary-maroon)',
                border: 'none',
                padding: '1rem',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '1.5rem'
              }}
            >
              {isLoading ? 'Creating Account...' : 'Create Admin Account'}
            </button>
          </form>

          <Link 
            to="/admin/login"
            style={{
              color: 'var(--primary-maroon)',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            ← Back to Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;