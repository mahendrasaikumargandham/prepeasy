import React from "react";
import { Link } from "react-router-dom";
import './CSS/Header.css'

function Header() {
  return (
    <div className="header">
      <p>LOGO</p>
      <div className="subhead">
      <Link className="tabs" to="/">Home</Link>
      <Link className="tabs" to="/signup">Sign Up</Link>
      <Link className="tabs" to="/signin">Sign In</Link>
      </div>
    </div>
  );
}

export default Header;
