import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/documents">Documents</Link>
        <Link to="/registration/player">Player Registration</Link>
        <Link to="/registration/transfer">Player Transfer</Link>
        <Link to="/registration/club">Club Registration</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/login">Login</Link>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Middle Sex Premier League. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
