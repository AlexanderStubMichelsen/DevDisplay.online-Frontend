import React, { useState, useEffect } from 'react';
import './App.css'; // Import the stylesheet
import NavBar from './components/NavBar.jsx';
import img from './assets/photo-1555530001-acee1750bdcc.jpg'

const App = () => {

  return (
    <>
    <NavBar />
    {/* make the image clickable and redirect to Unsplash*/}

<a href="https://unsplash.com" rel="noreferrer">
    <img src={img} alt="img" className='front-page-img' />
</a>
    </>
  )};

export default App;
