import React from 'react';
import './About.css';

const TEAM = [
  { name: 'Sarah Mitchell', role: 'CEO & Founder', email: 'sarah.mitchell@bestcars.com', emoji: '👩‍💼' },
  { name: 'James Rodriguez', role: 'Head of Partnerships', email: 'james.rodriguez@bestcars.com', emoji: '🤝' },
  { name: 'Lisa Chen', role: 'Lead Developer', email: 'lisa.chen@bestcars.com', emoji: '👩‍💻' },
  { name: 'Marcus Williams', role: 'Customer Success', email: 'marcus.williams@bestcars.com', emoji: '⭐' },
];

const VALUES = [
  { icon: '🔍', title: 'Transparency', desc: 'Every review is authentic and unfiltered. We believe buyers deserve the truth.' },
  { icon: '🤝', title: 'Trust', desc: 'We verify every dealership listing and ensure review integrity at all times.' },
  { icon: '⚡', title: 'Innovation', desc: 'Our AI-powered sentiment analysis keeps us at the cutting edge of review platforms.' },
  { icon: '🌎', title: 'Community', desc: 'We are built by car buyers for car buyers — a nationwide community of drivers.' },
];

export default function About() {
  return (
    <div className="about-page page-section">
      <div className="container">
        {/* Hero */}
        <div className="about-hero">
          <p className="section-tag">Our Story</p>
          <h1 className="section-title">About <span className="text-gradient">Best Cars Dealership</span></h1>
          <p className="section-subtitle">
            Founded in 2020, Best Cars started with a simple mission: make car buying less stressful.
            We connect buyers with honest, AI-verified dealership reviews from real customers across the United States.
          </p>
        </div>

        {/* Mission */}
        <div className="about-mission card">
          <div className="mission-content">
            <h2>🎯 Our Mission</h2>
            <p>
              Buying a car is one of the biggest financial decisions in life. We believe every buyer deserves
              access to reliable, data-driven insights about dealerships in their area. Best Cars aggregates
              real customer experiences and applies AI sentiment analysis to give you a clear picture — before
              you walk through the door.
            </p>
            <p>
              Our platform covers <strong>50 states</strong>, works with <strong>certified dealerships</strong>,
              and uses <strong>NLTK VADER</strong> natural language processing to classify every review instantly.
            </p>
          </div>
          <div className="mission-visual">🚗</div>
        </div>

        {/* Values */}
        <div className="about-section">
          <p className="section-tag">What We Stand For</p>
          <h2 className="section-title">Our Core <span className="text-gradient">Values</span></h2>
          <div className="grid-2" style={{ marginTop: '2rem' }}>
            {VALUES.map((v) => (
              <div key={v.title} className="card value-card">
                <span className="value-icon">{v.icon}</span>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="about-section">
          <p className="section-tag">The People Behind It</p>
          <h2 className="section-title">Meet Our <span className="text-gradient">Team</span></h2>
          <div className="grid-2" style={{ marginTop: '2rem' }}>
            {TEAM.map((member) => (
              <div key={member.name} className="card team-card">
                <div className="team-avatar">{member.emoji}</div>
                <div>
                  <h3>{member.name}</h3>
                  <p className="text-muted">{member.role}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--clr-primary)' }}>
                    📧 {member.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
