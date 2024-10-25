import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateQuiz from './components/CreateQuiz';
import Quiz from './components/Quiz';

const App = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);

  const handleAddQuestion = (newQuestion) => {
    setQuizQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Home quizQuestions={quizQuestions} />} 
        />
        <Route 
          path="/createQuiz" 
          element={<CreateQuiz onAddQuestion={handleAddQuestion} />} 
        />
        <Route 
          path="/quiz" 
          element={<Quiz />} 
        />
      </Routes>
    </Router>
  );
};

export default App;