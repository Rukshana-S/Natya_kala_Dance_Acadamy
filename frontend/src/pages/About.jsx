import { useState } from 'react';

const About = () => {
  const [userRole] = useState(
    localStorage.getItem('userRole') || ''
  );

  return (
    <div>
      {/* Hero Banner */}
      <section className="page-hero mandala-bg" style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: 'linear-gradient(rgba(139,35,69,0.6), rgba(101,26,52,0.6)), url("/OurStory.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h1>Our Story</h1>
          <p>
            A legacy of devotion, discipline, and divine dance spanning over three decades
            of preserving the sacred art of Bharatanatyam.
          </p>
        </div>
      </section>

      {/* A Sacred Heritage */}
      <section className="section">
        <div className="container">
          <div className="two-column">
            <div className="column-content">
              <h2>A Sacred Heritage</h2>
              <p>
                Natya Kala Dance Academy was founded with a vision to preserve and propagate
                the ancient art of Bharatanatyam in its most authentic form. Our journey began
                in 1990 when our founder, Guru Lakshmi Devi, established this institution as
                a sanctuary for classical dance education.
              </p>
              <p>
                Rooted in the rich traditions of Tamil Nadu's temple culture, our academy
                serves as a bridge between the ancient and the contemporary, ensuring that
                the spiritual essence of Bharatanatyam continues to flourish in modern times.
              </p>
            </div>
            <div className="column-image">
              <img
                src="/ClassicalDancer.jpg"
                alt="Classical Bharatanatyam Dancer"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Guru-Shishya Parampara */}
      <section className="section mandala-bg">
        <div className="container">
          <div className="two-column">
            <div className="column-image">
              <img
                src="/GuruSisiya.jpg"
                alt="Guru teaching student"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
              />
            </div>
            <div className="column-content">
              <h2>The Guru-Shishya Parampara</h2>
              <p>
                At the heart of our teaching methodology lies the sacred Guru-Shishya tradition,
                where knowledge flows from teacher to student through personal guidance,
                dedication, and spiritual connection. This ancient system ensures that each
                student receives individual attention and develops a deep understanding of
                the art form.
              </p>
              <p>
                Our experienced gurus, trained in the traditional Kalakshetra and Pandanallur
                styles, bring decades of performance and teaching experience. They nurture
                each student's unique potential while maintaining the purity and authenticity
                of classical Bharatanatyam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From Beginners to Masters */}
      <section className="section">
        <div className="container">
          <div className="two-column">
            <div className="column-content">
              <h2>From Beginners to Masters</h2>
              <p>
                Our comprehensive curriculum is designed to guide students through every stage
                of their Bharatanatyam journey. Beginning with fundamental adavus and basic
                positions, students gradually progress to complex choreographies, abhinaya
                (expression), and the spiritual dimensions of the dance.
              </p>
              <p>
                We offer structured levels from beginner to advanced, including specialized
                programs for arangetram preparation, teacher training, and performance
                opportunities. Our students have gone on to become accomplished performers,
                teachers, and cultural ambassadors worldwide.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ color: 'var(--deep-maroon)', marginBottom: '1rem' }}>Our Programs Include:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>🎭 Beginner Foundation Classes</li>
                  <li style={{ marginBottom: '0.5rem' }}>🕉️ Intermediate Technique Development</li>
                  <li style={{ marginBottom: '0.5rem' }}>📚 Advanced Performance Training</li>
                  <li style={{ marginBottom: '0.5rem' }}>🏛️ Arangetram Preparation</li>
                  <li style={{ marginBottom: '0.5rem' }}>🎨 Teacher Training Certification</li>
                </ul>
              </div>
            </div>
            <div className="column-image">
              <img
                src="/begineer.jpg"
                alt="Bharatanatyam performance"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Only show for non-admin users */}
      {userRole !== 'admin' && (
        <section className="cta-section">
          <div className="container">
            <h2>Join Our Sacred Journey</h2>
            <p>
              Become part of our family and experience the transformative power of Bharatanatyam.
              Your journey into this divine art form begins with a single step.
            </p>
            <a href="/register" className="btn-primary">
              Start Your Training
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;