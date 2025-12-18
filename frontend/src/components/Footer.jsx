import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const [userRole] = useState(
    localStorage.getItem('userRole') || ''
  );

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Natya Kala Academy</h3>
            <p>
              Preserving the sacred art of Bharatanatyam through traditional
              Guru-Shishya parampara. We nurture dancers to express devotion,
              discipline, and cultural excellence through this eternal dance form.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              {userRole !== 'admin' && (
                <>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/register">Register for Class</Link></li>
                </>
              )}
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>📍 123 Cultural Heritage Street<br />Chennai, Tamil Nadu 600001</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ info@natyakala.academy</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Natya Kala Dance Academy. All rights reserved.</p>
          <p>"Dance is the hidden language of the soul"</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;