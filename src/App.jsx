import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import retroBikeVideo from "./assets/retro-bike-ride.mp4";
import apiFacade from "./api/facade.js"; // ✅ Import API facade

const App = ({ isLoggedIn, setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState(apiFacade.getUser());

  const navigate = useNavigate();
  const location = useLocation();

  // State for modals
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loginDataForm, setLoginDataForm] = useState({ email: "", password: "" });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")) || false);
      setLoginData(apiFacade.getUser());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setIsLoggedIn]);

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

  // ✅ Handle Login Using apiFacade
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFacade.login(loginDataForm);
      setShowLogin(false);
      setIsLoggedIn(true);
      setLoginData({ email: loginDataForm.email });

      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("loginData", JSON.stringify({ email: loginDataForm.email }));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <>
      {/* ✅ Navbar */}
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginData={loginData} />

      {/* ✅ Video Background */}
      <div className="video-container">
        <video autoPlay loop muted playsInline className="video-bg">
          <source src={retroBikeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* ✅ Show Sign-Up / Login buttons only if NOT logged in */}
        {!isLoggedIn && (
          <div className="auth-buttons">
            <button onClick={() => setShowSignup(true)}>Sign Up</button>
            <button onClick={() => setShowLogin(true)}>Login</button>
          </div>
        )}

      </div>

      {/* ✅ Sign-Up Modal */}
      {showSignup && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSignup(false)}>
              &times;
            </span>
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

      {/* ✅ Login Modal */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowLogin(false)}>
              &times;
            </span>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" name="email" placeholder="Email" value={loginDataForm.email} onChange={(e) => setLoginDataForm({ ...loginDataForm, [e.target.name]: e.target.value })} required />
              <input type="password" name="password" placeholder="Password" value={loginDataForm.password} onChange={(e) => setLoginDataForm({ ...loginDataForm, [e.target.name]: e.target.value })} required />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
