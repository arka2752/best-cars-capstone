import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './PostReview.css';

export default function PostReview({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dealer, setDealer] = useState(null);
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    review: '',
    purchase: false,
    purchase_date: '',
    car_make: '',
    car_model: '',
    car_year: new Date().getFullYear(),
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Load dealer info and car list
  useEffect(() => {
    Promise.all([
      fetch(`/djangoapp/get_dealer_details/${id}`, { credentials: 'include' }).then((r) => r.json()),
      fetch('/djangoapp/get_cars', { credentials: 'include' }).then((r) => r.json()),
    ]).then(([dealerData, carsData]) => {
      setDealer(dealerData.dealer || null);
      setCars(carsData.CarModels || []);
    }).catch(() => setError('Could not load form data.'));
  }, [id]);

  const uniqueMakes = [...new Set(cars.map((c) => c.CarMake))].sort();
  const modelsForMake = cars.filter((c) => c.CarMake === form.car_make);
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Reset model when make changes
      ...(name === 'car_make' ? { car_model: '' } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.review.trim()) { setError('Please write your review.'); return; }
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...form,
        dealership: Number(id),
        car_year: Number(form.car_year),
      };
      const res = await fetch('/djangoapp/add_review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => navigate(`/dealer/${id}`), 2000);
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to submit review. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="postreview-page page-section">
      <div className="container">
        <div className="breadcrumb">
          <Link to={`/dealer/${id}`}>← Back to Dealer</Link>
        </div>

        {submitted ? (
          <div className="review-success card">
            <span>🎉</span>
            <h2>Review Submitted!</h2>
            <p>Thank you for sharing your experience. Redirecting you back…</p>
          </div>
        ) : (
          <div className="postreview-card glass-panel">
            <div className="postreview-header">
              <h1 className="section-title" style={{ fontSize: '1.8rem' }}>
                ✍️ Write a Review
              </h1>
              {dealer && (
                <p className="text-muted">For: <strong style={{ color: 'var(--clr-text)' }}>{dealer.full_name}</strong> — {dealer.city}, {dealer.state}</p>
              )}
              <p className="text-muted reviewer-chip">Posting as: <strong>{user.username}</strong></p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleSubmit} className="postreview-form">
              {/* Review text */}
              <div className="form-group">
                <label className="form-label" htmlFor="review-text">Your Review <span style={{ color: '#ef4444' }}>*</span></label>
                <textarea
                  id="review-text"
                  name="review"
                  className="form-control"
                  rows={5}
                  placeholder="Share your honest experience with this dealership…"
                  value={form.review}
                  onChange={handleChange}
                  required
                />
                <p className="field-hint">Your review will be analyzed by our AI sentiment engine automatically.</p>
              </div>

              {/* Purchase toggle */}
              <div className="purchase-toggle card">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    name="purchase"
                    checked={form.purchase}
                    onChange={handleChange}
                    id="purchase-check"
                  />
                  <span className="toggle-text">✅ I made a purchase at this dealership</span>
                </label>
              </div>

              {/* Car details — shown only if purchased */}
              {form.purchase && (
                <div className="car-details-section">
                  <h3 className="car-details-title">Vehicle Details</h3>
                  <div className="car-details-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="car-date">Purchase Date</label>
                      <input
                        id="car-date"
                        name="purchase_date"
                        type="date"
                        className="form-control"
                        value={form.purchase_date}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="car-year">Year</label>
                      <select id="car-year" name="car_year" className="form-control" value={form.car_year} onChange={handleChange}>
                        {years.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="car-make">Make</label>
                      <select id="car-make" name="car_make" className="form-control" value={form.car_make} onChange={handleChange}>
                        <option value="">Select Make</option>
                        {uniqueMakes.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="car-model">Model</label>
                      <select id="car-model" name="car_model" className="form-control" value={form.car_model} onChange={handleChange} disabled={!form.car_make}>
                        <option value="">Select Model</option>
                        {modelsForMake.map((c, i) => <option key={i} value={c.CarModel}>{c.CarModel}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <button
                id="submit-review"
                type="submit"
                className="btn-primary postreview-submit"
                disabled={loading}
              >
                {loading ? 'Submitting…' : '🚀 Submit Review'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
