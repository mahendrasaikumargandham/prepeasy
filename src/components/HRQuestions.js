import React, { useState } from "react";
import "./CSS/HRQuestions.css";

function HRQuestions() {
    const [expanded, setExpanded] = useState(false);
  const interview_questions = [
    {
      question: "What is your favorite programming language?",
    },
    {
      question: "Why do you want to work at this company?",
    },
    {
      question: "Tell me about yourself",
    },
    {
      question: "What is your favorite programming language?",
    },
    {
      question: "Why do you want to work at this company?",
    },
    {
      question: "Tell me about yourself",
    },
    {
      question: "What is your favorite programming language?",
    },
    {
      question: "Why do you want to work at this company?",
    },
    {
      question: "Tell me about yourself",
    },
    {
      question: "What is your favorite programming language?",
    },
    {
      question: "Why do you want to work at this company?",
    },
    {
      question: "Tell me about yourself",
    },
  ];
  return (
    <div className="hr__questions">
      <div className="individual">
        {interview_questions.map((each) => (
          <div className="question_id">
            <h2>{each.question}</h2>
            <span onClick={() => setExpanded(!expanded)}>
              <b>Read More</b>
            </span>
            {expanded ? (
              <div className="expandable">…contents of the expanded div</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HRQuestions;
