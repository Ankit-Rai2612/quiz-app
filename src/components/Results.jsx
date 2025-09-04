import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use optional chaining to prevent crashes if state is undefined
  const { questions, userAnswers } = location.state || { questions: [], userAnswers: [] };

  if (questions.length === 0) {
    return (
      <div className="results-container">
        <h2>No quiz data found.</h2>
        <button onClick={() => navigate('/quiz')} className="restart-button">Go to Quiz</button>
      </div>
    );
  }

  const score = questions.reduce((acc, question, index) => {
    return acc + (userAnswers[index] === question.correct_answer ? 1 : 0);
  }, 0);

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <p className="final-score">You scored {score} out of {questions.length}</p>
      <div className="summary">
        {questions.map((question, index) => (
          <div key={index} className="result-item">
            <p className="question-text" dangerouslySetInnerHTML={{ __html: question.question }}></p>
            <p className="correct-answer">
              **Correct Answer:** <span dangerouslySetInnerHTML={{ __html: question.correct_answer }}></span>
            </p>
            <p className={`your-answer ${userAnswers[index] === question.correct_answer ? 'correct' : 'incorrect'}`}>
              **Your Answer:** <span dangerouslySetInnerHTML={{ __html: userAnswers[index] || 'Not Answered' }}></span>
            </p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/quiz')} className="restart-button">Restart Quiz</button>
    </div>
  );
};

export default ResultsPage;