import React, { useState, useEffect } from 'react';
import './App.css'; // Make sure your CSS file is in the src directory

const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

const Quiz = () => {
  // State for quiz data and flow
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Fetch questions from the API on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const normalizedQuestions = data.results.map((q) => ({
        ...q,
        options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      }));
      setQuestions(normalizedQuestions);
      setLoading(false);
      
      // Reset quiz for a new session
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setShowResults(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    fetchQuestions(); // Restart by fetching new questions
  };

  // Render different views based on state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // Display results page
  if (showResults) {
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
        <button onClick={handleRestartQuiz} className="restart-button">Restart Quiz</button>
      </div>
    );
  }

  // Display quiz questions
  const currentQuestion = questions[currentQuestionIndex];
  const isAnswerSelected = userAnswers[currentQuestionIndex] !== undefined;

  return (
    <div className="quiz-container">
      <div className="progress">Question {currentQuestionIndex + 1} of {questions.length}</div>
      <h2 dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></h2>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${userAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
            onClick={() => handleAnswerSelect(option)}
          >
            <div dangerouslySetInnerHTML={{ __html: option }}></div>
          </button>
        ))}
      </div>
      <button 
        onClick={handleNextQuestion} 
        disabled={!isAnswerSelected} 
        className="next-button"
      >
        {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};

export default Quiz;