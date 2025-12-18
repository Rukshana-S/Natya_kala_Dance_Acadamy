import { Link } from 'react-router-dom';
import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';

const Home = () => {
  const [userRole] = useState(
    localStorage.getItem('userRole') || ''
  );

  const features = [
    {
      icon: '🎭',
      title: 'Expert Gurus',
      description: 'Learn from renowned masters with decades of experience in classical Bharatanatyam tradition.'
    },
    {
      icon: '🕉️',
      title: 'Traditional Training',
      description: 'Authentic Guru-Shishya parampara methodology preserving ancient dance wisdom.'
    },
    {
      icon: '📚',
      title: 'Comprehensive Curriculum',
      description: 'From basic adavus to complex varnams, master every aspect of this sacred art form.'
    },
    {
      icon: '🏛️',
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
          <h2 className="section-title">Why Choose Natya Kala</h2>
          <p className="section-subtitle">
            Discover the sacred art of Bharatanatyam through our time-honored teaching methods
            and deep cultural immersion.
          </p>
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
            <div className="column-image">
              <img
                src="/home.jpg"
                alt="Traditional South Indian Temple Architecture"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
              />
            </div>
            <div className="column-content">
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
            </div>
          </div>
        </div>
      </section>

      {/* Student Experiences Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Student Experiences</h2>
          <p className="section-subtitle">
            Hear from our students about their transformative journey in classical dance.
          </p>
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
            <h2>Begin Your Journey Today</h2>
            <p>
              Step into the world of Bharatanatyam and discover the dancer within you.
              Join our academy and become part of a tradition that spans centuries.
            </p>
            <Link to="/register" className="btn-primary">
              Join the Academy
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;