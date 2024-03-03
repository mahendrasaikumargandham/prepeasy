import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaMicrophone, FaCheck, FaForward } from 'react-icons/fa'; 
import './ConductInterview.css'

const ConductInterview = () => {
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('/conduct_interview');
                if (response.status === 200) {
                    setQuestions(response.data)
                } else {
                    setError('Error fetching questions')
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoad(false)
            }
        }
        fetchQuestions();
    }, [])

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const startRecording = () => {
        setIsRecording(true);
        const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
        recognition.continuous = false;

        recognition.onstart = () => {
            console.log("Recording started");
        }

        recognition.onresult = (event) => {
            const answer = event.results[0][0].transcript;
            setUserAnswer(answer);
            setIsRecording(false);
            setResponses([...responses, { question: questions[currentQuestionIndex], answer }]);
        };

        recognition.onerror = (event) => {
            console.error('Error occurred in recognition: ', event.error);
            setIsRecording(false);
        };

        recognition.start();
    };

    const nextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setUserAnswer("");
    };

    const submitInterviewResponses = async () => {
        try {
            const response = await axios.post('/submit_responses', { responses });
            console.log(response.data);
            // Handle success or display a message to the user
            navigate('/feedback')
        } catch (error) {
            console.error('Error submitting responses:', error);
            // Handle error or display an error message to the user
        }
    };

    useEffect(() => {
        if (questions.length > 0) {
            speak(questions[currentQuestionIndex]);
        }
    }, [questions, currentQuestionIndex]);

    return (
        <div className="interview-container">
            {load && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!load && !error && (
                <>
                    <video className="interview-video" width="320" height="240" autoPlay loop muted playsInline controls={false}>
                        <source src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/businessman-taking-interview-of-male-candidate-5626084-4702081.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div id="question" className="interview-question">{questions[currentQuestionIndex]}</div>
                    {/* Embedding the video */}
                    
                    {isRecording ? (
                        <div>Recording...</div>
                    ) : (
                        <>
                            <button className="interview-button" onClick={startRecording}><FaMicrophone /> Start Recording</button>
                            <div>Your answer: {userAnswer}</div>
                            <button className="interview-button" onClick={nextQuestion}><FaForward /> Next Question</button>
                        </>
                    )}
                    <button className="interview-button" onClick={submitInterviewResponses}><FaCheck /> Submit Responses</button>
                </>
            )}
        </div>
    );
};

export default ConductInterview;
