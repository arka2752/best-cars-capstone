import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-icon">🚗</span>
          <span className="logo-text">Best<span className="logo-accent">Cars</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dealers" className="nav-link">Dealerships</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Auth */}
        <div className="nav-auth">
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">👋 {user}</span>
              <button className="btn-outline" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/dealers" className="mobile-link" onClick={() => setMenuOpen(false)}>Dealerships</Link>
        <Link to="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" className="mobile-link" onClick={() => setMenuOpen(false)}>Contact</Link>
        {user ? (
          <button className="mobile-link btn-outline" onClick={handleLogout}>Logout ({user})</button>
        ) : (
          <>
            <Link to="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="mobile-link" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
