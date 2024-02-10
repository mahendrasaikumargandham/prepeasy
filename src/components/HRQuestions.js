import React, { useState } from "react";
import "./CSS/HRQuestions.css";

function HRQuestions() {
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const interview_questions = [
        {
            question: "1. Tell me about yourself?",
            answer: `Good morning/afternoon/evening" sir/mam.
            First of all, thank you for giving me this opportunity to introduce myself.           
            My name is Ajeet Kumar.
            As far as my education qualification is concerned, I have done MBA with finance stream from Srivenkateswara university in Emerald's P. G. College, Tirupathi, in the year of 2014.          
            I had completed B.tech from N.I.T Jaipur in 2012.
            I had completed my schooling from G.I.C. Allahabad.           
            As far as concerned my family, I belong to a middle-class family. My father is a Businessman, and my Mother is a homemaker. My brother is preparing for civil services.`
        },
        {
            question: "2. What are your hobbies?",
            answer: `It totally depends on you what you like and what hobbies do you have but always justify your answer.
            For Example:
            My hobbies are dancing, Internet surfing, playing Chess, listening to music, watching the news channel. In my spare time, I like to read news on my phone and traveling to my hometown. Thank you for giving this opportunity to introduce myself.
            `
        },
        {
            question: "3. What are your strengths?",
            answer: `You should always remember that even if your strength is not business related, find a way to relate it to work. Tell your positive points related to the job.
            Possible Answer 
            My main strengths are the ability to use my initiative to take on challenges. I am always proactive at what I do, and that keeps my mind stimulated and focused.
            `
        },
        {
            question: "4. What are your weaknesses?",
            answer: `Everyone has weaknesses so while answering this question don't spend so much time on this. This question is generally asked to know how honest you are with yourself. State one or two minor weaknesses and try to relate it works. (avoid saying "I work too hard" it is a very common answer). Don't pretend you don't have weaknesses and don't avoid answering the question.
            Possible Answer 
            "I am a straightforward person, and I cannot say no when someone asks me for help."
            `
        },
        {
            question: "5. Can you describe your time management skills?",
            answer: `Possible Answer
            “I make a to-do list with timelines and stick to this until any further revision of schedule is announced. That’s how I manage time.”
            `
        },
        {
            question: "6. How do you work under pressure? Can you handle the pressure?",
            answer: `Possible Answer 
            “Working under pressure is what I have done a lot during my college days. I have realized that I can actually work well under pressure.
            It is the pressure factor that brings out maximum efficiency in me.”            
            `
        },
        {
            question: "7. What do you know about us or our company?",
            answer: `Possible Answer 
            “Yours is one of the fastest growing and leading IT firms in India. Both your mission statement and tag line, are catchy and very attractive
            Everyone I know, who is a part of this organization, is very happy about working here. I think this will be a great place for me to perform, show my talent and get recognized as well.
            `
        },
        {
            question: "8. Why do you want to work for us or our company? or Why do you want this job?",
            answer: `“Teamwork is what I truly believe in. When I saw that there was an opening in your organization, I made sure that my application was put in.
            Being a team-player, I believe working together to achieve a higher goal is what drives success in the long run.
            And my skills as an engineer and a team member will give me a 360-degree work satisfaction for me”
            `
        },
        {
            question: "9. Why should we hire you? or Why should I hire you?",
            answer: `Most freshers might treat this as a challenging question. Remember that it’s not some sort of a blow to your ego, but a stress test which you can pass smoothly with a powerful answer.
            Below given is your perfect answer, which you can use in your discussion pertaining to HR interview questions and answers.   
            possible answer
            “Sir/mam, I have great communication skills, desired experience and the requisite skill set for this job role.  
            If I get a chance to showcase my abilities, I will leave no stone unturned with my commitment to hard work and dedication.”
            `
        },
        {
            question: "10. What are your salary expectations?",
            answer: `Possible Answer
            “My salary expectations are in line with the current industry standards, according to my experience and qualifications.”
            `
        },
        {
            question: "11. What are your biggest achievements till date?",
            answer: `Possible Answer 
            “Becoming the Champion with 4 first prizes at the 25th Zonal Sports Meet is my biggest achievement till date.”
            `
        },
    ];

    const handleToggleExpand = (index) => {
        setExpandedIndex(index === expandedIndex ? -1 : index);
    };

    return (
        <div className="hr__questions">
          <h1>HR Insights Hub</h1>
            <div className="individual">
                {interview_questions.map((each, index) => (
                    <div className="question_id" key={index}>
                        <h3>{each.question}</h3>
                        <span onClick={() => handleToggleExpand(index)}>
                            <b>Answer</b>
                        </span>
                        {expandedIndex === index ? (
                            <div className="expandable">
                                {each.answer.split('\n').map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HRQuestions;
