import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedPrivacyPolicy: false,
    acceptedTerms: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      formData.acceptedPrivacyPolicy &&
      formData.acceptedTerms
    );
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

    if (!formData.acceptedPrivacyPolicy || !formData.acceptedTerms) {
      setError('You must agree to the Privacy Policy and Terms & Conditions to continue.');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        acceptedPrivacyPolicy: formData.acceptedPrivacyPolicy,
        acceptedTerms: formData.acceptedTerms
      });

      alert('Account created successfully! Please login.');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed');
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
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '450px', width: '100%', background: 'rgba(245,230,211,0.98)', padding: '3rem', borderRadius: '15px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
        <h1 style={{ color: 'var(--deep-maroon)', marginBottom: '2rem' }}>Create Account</h1>

        {error && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          {/* Consent Checkboxes */}
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  name="acceptedPrivacyPolicy"
                  checked={formData.acceptedPrivacyPolicy}
                  onChange={handleChange}
                  style={{ marginRight: '0.5rem', marginTop: '0.2rem', cursor: 'pointer' }}
                />
                <span>
                  I read and agree to the{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--primary-maroon)',
                      textDecoration: 'underline',
                      fontWeight: '600'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleChange}
                  style={{ marginRight: '0.5rem', marginTop: '0.2rem', cursor: 'pointer' }}
                />
                <span>
                  I read and agree to the{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--primary-maroon)',
                      textDecoration: 'underline',
                      fontWeight: '600'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms & Conditions
                  </a>
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid()}
            style={{
              width: '100%',
              background: isFormValid() ? 'var(--antique-gold)' : '#ccc',
              color: isFormValid() ? 'var(--primary-maroon)' : '#666',
              border: 'none',
              padding: '1rem',
              borderRadius: '25px',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '1rem',
              cursor: isFormValid() ? 'pointer' : 'not-allowed',
              opacity: isFormValid() ? 1 : 0.6,
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-maroon)', fontWeight: '600' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;