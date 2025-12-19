import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const HeroSection = () => {
  const location = useLocation();
  const [userRole] = useState(localStorage.getItem('userRole') || '');
  const hideRegister = userRole === 'admin' || location.pathname.startsWith('/admin');
  return (
    <section className="hero-section-custom" style={{
      minHeight: '100vh',
      backgroundColor: '#8B1538', // Fallback color
      backgroundImage: 'linear-gradient(135deg, rgba(139, 35, 69, 0.65), rgba(101, 26, 52, 0.65)), url("/home1.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>

        <div className="animate-fade-up">
          <h1 className="hero-title-custom" style={{
            fontSize: '4.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#f5e6d3',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            letterSpacing: '2px'
          }}>
            Bharatanatyam
          </h1>
          <p className="hero-subtitle-custom" style={{
            fontSize: '2rem',
            fontStyle: 'italic',
            color: '#d4a574',
            marginBottom: '2rem',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
            fontWeight: '300'
          }}>
            The Eternal Dance
          </p>
          <p className="hero-description-custom" style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            marginBottom: '3rem',
            color: '#f5e6d3',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            maxWidth: '700px',
            margin: '0 auto 3rem'
          }}>
            Experience the sacred art of Bharatanatyam, where every movement tells a story,
            every gesture expresses devotion, and every step connects you to centuries of
            cultural heritage. Join us in preserving this divine dance tradition.
          </p>
          <div className="hero-buttons-custom" style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {!hideRegister && (
              <Link to="/register" className="hero-btn-primary glow-pulse" style={{
                background: '#d4a574',
                color: '#8b2345',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#c9985d';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#d4a574';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.3)';
                }}>
                Register for Class →
              </Link>
            )}
            <Link to="/about" className="hero-btn-secondary" style={{
              background: 'transparent',
              color: '#d4a574',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              border: '2px solid #d4a574',
              cursor: 'pointer',
              boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d4a574';
                e.currentTarget.style.color = '#8b2345';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#d4a574';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
              }}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        /* Responsive styles for Hero Section */
        
        /* Responsive styles for Hero Section */
        @media (max-width: 768px) {
          .hero-section-custom {
            min-height: 70vh !important;
            padding: 2rem 1rem !important;
            background-attachment: scroll !important;
          }
          
          .hero-title-custom {
            font-size: 2.5rem !important;
            letter-spacing: 1px !important;
          }
          
          .hero-subtitle-custom {
            font-size: 1.4rem !important;
          }
          
          .hero-description-custom {
            font-size: 1rem !important;
            padding: 0 1rem !important;
          }
          
          .hero-buttons-custom {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          
          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100% !important;
            text-align: center !important;
            padding: 0.9rem 2rem !important;
            font-size: 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-section-custom {
            min-height: 60vh !important;
            padding: 1.5rem 0.5rem !important;
          }
          
          .hero-title-custom {
            font-size: 1.8rem !important;
            letter-spacing: 0.5px !important;
            margin-bottom: 0.8rem !important;
          }
          
          .hero-subtitle-custom {
            font-size: 1.1rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .hero-description-custom {
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
            margin-bottom: 2rem !important;
          }
          
          .hero-btn-primary,
          .hero-btn-secondary {
            padding: 0.8rem 1.5rem !important;
            font-size: 0.95rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;