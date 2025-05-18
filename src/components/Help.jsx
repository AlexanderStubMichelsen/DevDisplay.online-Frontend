import React from "react";
import { useState } from "react";
import "../css/Help.css";
import NavBar from "./NavBar";

function Help() {

  return (
    <>
      <NavBar />
      <div className="help">
        <div className="help-cantainer">
        <h1 className="help-title">Help</h1>
        <p className="help-text">
          This is a simple ideo and image search application that <br />
          allows you to search for images using the Unsplash API. <br />
          You can also save your favorite images and <br />
          view them later.
        </p>
        <h2 className="help-subtitle">How to use the app</h2>
        <ol className="help-list">
          <li>Search for images using the search bar.</li>
          <li>Click on an image to view it in full size.</li>
          <li>Click on the "Save" button to save an image.</li>
          <li>View your saved images in the "Saved Images" section.</li>
        </ol>
        </div>
      </div>
    </>
  );
}

export default Help;
