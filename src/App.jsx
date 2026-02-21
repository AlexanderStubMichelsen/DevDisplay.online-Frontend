import React from "react";
import "./App.css";
import NavBar from "./components/modules/NavBar.jsx";
import Footer from "./components/modules/Footer.jsx";
import ScrollIndicator from "./components/modules/ScrollIndicator.jsx";

const App = () => {
  return (
    <>
      <div className="site-wrapper">
        <NavBar />
        <div className="app-container">
          <div className="page-content" />
        </div>
        <Footer className="footer" />
        <ScrollIndicator />
      </div>
    </>
  );
};

export default App;
