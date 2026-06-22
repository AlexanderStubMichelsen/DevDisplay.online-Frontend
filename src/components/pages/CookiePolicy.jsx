import React from "react";
import { Helmet } from "react-helmet-async";
import NavBar from "../modules/NavBar.jsx";
import Footer from "../modules/Footer.jsx";
import ScrollIndicator from "../modules/ScrollIndicator.jsx";
import "../../css/pages/CookiePolicy.css";

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | DevDisplay</title>
        <meta
          name="description"
          content="Cookie and browser storage policy for DevDisplay."
        />
      </Helmet>

      <NavBar />
      <div className="cookie-policy-wrapper">
        <main className="cookie-policy">
          <section className="cookie-policy__panel">
            <h1>Cookie Policy</h1>
            <p className="cookie-policy__intro">
              This page explains how DevDisplay uses cookies and browser storage to keep the site working.
            </p>

            <h2>Necessary Storage</h2>
            <p>
              DevDisplay uses necessary browser storage for login state, navigation state, and saved-image features.
              These items support core site behavior and are not used for advertising.
            </p>

            <h2>Guest Saved Images</h2>
            <p>
              If you save images without logging in, the backend may set a guest cookie named
              <span className="cookie-policy__code"> guest_user_token </span>
              so this browser can return to the same guest saved-image collection.
            </p>

            <h2>Session Storage</h2>
            <p>
              When you log in, DevDisplay stores login information in session storage so authenticated requests can
              include your access token. The navigation also stores a small visual position value for the active link.
            </p>

            <h2>Your Choice</h2>
            <p>
              The cookie notice stores your banner choice in local storage. You can reset it by clearing browser data
              for this site. Declining optional cookies does not block the site, but guest saved-image behavior depends
              on the necessary guest cookie.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about this policy, contact
              <a href="mailto:AlexanderStubMichelsen@gmail.com"> AlexanderStubMichelsen@gmail.com</a>.
            </p>
          </section>
        </main>
        <Footer />
      </div>
      <ScrollIndicator />
    </>
  );
};

export default CookiePolicy;
