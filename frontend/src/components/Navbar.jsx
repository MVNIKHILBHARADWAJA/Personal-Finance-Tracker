import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    
    localStorage.removeItem("token"); 
    navigate("/signIn");
  };
  return (
    <nav className="navbar">
       <div className="nav-links">
        
        <Link to="/">Transactions</Link>
        <Link to="/add">Add new Transaction</Link>
       {!localStorage.getItem("token") ? (
  <>
    <Link to="/signUp">SignUp</Link>
    <Link to="/signIn">SignIn</Link>
  </>
) : (
  <button className='logout' onClick={logOut}>Logout</button>
)}

      </div>
    </nav>
  )
}

export default Navbar;