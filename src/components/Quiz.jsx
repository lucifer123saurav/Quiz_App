// components/Quiz.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get quiz questions from navigation state
  const quizQuestions = location.state?.quizQuestions || [];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Redirect if no questions available
  useEffect(() => {
    if (quizQuestions.length === 0) {
      alert('No questions available');
      navigate('/');
    }
  }, [quizQuestions, navigate]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(30);
  }, [currentQuestionIndex]);

  // Timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Check if an option is selected
    if (!selectedOption && timeLeft > 0) {
      alert('Please select an answer');
      return;
    }

    // Check if answer is correct
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    // Move to next question or complete quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
    } else {
      setIsQuizComplete(true);
    }
  };

  // Show results if quiz is complete
  if (isQuizComplete) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-lg mb-4">
            Your score: {score} out of {quizQuestions.length}
          </p>
          <p className="text-lg mb-6">
            Percentage: {((score / quizQuestions.length) * 100).toFixed(2)}%
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Current question display
  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-2xl">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-lg">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </span>
          <span className="text-red-500 font-bold">Time Left: {timeLeft}s</span>
        </div>
        
        <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`block w-full p-3 text-left rounded-lg transition-colors ${
                selectedOption === option
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextQuestion}
          className="mt-6 w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;