import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function Home() {
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company.trim()) return;
    navigate(`/result?company=${encodeURIComponent(company)}`);
  };

  // Dark theme inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100vh',
    padding: '1.5rem',
    background: 'linear-gradient(to bottom right, #1F2937, #111827)'
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '28rem',
    margin: '0 auto',
    padding: '2rem',
    background: '#1E293B',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    border: '1px solid #374151'
  };

  const headerStyle = { 
    fontSize: '1.875rem', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#F9FAFB', 
    marginBottom: '1.5rem', 
    width: '100%' 
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: '1.5rem'
  };

  const inputContainerStyle = {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  };

  const inputStyle = {
    width: '100%',
    paddingLeft: '2.5rem',
    paddingRight: '1rem',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    border: '2px solid #374151',
    borderRadius: '0.5rem',
    outline: 'none',
    backgroundColor: '#111827',
    color: '#F9FAFB',
    fontSize: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    color: 'white',
    fontWeight: '500',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s'
  };

  const hoverButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2563EB'
  };

  const [isHovering, setIsHovering] = useState(false);

  const footerTextStyle = { 
    color: '#9CA3AF', 
    fontSize: '0.875rem', 
    textAlign: 'center', 
    marginTop: '1.5rem', 
    width: '100%' 
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>
          Company Search
        </h2>
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputContainerStyle}>
            <div style={{ 
              position: 'absolute', 
              left: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              pointerEvents: 'none' 
            }}>
              <Search color="#9CA3AF" size={20} />
            </div>
            
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Amazon India"
              style={inputStyle}
            />
          </div>
          
          <button
            type="submit"
            style={isHovering ? hoverButtonStyle : buttonStyle}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span>Find Company</span>
          </button>
        </form>
        
        <p style={footerTextStyle}>
          Enter a company name to see detailed information
        </p>
      </div>
    </div>
  );
}

export default Home;