import React from 'react'
import "./CSS/Home.css";
import { Link } from 'react-router-dom';

function Account() {
  return (
    <div className="home">
      <div className="home__contents">
        <Link to='/savedanswers'>Saved Answers</Link>
      </div>
    </div>
  )
}

export default Account