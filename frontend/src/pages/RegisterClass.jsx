import { useState } from 'react';
import axios from 'axios';

const RegisterClass = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    phoneNumber: '',
    isMentallyChallenged: false,
    preferredBatch: '',
    experienceLevel: '',
    feePlan: '',
    amount: '',
    paymentMode: ''
  });
  const [assignedTimetable, setAssignedTimetable] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newFormData = { ...formData };
    
    if (type === 'checkbox') {
      newFormData[name] = checked;
      // If mentally challenged, clear batch and level selections
      if (name === 'isMentallyChallenged' && checked) {
        newFormData.preferredBatch = '';
        newFormData.experienceLevel = '';
        setAssignedTimetable({
          id: 'inclusive-special',
          name: 'Inclusive Dance Program (Mentally Challenged Students)',
          batch: 'Special Inclusive',
          level: 'Inclusive',
          startTime: '19:00',
          endTime: '20:00',
          days: ['Saturday', 'Sunday'],
          slots: [
            { time: '7:00–7:10', activity: 'Free Movement' },
            { time: '7:10–7:25', activity: 'Rhythm Games' },
            { time: '7:25–7:40', activity: 'Expression with Gestures' },
            { time: '7:40–8:00', activity: 'Assisted Dance & Relaxation' }
          ]
        });
      } else if (name === 'isMentallyChallenged' && !checked) {
        setAssignedTimetable(null);
      }
    } else {
      newFormData[name] = value;
    }

    // Auto-calculate amount if feePlan changes
    if (name === 'feePlan') {
      const prices = {
        'weekly': 500,
        'monthly': 2000,
        'yearly': 20000
      };
      newFormData.amount = prices[value] || '';
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:5000/api/registrations', formData);
      setSubmitMessage('Registration submitted successfully! We will contact you soon.');
      setFormData({
        fullName: '',
        age: '',
        email: '',
        phoneNumber: '',
        isMentallyChallenged: false,
        preferredBatch: '',
        experienceLevel: '',
        feePlan: '',
        amount: '',
        paymentMode: ''
      });
      setAssignedTimetable(null);
    } catch (error) {
      setSubmitMessage(error.response?.data?.message || 'Error submitting registration. Please try again.');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 4000);
  };

  const isFormValid = () => {
    const baseFields = formData.fullName && formData.age && formData.email && 
                      formData.phoneNumber && formData.feePlan && formData.paymentMode;
    
    if (formData.isMentallyChallenged) {
      return baseFields && formData.amount;
    } else {
      return baseFields && formData.preferredBatch && formData.experienceLevel && formData.amount;
    }
  };

  return (
    <div>
      <section className="page-hero mandala-bg">
        <div className="container">
          <h1>Register for Class</h1>
          <p>Begin your sacred journey into the world of Bharatanatyam</p>
        </div>
      </section>

      <section className="section mandala-bg">
        <div className="container">
          <div className="enhanced-form-container">
            <div className="form-header">
              <div className="form-icon">🎭</div>
              <h2>Join Our Sacred Journey</h2>
              <p>Begin your transformation through the divine art of Bharatanatyam</p>
            </div>

            {submitMessage && (
              <div className={`alert ${submitMessage.includes('Error') ? 'alert-error' : 'alert-success'}`}>
                <div className="alert-icon">
                  {submitMessage.includes('Error') ? '⚠️' : '✅'}
                </div>
                <div>{submitMessage}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="enhanced-form">
              <div className="form-section">
                <div className="section-header">
                  <span className="section-icon">👤</span>
                  <h3>Personal Information</h3>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">Age *</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Your age"
                      min="5"
                      max="80"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number *</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="isMentallyChallenged"
                      name="isMentallyChallenged"
                      checked={formData.isMentallyChallenged}
                      onChange={handleChange}
                    />
                    <label htmlFor="isMentallyChallenged" className="checkbox-label">
                      💜 Is the student mentally challenged? (Join our inclusive program)
                    </label>
                  </div>
                </div>
              </div>

              {!formData.isMentallyChallenged && (
                <div className="form-section">
                  <div className="section-header">
                    <span className="section-icon">🕉️</span>
                    <h3>Class Preferences</h3>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferredBatch">Preferred Batch *</label>
                      <select
                        id="preferredBatch"
                        name="preferredBatch"
                        value={formData.preferredBatch}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose your preferred time</option>
                        <option value="morning">🌅 Morning (6:30 AM - 11:00 AM)</option>
                        <option value="evening">🌆 Evening (5:00 PM - 9:30 PM)</option>
                        <option value="weekend">🎭 Weekend (8:00 AM - 6:00 PM)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="experienceLevel">Experience Level *</label>
                      <select
                        id="experienceLevel"
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select your experience</option>
                        <option value="complete-beginner">🌱 Complete Beginner</option>
                        <option value="some-experience">🌿 Some Experience</option>
                        <option value="intermediate">🌳 Intermediate</option>
                        <option value="advanced">🏛️ Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {formData.isMentallyChallenged && (
                <div className="form-section inclusive-info-section">
                  <div className="section-header">
                    <span className="section-icon">💜</span>
                    <h3>Your Assigned Program</h3>
                  </div>
                  {assignedTimetable && (
                    <div className="timetable-preview">
                      <h4>{assignedTimetable.name}</h4>
                      <p><strong>Schedule:</strong> Saturdays & Sundays, 7:00 PM - 8:00 PM</p>
                      <table className="preview-table">
                        <thead>
                          <tr>
                            <th>Time</th>
                            <th>Activity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignedTimetable.slots.map((slot, idx) => (
                            <tr key={idx}>
                              <td>{slot.time}</td>
                              <td>{slot.activity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="inclusive-note">
                        Our inclusive program focuses on movement, rhythm, and self-expression in a supportive environment.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="form-section">
                <div className="section-header">
                  <span className="section-icon">💰</span>
                  <h3>Fee & Payment Details</h3>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="feePlan">Fee Plan *</label>
                    <select
                      id="feePlan"
                      name="feePlan"
                      value={formData.feePlan}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a plan</option>
                      <option value="weekly">Weekly (₹500)</option>
                      <option value="monthly">Monthly (₹2,000)</option>
                      <option value="yearly">Yearly (₹20,000)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="amount">Amount (₹) *</label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      readOnly
                      className="readonly-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="paymentMode">Payment Mode *</label>
                  <select
                    id="paymentMode"
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select payment mode</option>
                    <option value="cash">Cash</option>
                    <option value="gpay">GPay</option>
                  </select>
                </div>
              </div>

              <div className="form-submit">
                <button
                  type="submit"
                  className="enhanced-submit-btn"
                  disabled={isSubmitting || !isFormValid()}
                >
                  <span className="btn-icon">{isSubmitting ? '⏳' : '🎭'}</span>
                  <span>{isSubmitting ? 'Submitting Your Application...' : 'Begin My Sacred Journey'}</span>
                </button>
                <p className="form-note">
                  By registering, you join our sacred Guru-Shishya tradition
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterClass;