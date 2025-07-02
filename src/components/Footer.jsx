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
            <strong>DevDisplay.online</strong> helps me as a developer showcase
            projects..
          </p>
        </div>

        <div className="footer-section footer-navigation">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-list">
            <li><a href="https://skraafoto.devdisplay.online" target="_blank" rel="noopener noreferrer" className="footer-link">Skraafoto</a></li>
            <li><a href="/" className="footer-link">Home</a></li>
            <li><a href="/images" className="footer-link">Images</a></li>
            <li><a href="/saved" className="footer-link">Saved</a></li>
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
              <li><a href="/changepassword" className="footer-link">Change Password</a></li>
              <li><a href="/deleteuser" className="footer-link">Delete User</a></li>

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
                href="https://github.com/AlexanderStubMichelsen/skraafoto.devdisplay"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Skraafoto
              </a>
            </li>
            <li>
              <a
                href="https://github.com/AlexanderStubMichelsen/DevDisplay.online-Frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Frontend
              </a>
            </li>
            <li>
              <a
                href="https://github.com/AlexanderStubMichelsen/MyPostgresApi"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Backend
              </a>
            </li>
            <li>
              <a
                href="https://play.google.com/store/apps/details?id=dk.komputerkomputer.helloworld"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                ONotes(Google Play Store)
              </a>
            </li>
            <li>
              <a
                href="https://github.com/AlexanderStubMichelsen/ONotes"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                ONotes(Android App GitHub)
              </a>
            </li>
            <li>
              <a
                href="https://play.google.com/store/apps/details?id=online.devdisplay.tetris"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Tetris(Google Play Store)
              </a>
            </li>
            <li>
              <a
                href="https://github.com/AlexanderStubMichelsen/Tetris"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Tetris(Android App GitHub)
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
