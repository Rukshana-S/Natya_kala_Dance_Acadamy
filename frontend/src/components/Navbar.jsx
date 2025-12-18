import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  );

  const [userName] = useState(
    localStorage.getItem('userName') || ''
  );

  const [userRole] = useState(
    localStorage.getItem('userRole') || ''
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img
              src="/logo.png"
              alt="Natya Kala Dance Academy"
              className="logo-img"
            />
            Natya Kala Dance Academy
          </Link>

          <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>


            {userRole === 'admin' ? (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''
                      }`}
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/statistics"
                    className={`nav-link ${location.pathname === '/admin/statistics' ? 'active' : ''
                      }`}
                    onClick={closeMenu}
                  >
                    Statistics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/revenue"
                    className={`nav-link ${location.pathname === '/admin/revenue' ? 'active' : ''
                      }`}
                    onClick={closeMenu}
                  >
                    Revenue
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/messages"
                    className={`nav-link ${location.pathname === '/admin/messages' ? 'active' : ''
                      }`}
                    onClick={closeMenu}
                  >
                    Messages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/gallery"
                    className={`nav-link ${location.pathname === '/admin/gallery' ? 'active' : ''
                      }`}
                    onClick={closeMenu}
                  >
                    Gallery Manager
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    to="/gurus"
                    className={`nav-link ${location.pathname === '/gurus' ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    Guru
                  </Link>
                </li>

                <li>
                  <Link
                    to="/gallery"
                    className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={`nav-link ${location.pathname === '/contact' ? 'active' : ''
                      }`}
                    onClick={closeMenu}
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    to="/schedules"
                    className={`nav-link ${location.pathname === '/schedules' ? 'active' : ''
                      }`}
                    onClick={closeMenu}
                  >
                    Class Schedules
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className={`nav-link ${location.pathname === '/register' ? 'active' : ''
                      }`}
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            {!isLoggedIn ? (
              <li>
                <Link to="/login" className="btn-logout" onClick={closeMenu}>
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  Logout ({userName})
                </button>
              </li>
            )}
          </ul>

          {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
