import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function LandingPage() {
  const navigate = useNavigate();  
  const handleViewAllClick = () => {
    navigate('/all-data'); 
  };

  const handleCompareClick = () => {
    navigate('/compare');  
  };

  return (
    <div className="landing-page">
      <h1>Toyota Fuel Economy App</h1>
      <div className="button-container">
        <button onClick={handleViewAllClick} className="landing-button">
          View All Data
        </button>
        <button onClick={handleCompareClick} className="landing-button">
          Compare Cars
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
