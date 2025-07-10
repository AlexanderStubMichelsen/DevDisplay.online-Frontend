import React from "react"; // ✅ Required for testing
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/modules/NavBar.jsx";
import abstractbackground from "./assets/0_Abstract_Background_3840x2160.mp4";
import apiFacade from "./util/api/UserFacade.js"; // ✅ Import API facade
import PropTypes from "prop-types";
import Footer from "./components/modules/Footer.jsx"; // ✅ Import Footer
import WeatherWidget from "./components/modules/WeatherWidget.jsx"; // ✅ Add this at the top
import ScrollIndicator from "./components/modules/ScrollIndicator.jsx"; // ✅ Import ScrollIndicator

const App = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // Modal state
  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ Route protection
  useEffect(() => {
    const protectedRoutes = ["/images", "/youtube", "/help", "/saved"];
    if (!isLoggedIn && protectedRoutes.includes(location.pathname)) {
      navigate("/");
    }
  }, [isLoggedIn, navigate, location]);

  // ✅ Handle Sign-Up
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign up the user
      await apiFacade.signUp(signupData);

      // Log in the user right after sign-up
      const response = await apiFacade.login({
        email: signupData.email,
        password: signupData.password,
      });

      console.log("Response:", response);

      setShowSignup(false);
      setIsLoggedIn(true);

      // ✅ Store login data including ID
      sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
      sessionStorage.setItem(
        "loginData",
        JSON.stringify({
          id: response.userDto.id,
          email: response.userDto.email,
          name: response.userDto.name,
          token: response.token,
        })
      );

      window.dispatchEvent(new Event("storage")); // Notify other components
    } catch (error) {
      // Check if the error is a 409 Conflict (email already taken)
      if (error.response?.status === 409) {
        alert("The email is already taken. Please use a different email.");
      } else {
        alert("Sign-Up Failed. Please try again.");
      }
    }

  };

  return (
    <>
      {/* ✅ Navbar */}
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="app-container">
        {" "}
        {/* ⬅️ This was missing */}
        <div className="page-content">
          {" "}
          {/* Add this wrapper */}
          {/* ✅ Video Background */}
          <div className="video-container">
            <video autoPlay loop muted playsInline className="video-bg">
              <source src={abstractbackground} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <WeatherWidget apiKey={apiKey} />
            {/* ✅ Show Sign-Up Button if Not Logged In */}
            {!sessionStorage.getItem("isLoggedIn") && (
              <div className="auth-buttons">
                <button type="button" onClick={() => setShowSignup(true)}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
        {/* ✅ Sign-Up Modal */}
        {showSignup && (
          <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-content">
              <span
                type="button"
                className="close"
                onClick={() => setShowSignup(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setShowSignup(false);
                }}
                tabIndex="0"
              >
                &times;
              </span>
              <h2>Sign Up</h2>
              <form onSubmit={handleSignupSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email(Does not have to be valid)"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
                <button type="submit">Sign Up</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ScrollIndicator />
      <Footer className="footer" /> {/* <-- Add Footer here */}
    </>
  );
};

// ✅ Add PropTypes for props validation
App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default App;
