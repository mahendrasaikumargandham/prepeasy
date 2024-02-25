import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Quiz.css'

function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get('/quiz');

        if (response.status === 200) {
          setQuiz(response.data);
        } else {
          setError('Error fetching quiz questions');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  useEffect(() => {
    // Calculate score when userResponses or quiz change
    const calculateScore = () => {
      let totalScore = 0;
      quiz.forEach((question, index) => {
        const correctAnswerIndex = question.options.findIndex(option => Object.keys(option)[0] === question.answer);
        if (userResponses[index] === correctAnswerIndex) {
          totalScore++;
        }
      });
      setScore(totalScore);
    };

    calculateScore(); // Initial score calculation
  }, [userResponses, quiz]);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setUserResponses({
      ...userResponses,
      [questionIndex]: optionIndex
    });
  };

  return (
    <div>
      {loading ? (
        <p className='loading-message'>Loading quiz questions...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className='container'>
          <h2>Quiz</h2>
          <ul>
            {quiz.map((question, questionIndex) => (
              <li key={questionIndex}>
                <p>Question {question.question_number}: {question.question}</p>
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        checked={userResponses[questionIndex] === optionIndex}
                        onChange={() => handleOptionSelect(questionIndex, optionIndex)}
                      />
                      {Object.values(option)[0]}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Link className='link' to={`/score/${score}`}>Get Score</Link>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
