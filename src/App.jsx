import React from 'react';
import './App.css'; // Import the stylesheet
import NavBar from './components/NavBar.jsx';
import retroBikeVideo from './assets/retro-bike-ride.mp4'; // ✅ Import the video

const App = () => {
  return (
    <>
      <NavBar />
      <div className="video-background">
        <video autoPlay loop muted playsInline className="video-bg">
          <source src={retroBikeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default App;
