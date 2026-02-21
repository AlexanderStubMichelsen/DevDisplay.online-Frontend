import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import ScrollIndicator from "../modules/ScrollIndicator";
import "../../css/pages/NoMatch.css";

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
        <meta property="og:image" content="https://devdisplay.online/og/404-page.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:title" content="Page Not Found | DevDisplay" />
        <meta
          name="twitter:description"
          content="The page you're looking for doesn't exist. Find your way back to DevDisplay's main sections."
        />
        <meta name="twitter:image" content="https://devdisplay.online/og/404-page.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <NavBar />

      <div className="nomatch-wrapper">
        <div className="nomatch-container">
          <div className="error-content">
            <div className="error-number">404</div>
            <h1 className="error-title">Page Not Found</h1>
            <p className="error-description">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>

            <div className="error-actions">
              <Link to="/" className="btn-primary">
                Go Home
              </Link>
              <Link to="/images" className="btn-secondary">
                Browse Images
              </Link>
              <Link to="/help" className="btn-secondary">
                Get Help
              </Link>
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
