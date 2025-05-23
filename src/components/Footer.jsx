import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About</h4>
          <p>
            <strong>DevDisplay.online</strong> helps developers showcase projects
            and fetch design inspiration from Unsplash.
          </p>
        </div>

        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/images">Images</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://github.com/AlexanderStubMichelsen" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/alexander-stub-michelsen-2a6a301a4/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="mailto:your-email@example.com">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/privacy">Privacy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DevDisplay.online. Built by Alexander Stub Michelsen.</p>
      </div>
    </footer>
  );
};

export default Footer;
