import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import './App.css';
import localQuestions from './questions.json';

// Main Quiz Component Logic
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const normalizedQuestions = localQuestions.map((q) => ({
      ...q,
      options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
    }));
    setQuestions(normalizedQuestions);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading || showResults) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          if (userAnswers[currentQuestionIndex] === undefined) {
             handleNextQuestion();
          }
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, loading, showResults, userAnswers]);

  const handleAnswerSelect = (selectedAnswer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeLeft(30);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setTimeLeft(30);
    const shuffledQuestions = localQuestions.map((q) => ({
      ...q,
      options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
    }));
    setQuestions(shuffledQuestions);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

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

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = (timeLeft / 30) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isAnswerSelected = userAnswers[currentQuestionIndex] !== undefined;

  return (
    <div className="quiz-container">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${100 - progressPercentage}%` }}></div>
      </div>
      <div className="timer">Time Left: {timeLeft}s</div>
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
      <div className="navigation-buttons">
        <button 
          onClick={handlePreviousQuestion} 
          disabled={currentQuestionIndex === 0} 
          className="prev-button"
        >
          Previous
        </button>
        <button 
          onClick={handleNextQuestion} 
          disabled={!isAnswerSelected} 
          className="next-button"
        >
          {isLastQuestion ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

const MainApp = () => {
  return (
    <Router>
      <div className="quiz-app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
};

export default MainApp;