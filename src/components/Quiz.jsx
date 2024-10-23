import React, { useState, useEffect } from 'react';
import QuizResult from './QuizResult'; 

const quizQuestions = [
    {
      question: 'Which of the following is NOT a JavaScript data type?',
      options: ['Undefined', 'Number', 'Boolean', 'Float'],
      answer: 'Float',
    },
    {
      question: 'Which company developed JavaScript?',
      options: ['Netscape', 'Mozilla', 'Microsoft', 'Oracle'],
      answer: 'Netscape',
    },
    {
      question: 'Which of the following is used to declare a variable in JavaScript?',
      options: ['var', 'let', 'const', 'All of the above'],
      answer: 'All of the above',
    },
    {
      question: 'How do you write "Hello World" in an alert box?',
      options: ['alertBox("Hello World");', 'alert("Hello World");', 'msg("Hello World");', 'msgBox("Hello World");'],
      answer: 'alert("Hello World");',
    },
    {
      question: 'Which of the following is a correct way to create an array in JavaScript?',
      options: ['var arr = (1, 2, 3)', 'var arr = [1, 2, 3]', 'var arr = {1, 2, 3}', 'var arr = "1, 2, 3"'],
      answer: 'var arr = [1, 2, 3]',
    },
    {
      question: 'Which method is used to remove the last element of an array in JavaScript?',
      options: ['shift()', 'pop()', 'remove()', 'slice()'],
      answer: 'pop()',
    },
    {
      question: 'How do you round the number 7.25 to the nearest integer in JavaScript?',
      options: ['Math.rnd(7.25)', 'Math.round(7.25)', 'rnd(7.25)', 'round(7.25)'],
      answer: 'Math.round(7.25)',
    },
    // {
    //   question: 'Which event occurs when the user clicks on an HTML element?',
    //   options: ['onchange', 'onclick', 'onmouseover', 'onmouseclick'],
    //   answer: 'onclick',
    // },
    // {
    //   question: 'What is the correct syntax for referring to an external script file called "script.js"?',
    //   options: ['<script src="script.js">', '<script href="script.js">', '<script ref="script.js">', '<script name="script.js">'],
    //   answer: '<script src="script.js">',
    // },
    // {
    //   question: 'How can you add a comment in JavaScript?',
    //   options: ['<!-- This is a comment -->', '// This is a comment', '/* This is a comment */', 'Both // and /* */'],
    //   answer: 'Both // and /* */',
    // },
    // {
    //   question: 'Which operator is used to assign a value to a variable in JavaScript?',
    //   options: ['*', '=', '==', '==='],
    //   answer: '=',
    // },
    // {
    //   question: 'Which method can be used to convert a string to lowercase letters?',
    //   options: ['toLower()', 'toLowerCase()', 'changeCase(lower)', 'None of the above'],
    //   answer: 'toLowerCase()',
    // },
    // {
    //   question: 'Which built-in method returns the length of the string?',
    //   options: ['length()', 'size()', 'index()', 'length'],
    //   answer: 'length',
    // },
    // {
    //   question: 'What is the correct way to write a JavaScript array?',
    //   options: ['var colors = "red", "green", "blue"', 'var colors = ["red", "green", "blue"]', 'var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = {red, green, blue}'],
    //   answer: 'var colors = ["red", "green", "blue"]',
    // },
    // {
    //   question: 'Which method is used to remove the first element from an array in JavaScript?',
    //   options: ['pop()', 'shift()', 'slice()', 'splice()'],
    //   answer: 'shift()',
    // },
    // {
    //   question: 'What will be the output of the following code: console.log(typeof null);',
    //   options: ['"object"', '"null"', '"undefined"', '"string"'],
    //   answer: '"object"',
    // },
    // {
    //   question: 'How do you create a function in JavaScript?',
    //   options: ['function = myFunction()', 'function myFunction()', 'function:myFunction()', 'create.myFunction()'],
    //   answer: 'function myFunction()',
    // },
    // {
    //   question: 'What is the purpose of the "this" keyword in JavaScript?',
    //   options: ['It refers to the current function.', 'It refers to the global object.', 'It refers to the current object.', 'It refers to the previous object.'],
    //   answer: 'It refers to the current object.',
    // },
    // {
    //   question: 'Which method is used to add one or more elements to the end of an array?',
    //   options: ['push()', 'pop()', 'concat()', 'append()'],
    //   answer: 'push()',
    // },
    // {
    //   question: 'What does JSON stand for?',
    //   options: ['JavaScript Object Notation', 'JavaScript Online Notation', 'Java Source Object Notation', 'JavaScript Object Navigator'],
    //   answer: 'JavaScript Object Notation',
    // },
  ];


const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timeLeft, setTimeLeft] = useState(30); 
  const [isQuizComplete, setIsQuizComplete] = useState(false); 

  
  useEffect(() => {
    setTimeLeft(30); 
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === '' && timeLeft > 0) {
      alert('Please Select the answer');
      return;
    }

    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setSelectedOption('');
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setIsQuizComplete(true);
    }
  };

  if (isQuizComplete) {
    return <QuizResult score={score} totalQuestions={quizQuestions.length} />;
  }

  return (
    <div className="bg-white shadow-md p-4 rounded-lg w-1/2">
      <h2 className="text-xl font-bold mb-4">{quizQuestions[currentQuestion].question}</h2>
      <div className="mb-2">
        <span className="text-red-500 font-bold">Time Left: {timeLeft}s</span>
      </div>
      <div>
        {quizQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`block w-full p-2 my-2 text-left rounded-lg ${
              selectedOption === option ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleNextQuestion}
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;
