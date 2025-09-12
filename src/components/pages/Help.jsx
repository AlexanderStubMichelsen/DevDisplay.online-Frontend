import React from "react";
import { Helmet } from "react-helmet-async"
import "../../css/pages/Help.css";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import abstractbackground from "../../assets/153450-805374052_small-ezgif.com-reverse-video.mp4"; // Import the video file
import ScrollIndicator from "../modules/ScrollIndicator"; // Import ScrollIndicator component

function Help() {
  return (
    <>
      <Helmet>
        <title>Help & User Guide | DevDisplay</title>
        <meta property="og:title" content="Help & User Guide | DevDisplay" />
        <meta
          property="og:description"
          content="Discover how to navigate DevDisplay and use its features effectively."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devdisplay.online/help" />
        <meta property="og:image" content="https://devdisplay.online/og/help-page.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:title" content="Help & User Guide | DevDisplay" />
        <meta
          name="twitter:description"
          content="Discover how to navigate DevDisplay and use its features effectively."
        />
        <meta name="twitter:image" content="https://devdisplay.online/og/help-page.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
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
              Welcome to DevDisplay! This platform helps me showcase my projects
              with powerful search capabilities for images, videos, and trending
              content.
            </p>

            <section className="help-section">
              <h2 className="help-subtitle">Getting Started</h2>
              <ol className="help-list">
                <li>
                  <strong>Search Images:</strong> Use the search bar on the
                  Images page to find photos using the Unsplash API.
                </li>
                <li>
                  <strong>View Full Size:</strong> Click on any image to view it
                  in full resolution.
                </li>
                <li>
                  <strong>Save Favorites:</strong> Create an account and click
                  the &quot;Save&quot; button to bookmark images for later.
                </li>
                <li>
                  <strong>Manage Collection:</strong> View and organize your
                  saved images in the &quot;Saved Images&quot; section.
                </li>
                <li>
                  <strong>Explore Zone Kort:</strong> Use Skraafoto to access
                  Danish zoning maps and planning information.
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
                <li>
                  🛰️ Skraafoto - Aerial photography with Zone Kort integration
                </li>
                <li>📋 Danish zoning data through Zone Kort system</li>
              </ul>
            </section>

            <section className="help-section">
              <h2 className="help-subtitle">Featured Project: Skraafoto</h2>
              <p className="help-description">
                <strong>Skraafoto</strong> is my specialized aerial photography
                application that provides access to Danish cadastral and zoning
                data. This powerful tool allows users to explore aerial imagery
                and retrieve detailed planning information through the Zone Kort
                system.
              </p>
              <ul className="help-features">
                <li>
                  🛰️ High-resolution aerial photography from Danish authorities
                </li>
                <li>🗺️ Interactive map with zoom and pan functionality</li>
                <li>
                  📋 <strong>Zone Kort Integration:</strong> Access detailed
                  zoning maps and planning data
                </li>
                <li>🏘️ Local development plans and building regulations</li>
                <li>📍 Precise coordinate-based property information</li>
                <li>📱 Mobile-optimized interface for professional use</li>
              </ul>
              <p className="help-description">
                <strong>How to use Zone Kort:</strong> Select a prefered layer
                and click on any of the high-lighted areas to instantly access
                Zone Kort data, including zoning classifications, building
                restrictions, and development plans for that specific area.
                Essential for architects, developers, and planners.
              </p>
              <p className="help-description">
                Visit{" "}
                <a
                  href="https://skraafoto.devdisplay.online"
                  className="help-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Skraafoto application"
                >
                  Skraafoto
                </a>{" "}
                to explore this Zone Kort integration.
              </p>
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
                </a>{" "}
                or check out the{" "}
                <a
                  href="https://github.com/AlexanderStubMichelsen/DevDisplay.online-Frontend"
                  className="help-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View DevDisplay source code on GitHub"
                >
                  project on GitHub
                </a>
              </p>
            </section>
          </div>
        </div>
        <Footer />
      </div>
      <ScrollIndicator />
    </>
  );
}

export default Help;
