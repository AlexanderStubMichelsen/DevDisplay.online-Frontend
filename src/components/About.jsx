import React, { useRef } from "react";
import "../css/About.css"; // Optional: Add a CSS file for styling
import NavBar from "./NavBar"; // Import NavBar component
import animationVideo from "../assets/animation.mp4"; // Import the video file
import audioFile from "../assets/took-our-job-mp3cut.mp3"; // Import the MP3 file

const About = () => {
  const audioRef = useRef(null); // Create a ref for the audio element

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Play the audio
    }
  };

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
          <track
            src="../assets/captions.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </video>

        {/* Add a button for playing an MP3 file */}
        <div className="audio-container">
          <iframe width="110"
          height="200"
          src="https://www.myinstants.com/instant/south-park-they-took-our-job/embed/"
          frameborder="0"
          scrolling="no"
          title="South Park 'They Took Our Job' Sound Button">
          </iframe>
        </div>
      </div>
    </>
  );
};

export default About;
