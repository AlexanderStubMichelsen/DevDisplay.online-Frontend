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
            <li><a href="/images" className="footer-link">Images</a></li>
            <li><a href="/youtube" className="footer-link">Youtube</a></li>
            <li><a href="/trends" className="footer-link">Trends</a></li>
            <li><a href="/about" className="footer-link">About</a></li>
            <li><a href="/help" className="footer-link">Help</a></li>
          </ul>
        </div>
          <div className="footer-section footer-navigation">
            <h4 className="footer-heading">User</h4>
            <ul className="footer-list">
              <li><a href="/" className="footer-link">Sign Up</a></li>
              <li><a href="/" className="footer-link">Login</a></li>
              <li><a href="/userpage" className="footer-link">User Page</a></li>
            </ul>
        </div>

        <div className="footer-section footer-connect">
          <h4 className="footer-heading">Connect</h4>
          <ul className="footer-list">
             <li>
              <a href="mailto:AlexanderStubMichelsen@gmail.com" className="footer-link">Contact</a>
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
              <a
                href="https://github.com/AlexanderStubMichelsen"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
            </li>
            </ul>
        </div>
        <div className="footer-section footer-connect">
            <h4 className="footer-heading">Code</h4>
            <ul className="footer-list">
            <li>
              <a
                href="https://github.com/AlexanderStubMichelsen/DevDisplay.online-Frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Frontend Code
              </a>
            </li>
            <li>
              <a
                href="https://github.com/AlexanderStubMichelsen/MyPostgresApi"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Backend Code
              </a>
            </li>
          </ul>
        </div>

        {/* <div className="footer-section footer-legal">
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-list">
            <li><a href="/terms" className="footer-link">Terms</a></li>
            <li><a href="/privacy" className="footer-link">Privacy</a></li>
          </ul>
        </div> */}
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DevDisplay.online. Built by Alexander Stub Michelsen.</p>
      </div>
    </footer>
  );
};

export default Footer;
