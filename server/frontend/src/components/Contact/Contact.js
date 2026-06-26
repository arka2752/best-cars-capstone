import React, { useState } from 'react';
import './Contact.css';

const CONTACT_INFO = [
  { icon: '📧', label: 'Email', value: 'support@bestcars.com' },
  { icon: '📞', label: 'Phone', value: '+1 (800) 555-CARS' },
  { icon: '📍', label: 'HQ', value: '123 Auto Drive, Chicago, IL 60601' },
  { icon: '⏰', label: 'Hours', value: 'Mon–Fri: 9am – 6pm CST' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production this would POST to a backend endpoint
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page page-section">
      <div className="container">
        {/* Hero */}
        <div className="contact-hero">
          <p className="section-tag">Get In Touch</p>
          <h1 className="section-title">Contact <span className="text-gradient">Us</span></h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Have a question, feedback, or want to list your dealership?<br />
            We'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info cards */}
          <div className="contact-info">
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="card contact-info-card">
                <span className="contact-icon">{item.icon}</span>
                <div>
                  <p className="contact-info-label">{item.label}</p>
                  <p className="contact-info-value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="card contact-form-card">
            <h2>Send a Message</h2>
            {submitted ? (
              <div className="alert alert-success" style={{ marginTop: '1rem' }}>
                ✅ Thank you! We'll get back to you within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Full Name</label>
                    <input id="contact-name" name="name" type="text" className="form-control" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input id="contact-email" name="email" type="email" className="form-control" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Subject</label>
                  <input id="contact-subject" name="subject" type="text" className="form-control" placeholder="How can we help?" value={form.subject} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" className="form-control" rows={5} placeholder="Tell us more..." value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Send Message 📨
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
