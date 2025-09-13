import React from 'react';
import {Link} from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className='footer'>
      <div  className='company'>
        &copy; Personal-Finance-Tracker
      </div>
     <div className="footer-links">
       <Link to="/privacy">Privacy</Link>
       <Link to="/terms">Terms</Link>
     </div>
    </footer>
  )
}

export default Footer;