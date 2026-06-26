import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const STATS = [
  { value: '15+', label: 'Dealerships' },
  { value: '500+', label: 'Verified Reviews' },
  { value: '50', label: 'States Covered' },
  { value: '4.8★', label: 'Avg. Rating' },
];

const FEATURES = [
  {
    icon: '🗺️',
    title: 'Browse Nationwide',
    desc: 'Explore certified dealerships across all 50 US states. Filter by location to find the nearest Best Cars outlet.',
  },
  {
    icon: '⭐',
    title: 'Verified Reviews',
    desc: 'Read authentic customer reviews with AI-powered sentiment analysis so you always know the real story.',
  },
  {
    icon: '🤖',
    title: 'AI Sentiment Analysis',
    desc: 'Every review is analyzed by our NLTK-powered engine and tagged as Positive, Neutral, or Negative instantly.',
  },
  {
    icon: '✍️',
    title: 'Share Your Experience',
    desc: 'Create an account and write your own review. Help other buyers make the best choice for their next vehicle.',
  },
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-glow" />
        <div className="container hero-content">
          <p className="section-tag">🚗 Nationwide Dealership Reviews</p>
          <h1 className="hero-title">
            Find Your <span className="text-gradient">Perfect Dealership</span><br />
            Across the USA
          </h1>
          <p className="hero-subtitle">
            Browse, compare, and review car dealerships nationwide. Backed by AI sentiment analysis
            so you always make an informed decision.
          </p>
          <div className="hero-ctas">
            <Link to="/dealers" className="btn-primary">Explore Dealerships →</Link>
            <Link to="/register" className="btn-outline">Get Started Free</Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {STATS.map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Why Best Cars?</p>
            <h2 className="section-title">Everything You Need to<br /><span className="text-gradient">Buy With Confidence</span></h2>
          </div>
          <div className="grid-2 features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="card feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-inner">
          <div>
            <h2>Ready to find your next car?</h2>
            <p className="text-muted">Join thousands of satisfied buyers who used Best Cars.</p>
          </div>
          <Link to="/dealers" className="btn-accent">Browse All Dealerships →</Link>
        </div>
      </section>
    </div>
  );
}
