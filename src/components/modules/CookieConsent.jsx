import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/modules/CookieConsent.css";

const CONSENT_STORAGE_KEY = "cookieConsent";

const CookieConsent = () => {
  const [choice, setChoice] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setChoice(localStorage.getItem(CONSENT_STORAGE_KEY));
  }, []);

  const saveChoice = (nextChoice) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice);
    setChoice(nextChoice);
  };

  if (choice) {
    return null;
  }

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label="Cookie notice">
      <div className="cookie-consent__content">
        <p className="cookie-consent__title">Cookies and local storage</p>
        <p className="cookie-consent__text">
          DevDisplay uses necessary browser storage for login, navigation, and guest saved images.
          The images feature can use a guest cookie so saved images stay tied to this browser.
        </p>

        {showDetails && (
          <div className="cookie-consent__details">
            <p>
              Necessary storage keeps the site working. Declining optional cookies will not block
              the site, but guest saved images may depend on the backend guest cookie.
            </p>
            <Link className="cookie-consent__link" to="/cookie-policy">
              Read the cookie policy
            </Link>
          </div>
        )}
      </div>

      <div className="cookie-consent__actions">
        <button type="button" className="cookie-consent__button" onClick={() => setShowDetails((prev) => !prev)}>
          {showDetails ? "Hide" : "Manage"}
        </button>
        <button type="button" className="cookie-consent__button" onClick={() => saveChoice("declined")}>
          Decline optional
        </button>
        <button type="button" className="cookie-consent__button cookie-consent__button--primary" onClick={() => saveChoice("accepted")}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
