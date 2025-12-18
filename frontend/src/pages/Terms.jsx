import { useEffect } from 'react';

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <section className="page-hero mandala-bg">
                <div className="container">
                    <h1>Terms and Conditions</h1>
                    <p>Guidelines for our sacred Guru-Shishya parampara</p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '800px', background: 'white', padding: '3rem', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    <div className="content-block" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary-maroon)', marginBottom: '1rem' }}>1. Enrollment and Attendance</h3>
                        <p>Students are expected to maintain regular attendance. Absences must be communicated in advance. Consistent irregularity may lead to loss of spot in the batch.</p>
                    </div>

                    <div className="content-block" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary-maroon)', marginBottom: '1rem' }}>2. Fees and Payment</h3>
                        <p>Fees must be paid in advance for the selected plan (Monthly/Quarterly/Yearly). Fees once paid are non-refundable and non-transferable.</p>
                    </div>

                    <div className="content-block" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary-maroon)', marginBottom: '1rem' }}>3. Code of Conduct</h3>
                        <p>All students must adhere to the traditional dress code during practice. Respect for the Guru and fellow students is paramount in our academy.</p>
                    </div>

                    <div className="content-block" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary-maroon)', marginBottom: '1rem' }}>4. Health and Safety</h3>
                        <p>Students should inform the instructor of any medical conditions. The academy is not liable for injuries sustained during unauthorized practice.</p>
                    </div>

                    <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'gray' }}>Last Updated: December 2024</p>
                </div>
            </section>
        </div>
    );
};

export default Terms;
