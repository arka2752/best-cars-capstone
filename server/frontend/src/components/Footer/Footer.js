import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-icon">🚗</span>
          <span className="footer-logo-text">Best<span>Cars</span></span>
          <p className="footer-tagline">Your trusted dealership reviews network across the US.</p>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/dealers">Dealerships</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-links">
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="footer-links">
          <h4>Legal</h4>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Use</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Best Cars Dealership. IBM Capstone Project.</p>
        </div>
      </div>
    </footer>
  );
}
