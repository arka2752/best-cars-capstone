import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userName: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/djangoapp/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.status === 'Authenticated') {
        onLogin(data.userName);
        navigate('/dealers');
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page page-section">
      <div className="container">
        <div className="auth-card glass-panel">
          {/* Decorative glow */}
          <div className="auth-glow" />

          <div className="auth-header">
            <span className="auth-icon">🔐</span>
            <h1 className="section-title" style={{ fontSize: '1.8rem' }}>Welcome Back</h1>
            <p className="text-muted">Sign in to your Best Cars account</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="login-username">Username</label>
              <input
                id="login-username"
                name="userName"
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={form.userName}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              id="login-submit"
              type="submit"
              className="btn-primary auth-submit"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
