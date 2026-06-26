import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Dealer.css';

const SENTIMENT_EMOJI = { positive: '😊', negative: '😞', neutral: '😐' };

export default function Dealer({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`/djangoapp/get_dealer_details/${id}`, { credentials: 'include' }).then((r) => r.json()),
      fetch(`/djangoapp/get_dealer_reviews/${id}`, { credentials: 'include' }).then((r) => r.json()),
    ])
      .then(([dealerData, reviewData]) => {
        setDealer(dealerData.dealer || null);
        setReviews(reviewData.reviews || []);
      })
      .catch(() => setError('Could not load dealer information.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;
  if (error) return <div className="container page-section"><div className="alert alert-error">{error}</div></div>;
  if (!dealer) return <div className="container page-section"><div className="alert alert-error">Dealer not found.</div></div>;

  return (
    <div className="dealer-page page-section">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/dealers">← All Dealerships</Link>
          <span>/</span>
          <span>{dealer.full_name}</span>
        </div>

        {/* Dealer header */}
        <div className="dealer-header card">
          <div>
            <span className="dealer-state-pill">{dealer.st}</span>
            <h1 className="dealer-page-title">{dealer.full_name}</h1>
            <div className="dealer-meta">
              <span>📍 {dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}</span>
            </div>
          </div>
          {user ? (
            <button className="btn-primary" onClick={() => navigate(`/postreview/${id}`)}>
              ✍️ Write a Review
            </button>
          ) : (
            <Link to="/login" className="btn-outline">Login to Review</Link>
          )}
        </div>

        {/* Reviews */}
        <div className="reviews-section">
          <h2 className="reviews-title">
            Customer Reviews <span className="reviews-count">({reviews.length})</span>
          </h2>

          {reviews.length === 0 ? (
            <div className="reviews-empty">
              <span>📝</span>
              <p>No reviews yet. Be the first to share your experience!</p>
              {user
                ? <button className="btn-primary" onClick={() => navigate(`/postreview/${id}`)}>Write First Review</button>
                : <Link to="/login" className="btn-primary">Login to Review</Link>
              }
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-card card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">{review.name?.charAt(0).toUpperCase()}</div>
                      <div>
                        <p className="reviewer-name">{review.name}</p>
                        <p className="review-date text-muted">{review.purchase_date || 'Date not specified'}</p>
                      </div>
                    </div>
                    <span className={`sentiment-badge sentiment-${review.sentiment}`}>
                      {SENTIMENT_EMOJI[review.sentiment]} {review.sentiment}
                    </span>
                  </div>

                  <p className="review-text">{review.review}</p>

                  {review.purchase && (
                    <div className="review-car-info">
                      🚗 Purchased: <strong>{review.car_year} {review.car_make} {review.car_model}</strong>
                      <span className="badge badge-positive" style={{ marginLeft: '0.5rem' }}>✅ Verified Purchase</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
