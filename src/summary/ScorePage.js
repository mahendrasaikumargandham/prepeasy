import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './ScorePage.css'; // Import CSS file for styling

function ScorePage() {
  const { score } = useParams(); // Retrieve the score from URL parameters

  // Determine the message based on the score
  let message;
  let className;

  if (score >= 9) {
    message = "Excellent!";
    className = "excellent";
  } else if (score >= 7) {
    message = "Very Good";
    className = "very-good";
  } else if (score >= 5) {
    message = "Good";
    className = "good";
  } else {
    message = "Need to Improve";
    className = "improve";
  }

  return (
    <div className="score-container">
      <div className={`score-message ${className}`}>
        <h1>Your Score: {score}</h1>
        <p>{message}</p>
        <Link className='link1' to='/upload'>Home</Link>
      </div>
    </div>
  );
}

export default ScorePage;
