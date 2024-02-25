import React, { useContext } from "react";
import "./CSS/Home.css";
import { Link } from "react-router-dom";
import { UserAuth } from "../authContext";
import { Navigate } from "react-router-dom"; 

function Home() {
  const { user } = UserAuth();
  console.log(user)


  return (
    <div className="home">
      <div className="home__contents">
        {user?.email?(<Link to="/interview">Interview</Link>):(<Link to="/signin">Interview</Link>)}
        {user?(<Link to="/hrquestions">HR Questions</Link>):(<Link to="/signin">HR Questions</Link>)}
        {user?(<Link to="/upload">Summary</Link>):(<Link to="/signin">Summary</Link>)}
      </div>
    </div>
  );
}

export default Home;
