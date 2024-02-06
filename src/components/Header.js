import React from "react";
import "./CSS/Header.css";

import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <Link to="/">Logo</Link>
      </div>
      {/* <div className="header__right">
        <Link to="/interview">Interview</Link>
        <Link to="/hrquestions">HR Questions</Link>
      </div> */}
    </div>
  );
}

export default Header;
