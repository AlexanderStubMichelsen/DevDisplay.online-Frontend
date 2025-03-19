import React, { useState } from 'react';
import './App.css'; // Import the stylesheet
import NavBar from './components/NavBar.jsx';
import retroBikeVideo from './assets/retro-bike-ride.mp4'; // ✅ Import the video

const App = () => {
  // State to track sign-up form inputs
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // State to track login form inputs
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Handle input changes for sign-up
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // Handle input changes for login
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle sign-up form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:5019/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password // ✅ Send password as plain text
      })
    })
      .then(response => response.json())
      .then(data => console.log('Sign-Up Success:', data))
      .catch(error => {
        console.error('Sign-Up Error:', error);
      });
  };

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);

    fetch('http://localhost:5019/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invalid email or password');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Login Success:', data);
        alert('Login successful!');
      })
      .catch((error) => {
        console.error('Login Error:', error);
        alert('Login failed. Please check your email and password.');
      });
  };

  return (
    <>
      <NavBar />

      {/* Sign-Up Form */}
      <div className="signup-form">
        <h1>Sign Up</h1>
        <form className="form" onSubmit={handleSignupSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={signupData.name}
            onChange={handleSignupChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleSignupChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignupChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Login Form */}
      <div className="login-form">
        <h1>Login</h1>
        <form className="form" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Background Video (Optional) */}
      {/* Uncomment if needed */}
      {/* <div className="video-background">
        <video autoPlay loop muted playsInline className="video-bg">
          <source src={retroBikeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
    </>
  );
};

export default App;
