import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Star, Crown, Landmark, GraduationCap, Globe, CheckCircle } from 'lucide-react';
import '../styles/theme.css';

const Guru = () => {
    // Guru Profile Data
    const guru = {
        name: "Rukmini Vijayakumar",
        role: "Bharatanatyam Exponent | Choreographer | Scholar",
        image: "/guru.jpg",
        stats: [
            { label: "Years of Experience", value: "25+" },
            { label: "Students Trained", value: "500+" },
            { label: "Stage Performances", value: "100+" },
            { label: "Prestigious Awards", value: "20+" }
        ],
        timeline: [
            { year: "1998", event: "Began Classical Training under Legendary Gurus" },
            { year: "2005", event: "First Major Arangetram & Stage Debut" },
            { year: "2012", event: "Started Teaching Professionally" },
            { year: "2018", event: "Received National 'Natya Kala Ratna' Award" },
            { year: "2024", event: "Founder & Artistic Director of Natya Kala Academy" }
        ],
        awards: [
            { title: "Natya Kala Ratna", year: "2018", icon: <Trophy size={32} color="var(--antique-gold)" /> },
            { title: "Nritya Siromani", year: "2020", icon: <Medal size={32} color="var(--antique-gold)" /> },
            { title: "Best Classical Mentor", year: "2022", icon: <Star size={32} color="var(--antique-gold)" /> },
            { title: "State Cultural Excellence", year: "2023", icon: <Crown size={32} color="var(--antique-gold)" /> }
        ],
        venues: [
            "Kapaleeshwarar Temple – Chennai",
            "Brihadeeswarar Temple – Thanjavur",
            "Meenakshi Amman Temple – Madurai",
            "Margazhi Festival – Chennai",
            "International Cultural Events (USA, UK, Singapore)"
        ],
        badges: [
            "Featured in Cultural Journals",
            "Performed at National Sabhas",
            "International Stage Exposure",
            "Invited Guest Performer"
        ]
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="page-hero mandala-bg">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Guru
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        The Guiding Light of Natya Kala
                    </motion.p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="section" style={{ background: '#fff' }}>
                <div className="container">
                    {/* Guru Profile Card */}
                    <div className="guru-card-layout">
                        {/* LEFT: Image Section */}
                        <div className="guru-image-wrapper">
                            <motion.div
                                className="img-container"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            >
                                <img src={guru.image} alt={guru.name} className="guru-main-img" />
                                <div className="gold-border-overlay"></div>
                            </motion.div>
                        </div>

                        {/* RIGHT: Content Section */}
                        <div className="guru-content-wrapper">
                            <h2 className="guru-name">{guru.name}</h2>
                            <p className="guru-role">{guru.role}</p>

                            {/* SECTION 1: Achievement Numbers */}
                            <div className="stats-strip">
                                {guru.stats.map((stat, index) => (
                                    <div key={index} className="stat-item">
                                        <span className="stat-value">{stat.value}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>

                            <hr className="divider-gold" />

                            {/* SECTION 6: Timeline Journey */}
                            <div className="timeline-section">
                                <h3 className="section-subtitle">Artistic Journey</h3>
                                <ul className="timeline-list">
                                    {guru.timeline.map((item, index) => (
                                        <li key={index} className="timeline-item">
                                            <span className="timeline-year">{item.year}</span>
                                            <span className="timeline-marker"></span>
                                            <span className="timeline-event">{item.event}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* SECTION 7: Powerful Quote */}
                            <div className="quote-box">
                                <p>“Bharatanatyam is not learned in steps alone, but through discipline, devotion, and surrender.”</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 & 3 & 5: Impact & Recognition Grid */}
            <section className="section" style={{ background: 'var(--cream)' }}>
                <div className="container">
                    <div className="impact-grid">

                        {/* Awards Column */}
                        <div className="impact-col">
                            <h3 className="impact-title">Awards and Recognitions</h3>
                            <div className="awards-grid">
                                {guru.awards.map((award, index) => (
                                    <div key={index} className="award-card">
                                        <span className="award-icon">{award.icon}</span>
                                        <div>
                                            <div className="award-name">{award.title}</div>
                                            <div className="award-year">{award.year}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Venues & Student Success Column */}
                        <div className="impact-col">
                            <h3 className="impact-title">Prestigious Venues</h3>
                            <ul className="venues-list">
                                {guru.venues.map((venue, index) => (
                                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Landmark size={16} color="var(--antique-gold)" />
                                        {venue}
                                    </li>
                                ))}
                            </ul>

                            <div className="student-success-box">
                                <h4 className="ss-title">Students Trained Under Her Guidance</h4>
                                <div className="ss-stats">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <GraduationCap size={20} color="var(--antique-gold)" /> 50+ Arangetrams Completed
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Globe size={20} color="var(--antique-gold)" /> Performing Nationally
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* SECTION 4: Media Badges */}
                    <div className="badges-row">
                        {guru.badges.map((badge, index) => (
                            <span key={index} className="badge-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <CheckCircle size={16} color="var(--primary-maroon)" /> {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </section>



            {/* Inline Styles for Simplicity & Self-Containment */}
            <style>{`
                /* Layout */
                .guru-card-layout {
                    display: flex;
                    gap: 4rem;
                    align-items: flex-start;
                    margin-bottom: 2rem;
                }
                
                .guru-image-wrapper {
                    flex: 0.8;
                    position: sticky;
                    top: 100px;
                }

                .guru-content-wrapper {
                    flex: 1.2;
                }

                /* Image Styling */
                .img-container {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(139, 21, 56, 0.15);
                }

                .guru-main-img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .gold-border-overlay {
                    position: absolute;
                    inset: 15px;
                    border: 1px solid var(--antique-gold);
                    border-radius: 12px;
                    pointer-events: none;
                    opacity: 0.6;
                }

                /* Typography */
                .guru-name {
                    font-family: 'Playfair Display', serif;
                    font-size: 3rem;
                    color: var(--primary-maroon);
                    margin-bottom: 0.5rem;
                }

                .guru-role {
                    font-size: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #555;
                    margin-bottom: 2rem;
                    font-weight: 500;
                }

                /* Stats Strip */
                .stats-strip {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 2rem;
                }

                .stat-item {
                    border-left: 3px solid var(--antique-gold);
                    padding-left: 1rem;
                }

                .stat-value {
                    display: block;
                    font-size: 2rem;
                    font-family: 'Playfair Display', serif;
                    font-weight: 700;
                    color: var(--primary-maroon);
                    line-height: 1;
                }

                .stat-label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    color: #777;
                    font-weight: 600;
                }

                .divider-gold {
                    border: 0;
                    height: 1px;
                    background: var(--antique-gold);
                    margin: 2rem 0;
                    opacity: 0.3;
                }

                /* Timeline */
                .section-subtitle {
                    font-family: 'Playfair Display', serif;
                    color: var(--dark-brown);
                    margin-bottom: 1.5rem;
                }

                .timeline-list {
                    list-style: none;
                    position: relative;
                    padding-left: 20px;
                    margin-bottom: 3rem;
                }

                .timeline-list:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 5px;
                    bottom: 0;
                    width: 2px;
                    background: var(--antique-gold);
                }

                .timeline-item {
                    position: relative;
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }

                .timeline-marker {
                    position: absolute;
                    left: -24px;
                    top: 6px;
                    width: 10px;
                    height: 10px;
                    background: var(--primary-maroon);
                    border: 2px solid white;
                    outline: 2px solid var(--antique-gold);
                    border-radius: 50%;
                }

                .timeline-year {
                    font-weight: 800;
                    display: block;
                    color: var(--primary-maroon);
                    font-size: 0.9rem;
                }

                .timeline-event {
                    font-size: 1.1rem;
                    color: #444;
                }

                /* Quote Box */
                .quote-box {
                    background: var(--primary-maroon);
                    color: var(--warm-gold);
                    padding: 2rem;
                    border-radius: 12px;
                    font-family: 'Playfair Display', serif;
                    font-style: italic;
                    font-size: 1.2rem;
                    line-height: 1.6;
                    border-left: 5px solid var(--antique-gold);
                    box-shadow: 0 10px 20px rgba(139, 21, 56, 0.2);
                }

                /* Impact Grid */
                .impact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    margin-bottom: 3rem;
                }

                .impact-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.8rem;
                    margin-bottom: 1.5rem;
                    color: var(--deep-maroon);
                    border-bottom: 2px solid var(--antique-gold);
                    display: inline-block;
                    padding-bottom: 0.5rem;
                }

                .awards-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                .award-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    transition: transform 0.3s ease;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                }

                .award-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--antique-gold);
                }

                .award-icon {
                    font-size: 2rem;
                }

                .award-name {
                    font-weight: 700;
                    color: var(--dark-brown);
                    line-height: 1.2;
                }

                .award-year {
                    font-size: 0.85rem;
                    color: #777;
                }

                /* Venues */
                .venues-list {
                    list-style: none;
                }

                .venues-list li {
                    padding: 0.8rem 0;
                    border-bottom: 1px dashed rgba(0,0,0,0.1);
                    font-size: 1.05rem;
                }
                
                .student-success-box {
                    margin-top: 2rem;
                    background: white;
                    padding: 1.5rem;
                    border-radius: 10px;
                    border-left: 4px solid var(--antique-gold);
                }

                .ss-title {
                    margin-bottom: 1rem;
                    color: var(--primary-maroon);
                    font-weight: 700;
                }

                .ss-stats {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    font-weight: 500;
                }

                /* Badges */
                .badges-row {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-top: 3rem;
                }

                .badge-pill {
                    background: white;
                    border: 1px solid var(--antique-gold);
                    padding: 0.5rem 1.5rem;
                    border-radius: 50px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--deep-maroon);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                }



                /* Responsive */
                @media (max-width: 1024px) {
                    .guru-card-layout {
                        flex-direction: column;
                    }
                    
                    .guru-image-wrapper {
                        width: 100%;
                        position: static;
                    }

                    .impact-grid {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }

                    .stats-strip {
                        flex-wrap: wrap;
                        gap: 1.5rem;
                    }
                    
                    .guru-name {
                        font-size: 2.2rem;
                    }


                }
            `}</style>
        </div>
    );
};

export default Guru;
