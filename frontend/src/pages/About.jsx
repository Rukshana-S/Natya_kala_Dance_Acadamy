import { useState } from 'react';

const About = () => {
  const [userRole] = useState(
    localStorage.getItem('userRole') || ''
  );

  return (
    <div className="animate-fade-in">
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
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Beginner Foundation Classes
                  </li>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="6"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                    Intermediate Technique Development
                  </li>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                    Advanced Performance Training
                  </li>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7 12 2"></polygon></svg>
                    Arangetram Preparation
                  </li>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"></path><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="m2 2 7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
                    Teacher Training Certification
                  </li>
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