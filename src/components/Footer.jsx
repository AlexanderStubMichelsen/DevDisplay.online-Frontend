// src/components/Footer.jsx
import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-about">
          <h4 className="footer-heading">About</h4>
          <p className="footer-text">
            <strong>DevDisplay.online</strong> helps developers showcase
            projects and fetch design inspiration from Unsplash.
          </p>
        </div>

        <div className="footer-section footer-navigation">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-list">
            <li><a href="/about" className="footer-link">About</a></li>
            <li><a href="/images" className="footer-link">Images</a></li>
            <li><a href="/signup" className="footer-link">Sign Up</a></li>
            <li><a href="/login" className="footer-link">Login</a></li>
          </ul>
        </div>

        <div className="footer-section footer-connect">
          <h4 className="footer-heading">Connect</h4>
          <ul className="footer-list">
            <li>
              <a
                href="https://github.com/AlexanderStubMichelsen"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/alexander-stub-michelsen-2a6a301a4/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:your-email@example.com" className="footer-link">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section footer-legal">
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-list">
            <li><a href="/terms" className="footer-link">Terms</a></li>
            <li><a href="/privacy" className="footer-link">Privacy</a></li>
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
