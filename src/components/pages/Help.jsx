import React from "react";
import "../../css/Help.css";
import NavBar from "../NavBar";
import Footer from "../Footer";
import abstractbackground from "../../assets/0_Abstract_Background_3840x2160.mp4";

function Help() {
  return (
    <>
      <NavBar />
      <div className="help-wrapper">
        <div className="help">
          <video autoPlay loop muted playsInline className="video-bg">
            <source src={abstractbackground} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="text-container">
            <h1 className="help-title">Help & User Guide</h1>
            <p className="help-description">
              Welcome to DevDisplay! This platform helps me showcase my
              projects with powerful search capabilities for images, videos, and
              trending content.
            </p>

            <section className="help-section">
              <h2 className="help-subtitle">Getting Started</h2>
              <ol className="help-list">
                <li>
                  <strong>Search Images:</strong> Use the search bar on the Images
                  page to find photos using the Unsplash API.
                </li>
                <li>
                  <strong>View Full Size:</strong> Click on any image to view it
                  in full resolution.
                </li>
                <li>
                  <strong>Save Favorites:</strong> Create an account and click the
                  "Save" button to bookmark images for later.
                </li>
                <li>
                  <strong>Manage Collection:</strong> View and organize your saved
                  images in the "Saved Images" section.
                </li>
              </ol>
            </section>

            <section className="help-section">
              <h2 className="help-subtitle">Features</h2>
              <ul className="help-features">
                <li>🖼️ High-quality image search powered by Unsplash</li>
                <li>📺 YouTube video integration and trending content</li>
                <li>☁️ Real-time weather information</li>
                <li>👤 User account management and personalization</li>
                <li>📱 Responsive design for all devices</li>
              </ul>
            </section>

            <section className="help-section">
              <h2 className="help-subtitle">Need More Help?</h2>
              <p className="help-contact">
                If you encounter any issues or have questions, feel free to{" "}
                <a
                  href="mailto:AlexanderStubMichelsen@gmail.com"
                  className="help-link"
                  aria-label="Send email to Alexander Stub Michelsen"
                >
                  contact me directly
                </a>
                {" "}or check out the{" "}
                <a
                  href="https://github.com/AlexanderStubMichelsen/DevDisplay.online-Frontend"
                  className="help-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View DevDisplay source code on GitHub"
                >
                  project on GitHub
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
      {/* Add this spacer div */}
      <div style={{ height: '300px', backgroundColor: 'transparent' }}></div>
      <Footer />
    </>
  );
}

export default Help;
