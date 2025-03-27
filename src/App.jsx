import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import retroBikeVideo from "./assets/retro-bike-ride.mp4";
import apiFacade from "./api/facade.js"; // ✅ Import API facade

const App = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for modals
  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const protectedRoutes = ["/images", "/youtube", "/help"];
    if (!isLoggedIn && protectedRoutes.includes(location.pathname)) {
      navigate("/");
    }
  }, [isLoggedIn, navigate, location]);

  // ✅ Handle Sign-Up Using apiFacade
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFacade.signUp(signupData);
      setShowSignup(false);
    } catch (error) {
      alert("Sign-Up Failed");
    }
  };

  return (
    <>
      {/* ✅ Navbar */}
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* ✅ Video Background */}
      <div className="video-container">
        <video autoPlay loop muted playsInline className="video-bg">
          <source src={retroBikeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* ✅ Show Sign-Up / button only if NOT logged in */}
        {!sessionStorage.getItem("isLoggedIn") && (
          <div className="auth-buttons">
            <button type="button" onClick={() => setShowSignup(true)}>Sign Up</button>
          </div>
        )}
      </div>

      {/* ✅ Sign-Up Modal */}
      {showSignup && (
        <div className="modal">
          <div className="modal-content">
            <button type="button" className="close" onClick={() => setShowSignup(false)} onKeyDown={(e) => { if (e.key === 'Enter') setShowSignup(false); }} tabIndex="0">
              &times;
            </button>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input type="text" name="name" placeholder="Name" value={signupData.name} onChange={(e) => setSignupData({ ...signupData, [e.target.name]: e.target.value })} required />
              <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, [e.target.name]: e.target.value })} required />
              <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, [e.target.name]: e.target.value })} required />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
