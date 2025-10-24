import React from "react";
import { Helmet } from "react-helmet-async"
import "../../css/pages/About.css"; // Optional: Add a CSS file for styling
import NavBar from "../modules/NavBar"; // Import NavBar component
import animationVideo from "../../assets/animation/animation.mp4"; // Import the video file
import animationVideo2 from "../../assets/animation/invideo-ai-1080.mp4"; // Import the video file
import animationVideo3 from "../../assets/animation/DevDisplay.online_free.mp4"; // Import the video file
import Footer from "../modules/Footer";
import ScrollIndicator from "../modules/ScrollIndicator"; // Import ScrollIndicator component

const About = () => {
  return (
    <>
      <Helmet>
        <title>About DevDisplay | Developer Showcase Overview</title>
        <meta property="og:title" content="About DevDisplay | Developer Showcase Overview" />
        <meta
          property="og:description"
          content="Learn about DevDisplay's mission and the developer behind the showcase."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devdisplay.online/about" />
        <meta property="og:image" content="https://devdisplay.online/og/about-page.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:title" content="About DevDisplay | Developer Showcase Overview" />
        <meta
          name="twitter:description"
          content="Learn about DevDisplay's mission and the developer behind the showcase."
        />
        <meta name="twitter:image" content="https://devdisplay.online/og/about-page.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <NavBar />
      <div className="about-wrapper">
        <div className="about">
          <div className="content-container">
            <video controls className="video">
              <source src={animationVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <video controls className="video">
              <source src={animationVideo2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <video controls className="video">
              <source src={animationVideo3} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollIndicator />
    </>
  );
};

export default About;
