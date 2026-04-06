import React from "react";
import "./App.css";
import NavBar from "./components/modules/NavBar.jsx";
import Footer from "./components/modules/Footer.jsx";
import ScrollIndicator from "./components/modules/ScrollIndicator.jsx";
import BackgroundLoop from "./components/modules/BackgroundLoop.jsx";
import flowersLoop from "./assets/flowersloop.mp4";

const App = () => {
  return (
    <>
      <div className="site-wrapper">
        <NavBar />
        <div className="app-container">
          <BackgroundLoop
            src={flowersLoop}
            className="video-bg"
            showOverlay
            overlayOpacity={0.3}
            zIndex={0}
          />
          <div className="page-content" />
        </div>
        <Footer className="footer" />
        <ScrollIndicator />
      </div>
    </>
  );
};

export default App;
