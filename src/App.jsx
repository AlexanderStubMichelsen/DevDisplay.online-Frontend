import React, { useState, useEffect } from 'react';
import './App.css'; // Import the stylesheet
import NavBar from './components/NavBar.jsx';
import img from './assets/photo-1555530001-acee1750bdcc.jpg';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const justLoggedIn = location.state?.justLoggedIn || false;

  return (
    <>
      <NavBar />
      {justLoggedIn && <p className='success'>You have successfully logged in.</p>}
        <img src={img} alt="img" className='front-page-img' />
    </>
  );
};

export default App;
