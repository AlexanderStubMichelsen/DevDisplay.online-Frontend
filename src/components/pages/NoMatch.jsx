import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import "../../css/NoMatch.css";
import abstractbackground from "../../assets/0_Abstract_Background_3840x2160.mp4";

const NoMatch = () => {
  return (
    <>
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
    </>
  );
};

export default NoMatch;
