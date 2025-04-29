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
        >
          <source src={animationVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Add a button for playing an MP3 file */}
        <div className="audio-container">
          <iframe width="110"
          height="200"
          src="https://www.myinstants.com/instant/south-park-they-took-our-job/embed/"
          title="South Park 'They Took Our Job' Sound Button">
          </iframe>
        </div>
      </div>
    </>
  );
};

export default About;
