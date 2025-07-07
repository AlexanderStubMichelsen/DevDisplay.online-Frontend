import React from "react";
import "../../css/About.css"; // Optional: Add a CSS file for styling
import NavBar from "../NavBar"; // Import NavBar component
import animationVideo from "../../assets/animation.mp4"; // Import the video file
import Footer from "../Footer";
import abstractbackground from "../../assets/0_Abstract_Background_3840x2160.mp4"; // Import the video file

const About = () => {
  return (
    <>
      <NavBar />
      <div className="about-wrapper">
        <div className="about">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="video-bg"
            onLoadStart={() => console.log("Video loading started")}
            onCanPlay={() => console.log("Video can play")}
            onError={(e) => console.log("Video error:", e)}
          >
            <source src={abstractbackground} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
    </>
  );
};

export default About;
