import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="home-content">
        <h1>Welcome to the Quiz App!</h1>
        <p>Test your knowledge with our fun and challenging quizzes.</p>
        <Link to="/quiz" className="start-button">Start Quiz</Link>
      </div>
    </div>
  );
};

export default HomePage;