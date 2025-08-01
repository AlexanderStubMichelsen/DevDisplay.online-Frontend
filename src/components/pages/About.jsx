import React from "react";
import "../../css/pages/About.css"; // Optional: Add a CSS file for styling
import NavBar from "../modules/NavBar"; // Import NavBar component
import animationVideo from "../../assets/animation.mp4"; // Import the video file
import Footer from "../modules/Footer";
import abstractbackground from "../../assets/153813-806526698_small.mp4"; // Import the video file
import ScrollIndicator from "../modules/ScrollIndicator"; // Import ScrollIndicator component

const About = () => {
  return (
    <>
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
