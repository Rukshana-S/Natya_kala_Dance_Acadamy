import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
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
      const response = await axios.post('http://${import.meta.env.VITE_API_URL}/api/auth/login', formData);

      if (response.data.user.role !== 'admin') {
        setError('Access denied. Admin privileges required.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', response.data.user.fullName);

      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Admin login failed');
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
      <div style={{ maxWidth: '400px', background: 'rgba(245,230,211,0.98)', padding: '3rem', borderRadius: '15px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
        <div style={{ width: '60px', height: '60px', background: 'var(--antique-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', color: 'var(--primary-maroon)' }}>👑</div>
        <h1 style={{ color: 'var(--deep-maroon)', marginBottom: '1rem' }}>Admin Login</h1>

        {error && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label>Admin Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Admin Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" disabled={isLoading} style={{ width: '100%', background: 'var(--antique-gold)', color: 'var(--primary-maroon)', border: 'none', padding: '1rem', borderRadius: '25px', fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>
            {isLoading ? 'Signing In...' : 'Access Dashboard'}
          </button>
          <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <Link to="/forgot-password" style={{ color: 'var(--deep-maroon)', fontSize: '0.9rem' }}>Forgot Password?</Link>
          </div>
        </form>

        <Link to="/login" style={{ color: 'var(--primary-maroon)', fontSize: '0.9rem' }}>← Student Login</Link>
      </div>
    </div>
  );
};

export default AdminLogin;