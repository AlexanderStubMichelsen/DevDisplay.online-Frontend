import React, { useState, useEffect } from 'react';
import './App.css'; // Import the stylesheet
import NavBar from './components/NavBar.jsx';
import retroBikeVideo from './assets/retro-bike-ride.mp4';

const App = () => {
  // ✅ Check localStorage for stored login data
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );
  const [loginData, setLoginData] = useState(
    JSON.parse(localStorage.getItem('loginData')) || { email: '' }
  );

  // State for modals
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // State for form inputs
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [loginDataForm, setLoginDataForm] = useState({ email: '', password: '' });

  // ✅ Load login state from `localStorage` when the app starts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loginData'));
    if (storedUser && storedUser.email) {
      setIsLoggedIn(true);
      setLoginData(storedUser);
    }
  }, []);

  // Handle input changes
  const handleSignupChange = (e) => setSignupData({ ...signupData, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLoginDataForm({ ...loginDataForm, [e.target.name]: e.target.value });

  // Handle sign-up submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5019/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Sign-Up Success:', data);
        setShowSignup(false);
      })
      .catch(error => console.error('Sign-Up Error:', error));
  };

  // Handle login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5019/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginDataForm),
    })
      .then(response => {
        if (!response.ok) throw new Error('Invalid email or password');
        return response.json();
      })
      .then(data => {
        console.log('Login Success:', data);
        setShowLogin(false);
        setIsLoggedIn(true);
        setLoginData({ email: loginDataForm.email });

        // ✅ Store login state in `localStorage`
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('loginData', JSON.stringify({ email: loginDataForm.email }));
      })
      .catch(error => {
        console.error('Login Error:', error);
        alert('Login failed. Please check your email and password.');
      });
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '' });

    // ✅ Remove login state from `localStorage`
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginData');
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginData={loginData} />

      {/* Video Background */}
      <div className="video-container">
        <video autoPlay loop muted playsInline className="video-bg">
          <source src={retroBikeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Show buttons only if NOT logged in */}
        {!isLoggedIn && (
          <div className="auth-buttons">
            <button onClick={() => setShowSignup(true)}>Sign Up</button>
            <button onClick={() => setShowLogin(true)}>Login</button>
          </div>
        )}

        {/* Sign-Up Modal */}
        {showSignup && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowSignup(false)}>&times;</span>
              <h2>Sign Up</h2>
              <form onSubmit={handleSignupSubmit}>
                <input type="text" name="name" placeholder="Name" value={signupData.name} onChange={handleSignupChange} required />
                <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} required />
                <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} required />
                <button type="submit">Sign Up</button>
              </form>
            </div>
          </div>
        )}

        {/* Login Modal */}
        {showLogin && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowLogin(false)}>&times;</span>
              <h2>Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <input type="email" name="email" placeholder="Email" value={loginDataForm.email} onChange={handleLoginChange} required />
                <input type="password" name="password" placeholder="Password" value={loginDataForm.password} onChange={handleLoginChange} required />
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
