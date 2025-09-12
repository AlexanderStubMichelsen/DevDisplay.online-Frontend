import React from "react";
import { Helmet } from "react-helmet-async"
import "../../css/pages/About.css"; // Optional: Add a CSS file for styling
import NavBar from "../modules/NavBar"; // Import NavBar component
import animationVideo from "../../assets/animation/animation.mp4"; // Import the video file
import animationVideo2 from "../../assets/animation/invideo-ai-1080.mp4"; // Import the video file
import animationVideo3 from "../../assets/animation/DevDisplay.online_free.mp4"; // Import the video file
import Footer from "../modules/Footer";
import abstractbackground from "../../assets/153450-805374052_small-ezgif.com-reverse-video.mp4"; // Import the video file
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
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1200&h=630&q=80"
        />
        <meta name="twitter:title" content="About DevDisplay | Developer Showcase Overview" />
        <meta
          name="twitter:description"
          content="Learn about DevDisplay's mission and the developer behind the showcase."
        />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1200&h=630&q=80"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <NavBar />
      <div className="about-wrapper">
        <div className="about">
          <div className="video-container">
            <video autoPlay loop muted playsInline className="video-bg">
              <source src={abstractbackground} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
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

            {/* Add a button for playing an MP3 file */}
            {/* <div className="audio-container">
          <iframe
            width="110"
            height="186"
            src="https://www.myinstants.com/instant/south-park-they-took-our-job/embed/"
            title="South Park They Took Our Job Sound"
            style={{ border: "none", overflow: "hidden" }}
          />
        </div> */}
          </div>
        </div>
      </div>
      <Footer />
      <ScrollIndicator />
    </>
  );
};

export default About;
