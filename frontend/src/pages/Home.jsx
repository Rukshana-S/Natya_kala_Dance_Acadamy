
import { Link } from 'react-router-dom';
import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import ScrollReveal from '../components/ScrollReveal';

const Home = () => {
  const [userRole] = useState(
    localStorage.getItem('userRole') || ''
  );

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-maroon)' }}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      title: 'Expert Gurus',
      description: 'Learn from renowned masters with decades of experience in classical Bharatanatyam tradition.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-maroon)' }}>
          <circle cx="12" cy="12" r="3"></circle>
          <path d="m19.07 4.93-1.41 1.41"></path>
          <path d="m4.93 19.07 1.41-1.41"></path>
          <path d="m19.07 19.07-1.41-1.41"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
        </svg>
      ),
      title: 'Traditional Training',
      description: 'Authentic Guru-Shishya parampara methodology preserving ancient dance wisdom.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-maroon)' }}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      ),
      title: 'Comprehensive Curriculum',
      description: 'From basic adavus to complex varnams, master every aspect of this sacred art form.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-maroon)' }}>
          <line x1="3" y1="22" x2="21" y2="22"></line>
          <line x1="6" y1="18" x2="6" y2="11"></line>
          <line x1="10" y1="18" x2="10" y2="11"></line>
          <line x1="14" y1="18" x2="14" y2="11"></line>
          <line x1="18" y1="18" x2="18" y2="11"></line>
          <polygon points="12 2 20 7 4 7 12 2"></polygon>
        </svg>
      ),
      title: 'Cultural Excellence',
      description: 'Immerse yourself in the rich heritage and spiritual essence of South Indian culture.'
    }
  ];

  const testimonials = [
    {
      rating: 5,
      text: 'Natya Kala has transformed my understanding of Bharatanatyam. The traditional approach and spiritual connection make every class a divine experience.',
      author: 'Priya Sharma'
    },
    {
      rating: 5,
      text: 'The Guru-Shishya tradition here is authentic and profound. I have grown not just as a dancer but as a person connected to our cultural roots.',
      author: 'Meera Krishnan'
    }
  ];

  return (
    <div>
      <HeroSection />

      {/* Why Choose Natya Kala Section */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">Why Choose Natya Kala</h2>
            <p className="section-subtitle">
              Discover the sacred art of Bharatanatyam through our time-honored teaching methods
              and deep cultural immersion.
            </p>
          </ScrollReveal>
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Preserving Sacred Traditions Section */}
      <section className="section mandala-bg">
        <div className="container">
          <div className="two-column">
            <ScrollReveal className="column-image">
              <img
                src="/home.jpg"
                alt="Traditional South Indian Temple Architecture"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
              />
            </ScrollReveal>
            <div className="column-content">
              <ScrollReveal>
                <h2>Preserving Sacred Traditions</h2>
                <p>
                  For over three decades, Natya Kala Dance Academy has been a beacon of
                  traditional Bharatanatyam education. Our commitment to preserving the
                  authentic essence of this divine art form ensures that every student
                  connects with the spiritual and cultural depths of classical Indian dance.
                </p>
                <p>
                  Through the sacred Guru-Shishya parampara, we nurture not just skilled
                  dancers, but cultural ambassadors who carry forward the timeless legacy
                  of Bharatanatyam with reverence and excellence.
                </p>
                <Link to="/about" className="btn-primary">
                  Discover Our Story
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Student Experiences Section */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">Student Experiences</h2>
            <p className="section-subtitle">
              Hear from our students about their transformative journey in classical dance.
            </p>
          </ScrollReveal>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                rating={testimonial.rating}
                text={testimonial.text}
                author={testimonial.author}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Only show for non-admin users */}
      {userRole !== 'admin' && (
        <section className="cta-section">
          <div className="container">
            <ScrollReveal>
              <h2>Begin Your Journey Today</h2>
              <p>
                Step into the world of Bharatanatyam and discover the dancer within you.
                Join our academy and become part of a tradition that spans centuries.
              </p>
              <Link to="/register" className="btn-primary glow-pulse">
                Join the Academy
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}
    </div>
  );
};


export default Home;