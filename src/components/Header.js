import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './CSS/Header.css'
import { UserAuth } from "../authContext";
function Header() {
  const {user,logOut} = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async() =>{
    try{
      await logOut();
      navigate('/');
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="header">
      <p style={{fontWeight:'bold'}}><span style={{color:'orange',fontSize:"20px"}}>PREP</span>EASE</p>
      <div className="subhead">
      <Link className="tabs" to="/">Home</Link>
      {user?.email?(
        <div className="subhead">
          <Link to='/account' className="tabs">Account</Link>
          <p onClick={handleLogout} className="tabs">logOut</p>
        </div>
      ):(
        <div className="subhead">
          <Link className="tabs" to="/signup">Sign Up</Link>
          <Link className="tabs" to="/signin">Sign In</Link>
        </div>
      )}
      
      </div>
    </div>
  );
}

export default Header;
