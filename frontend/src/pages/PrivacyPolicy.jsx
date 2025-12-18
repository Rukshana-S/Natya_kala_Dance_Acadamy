import { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <section className="page-hero mandala-bg">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p>How we protect your personal information</p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '800px', background: 'white', padding: '3rem', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    <div className="content-block" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary-maroon)', marginBottom: '1rem' }}>1. Information We Collect</h3>
                        <p>We collect personal detailed provided during registration such as Name, Age, Email, and Phone Number solely for academy administration purposes.</p>
                    </div>

                    <div className="content-block" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary-maroon)', marginBottom: '1rem' }}>2. Use of Information</h3>
                        <p>Your information is used to manage class schedules, process fee payments, and communicate important updates regarding the academy.</p>
                    </div>

                    <div className="content-block" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary-maroon)', marginBottom: '1rem' }}>3. Data Protection</h3>
                        <p>We implement appropriate security measures to maintain the safety of your personal information. We do not sell or trade your personally identifiable information to outside parties.</p>
                    </div>

                    <div className="content-block" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary-maroon)', marginBottom: '1rem' }}>4. Media Rights</h3>
                        <p>Photos or videos taken during public performances or classes may be used for academy promotion with students' consent.</p>
                    </div>

                    <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'gray' }}>Last Updated: December 2024</p>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
