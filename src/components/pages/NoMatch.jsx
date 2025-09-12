import React from "react";
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import "../../css/pages/NoMatch.css";
import abstractbackground from "../../assets/153450-805374052_small-ezgif.com-reverse-video.mp4"; // Import the video file
import ScrollIndicator from "../modules/ScrollIndicator";

const NoMatch = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | DevDisplay</title>
        <meta property="og:title" content="Page Not Found | DevDisplay" />
        <meta
          property="og:description"
          content="The page you're looking for doesn't exist. Find your way back to DevDisplay's main sections."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devdisplay.online/404" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&h=630&q=80"
        />
        <meta name="twitter:title" content="Page Not Found | DevDisplay" />
        <meta
          name="twitter:description"
          content="The page you're looking for doesn't exist. Find your way back to DevDisplay's main sections."
        />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&h=630&q=80"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <NavBar />
      <div className="nomatch-wrapper">
        <div className="nomatch-container">
          <div className="video-container">
            <video autoPlay loop muted playsInline className="video-bg">
              <source src={abstractbackground} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="error-content">
            <div className="error-number">404</div>
            <h1 className="error-title">Page Not Found</h1>
            <p className="error-description">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track!
            </p>

            <div className="error-actions">
              <Link to="/" className="btn-primary">
                🏠 Go Home
              </Link>
              <Link to="/images" className="btn-secondary">
                🖼️ Browse Images
              </Link>
              <Link to="/help" className="btn-secondary">
                ❓ Get Help
              </Link>
            </div>

            <div className="suggested-links">
              <h3>Popular Pages:</h3>
              <ul>
                <li>
                  <Link to="/images">Image Search</Link>
                </li>
                <li>
                  <Link to="/saved">Saved Images</Link>
                </li>
                <li>
                  <a
                    href="https://skraafoto.devdisplay.online"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Skraafoto
                  </a>
                </li>
                <li>
                  <Link to="/help">Help & Guide</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <ScrollIndicator />
    </>
  );
};

export default NoMatch;
