import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = ({ onAddQuestion }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.options.includes(formData.correctAnswer)) {
      alert('Correct answer must match one of the options!');
      return;
    }

    const questionData = {
      question: formData.question,
      options: formData.options,
      answer: formData.correctAnswer
    };

    onAddQuestion(questionData);

    setFormData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    });

    const shouldAddMore = window.confirm('Question added successfully! Do you want to add another question?');
    if (!shouldAddMore) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Create Quiz Question</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Question:</label>
            <input 
              type="text" 
              value={formData.question}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                question: e.target.value
              }))}
              className="w-full p-2 border rounded"
              required 
            />
          </div>

          {formData.options.map((option, index) => (
            <div key={index}>
              <label className="block mb-2">Option {index + 1}:</label>
              <input 
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}

          <div>
            <label className="block mb-2">Correct Answer:</label>
            <input 
              type="text"
              value={formData.correctAnswer}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                correctAnswer: e.target.value
              }))}
              className="w-full p-2 border rounded"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Must match one of the options exactly
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Add Question
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;