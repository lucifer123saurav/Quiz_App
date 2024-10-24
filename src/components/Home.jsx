// components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ quizQuestions }) => {
  const navigate = useNavigate();

  const handleTakeQuiz = () => {
    if (quizQuestions.length > 0) {
      // Pass the entire questions array to Quiz component
      navigate('/quiz', { 
        state: { quizQuestions } 
      });
    } else {
      alert("No questions available. Please create some questions first.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Quiz Application</h1>
      <div className="space-y-4 w-full max-w-md">
        <button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors"
          onClick={() => navigate('/createQuiz')}
        >
          Create Quiz Questions
        </button>
        <button 
          className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors"
          onClick={handleTakeQuiz}
        >
          Take Quiz ({quizQuestions.length} questions available)
        </button>
      </div>
      
      {/* Preview of created questions */}
      {quizQuestions.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Created Questions:</h2>
          {quizQuestions.map((q, index) => (
            <div key={index} className="bg-white p-4 rounded-lg mb-4 shadow">
              <p className="font-medium">Q{index + 1}: {q.question}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;