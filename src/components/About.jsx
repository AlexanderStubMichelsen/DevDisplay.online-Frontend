import React from "react";
import "../css/About.css"; // Optional: Add a CSS file for styling
import NavBar from "./NavBar"; // Import NavBar component
import animationVideo from "../assets/animation.mp4"; // Import the video file

const About = () => {
  return (
    <>
    <NavBar />
    <div className="about">
      <video
        controls
        className="background-video"
        style={{
          width: "640px", // Medium width
          height: "360px", // Medium height
          borderRadius: "10px", // Optional: Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional: Add a shadow
        }}
      >
          <source src={animationVideo} type="video/mp4" />
          Your browser does not support the video tag.
      </video>
    </div>
    </>
  );
};

export default About;