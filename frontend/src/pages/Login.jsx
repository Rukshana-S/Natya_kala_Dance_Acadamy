import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
      localStorage.setItem('userName', response.data.user.fullName);

      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
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
      justifyContent: 'center'
    }}>
      <div className="animate-scale-in" style={{ maxWidth: '400px', background: 'rgba(245,230,211,0.98)', padding: '3rem', borderRadius: '15px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
        <h1 style={{ color: 'var(--deep-maroon)', marginBottom: '2rem' }}>Login</h1>

        {error && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" disabled={isLoading} style={{ width: '100%', background: 'var(--antique-gold)', color: 'var(--primary-maroon)', border: 'none', padding: '1rem', borderRadius: '25px', fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <Link to="/forgot-password" style={{ color: 'var(--deep-maroon)', fontSize: '0.9rem' }}>Forgot Password?</Link>
          </div>
        </form>

        <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-maroon)', fontWeight: '600' }}>Sign Up</Link>
        </p>
        <Link to="/admin/login" style={{ color: 'var(--primary-maroon)', fontSize: '0.9rem' }}>Admin Login →</Link>
      </div>
    </div>
  );
};

export default Login;