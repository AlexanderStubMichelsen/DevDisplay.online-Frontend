import React from "react";
import "../../css/Help.css";
import NavBar from "../NavBar";
import Footer from "../Footer";

function Help() {
  return (
    <>
      <NavBar />
      <div className="help-wrapper">
      <div className="help">
        <div className="text-container">
          <h1 className="help-title">Help</h1>
          <p className="help-text">
            This is a simple video and image search application that <br />
            allows you to search for images using the Unsplash API. <br />
            You can also save your favorite images and <br />
            view them later.
          </p>
          <h2 className="help-subtitle">How to use the app</h2>
          <ol className="help-list">
            <li>Search for images using the search bar.</li>
            <li>Click on an image to view it in full size.</li>
            <li>Log in and click on the &quot;Save&quot; button to save an image.</li>
            <li>View your saved images in the &quot;Saved Images&quot; section.</li>
          </ol>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Help;
