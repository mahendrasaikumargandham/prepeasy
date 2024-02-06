import React from "react";
import "./CSS/Home.css";
import { Link } from "react-router-dom";
import Header from "./Header";

function Home() {
  return (
    <div className="home">
      <Header />
      <div className="home__contents">
        <Link to="/interview">Interview</Link>
        <Link to="/hrquestions">HR Questions</Link>
        <Link to="/summary">Summary</Link>
      </div>
    </div>
  );
}

export default Home;
