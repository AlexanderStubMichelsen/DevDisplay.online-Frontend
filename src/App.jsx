import React from "react"; // ✅ Required for testing
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/modules/NavBar.jsx";
import apiFacade from "./util/api/UserFacade.js"; // ✅ Import API facade
import PropTypes from "prop-types";
import Footer from "./components/modules/Footer.jsx"; // ✅ Import Footer
import ScrollIndicator from "./components/modules/ScrollIndicator.jsx"; // ✅ Import ScrollIndicator

const App = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
      {/* All content above the video */}
      <div className="site-wrapper">
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        <div className="app-container">
          <div className="page-content">
          

          </div>
        </div>

        <Footer className="footer" />
        <ScrollIndicator />
      </div>
    </>
  );
};

// ✅ Add PropTypes for props validation
App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default App;
