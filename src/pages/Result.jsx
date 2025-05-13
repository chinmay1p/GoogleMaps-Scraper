import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Result() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const query = new URLSearchParams(useLocation().search);
  const company = query.get("company");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ company }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Unknown error");
        setReviews(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [company]);

  // Dark theme inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    padding: '1.5rem',
    background: 'linear-gradient(to bottom right, #1F2937, #111827)',
    color: '#F9FAFB'
  };

  const contentStyle = {
    width: '100%',
    maxWidth: '42rem',
    margin: '0 auto',
    padding: '1rem'
  };

  const headerStyle = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F9FAFB',
    marginBottom: '1.5rem',
    marginTop: '1rem'
  };

  const backButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    color: '#9CA3AF',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    marginBottom: '1rem',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    transition: 'background-color 0.2s',
    backgroundColor: 'transparent'
  };

  const backButtonHoverStyle = {
    ...backButtonStyle,
    backgroundColor: 'rgba(55, 65, 81, 0.5)'
  };

  const [isBackButtonHovering, setIsBackButtonHovering] = useState(false);

  const errorStyle = {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#FCA5A5',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
    border: '1px solid rgba(239, 68, 68, 0.3)'
  };

  const reviewCardStyle = {
    backgroundColor: '#1E293B',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid #374151'
  };

  const reviewTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#F9FAFB',
    marginBottom: '0.5rem'
  };

  const ratingStyle = {
    color: '#FBBF24',
    fontSize: '1rem',
    marginBottom: '0.75rem'
  };

  const reviewTextStyle = {
    color: '#D1D5DB',
    fontSize: '1rem',
    lineHeight: '1.5'
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '2rem',
    color: '#9CA3AF'
  };

  const noReviewsStyle = {
    textAlign: 'center',
    padding: '2rem',
    color: '#9CA3AF',
    backgroundColor: '#1E293B',
    borderRadius: '0.75rem',
    border: '1px solid #374151'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <button 
          onClick={() => navigate('/')}
          style={isBackButtonHovering ? backButtonHoverStyle : backButtonStyle}
          onMouseEnter={() => setIsBackButtonHovering(true)}
          onMouseLeave={() => setIsBackButtonHovering(false)}
        >
          <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to Search
        </button>
        
        <h2 style={headerStyle}>Top Reviews for {company}</h2>
        
        {error && <div style={errorStyle}>{error}</div>}
        
        {loading ? (
          <div style={loadingStyle}>Loading reviews...</div>
        ) : reviews.length === 0 && !error ? (
          <div style={noReviewsStyle}>No reviews found for {company}</div>
        ) : (
          reviews.map((r, i) => (
            <div key={i} style={reviewCardStyle}>
              <h3 style={reviewTitleStyle}>{r.title}</h3>
              <p style={ratingStyle}>{"★".repeat(r.rating)} ({r.rating}/5)</p>
              <p style={reviewTextStyle}>{r.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Result;