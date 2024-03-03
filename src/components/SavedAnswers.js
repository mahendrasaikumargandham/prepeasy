import React, { useEffect, useState } from 'react'
import { UserAuth } from '../authContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import "./CSS/HRQuestions.css";

function SavedAnswers() {
    const [ans,setAns] = useState([]); // Initialize ans with an empty array
    const {user} = UserAuth();
    
    useEffect(() =>{
        const unsubscribe = onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
            if (doc.exists()) {
                setAns(doc.data()?.answers || []); // Set ans to an empty array if answers are undefined
            } else {
                setAns([]); // Handle the case where the document doesn't exist
            }
        })

        return () => unsubscribe(); // Cleanup function to unsubscribe from snapshot listener
    },[user?.email])

    return (
        <div className='hr__questions'>
            {ans.map((item,id) =>(
                <p className='individual' key={id}> {/* Add key prop to the parent element */}
                    <div className='question_id'>
                        <h3 className=''>{item?.question}</h3>
                        <p className='expandable'>{item?.answer}</p>
                    </div>
                </p>
            ))}
        </div>
    )
}

export default SavedAnswers
