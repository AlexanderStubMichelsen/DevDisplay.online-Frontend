import React, { useState, useEffect } from 'react';
import './App.css'; // Import the stylesheet
import facade from './util/apiFacade';
import NavBar from './components/NavBar.jsx';
import Images from './components/Images.jsx';
import logo from './assets/APIs.gif';

const App = () => {
  // const init = { username: '', password: '' };
  // const [loginCredentials, setLoginCredentials] = useState(init);
  // const [isLoggedInStored, setIsLoggedInStored] = useState(false);

  // useEffect(() => {
  //   // Check if the token is present in localStorage on component mount
  //   const token = facade.getToken();
  //   if (token) {
  //     setIsLoggedIn(true);
  //     setIsLoggedInStored(true);
  //   }
  // }, [setIsLoggedIn]);

  // const performLogin = async (evt) => {
  //   evt.preventDefault();
  //   try {
  //     await facade.login(loginCredentials.username, loginCredentials.password);
  //     setIsLoggedIn(true);
  //     setIsLoggedInStored(true);
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     // Handle login failure (e.g., show error message)
  //   }
  // };

  // const onChange = (evt) => {
  //   setLoginCredentials({
  //     ...loginCredentials,
  //     [evt.target.id]: evt.target.value,
  //   });
  // };

  // const handleLogout = (evt) => {
  //   evt.preventDefault();
  //   facade.logout(() => {
  //     setIsLoggedIn(false);
  //     setIsLoggedInStored(false);
  //   });
  // };

  return (
    <>
      <NavBar />
      <img src={logo} alt='logo' className='logo' />
      {/* <div className='login'>
        {isLoggedInStored ? (
          <div className='loginform'>
            <p>You are logged in as {facade.getUserName()}, with role {facade.getUserRoles()}</p>
            <button onClick={handleLogout} className='btn'>Log out</button>
          </div>
        ) : (
          <form className='loginform' onSubmit={performLogin}>
            <input 
              type="text"
              placeholder="Username"
              id="username"
              value={loginCredentials.username}
              onChange={onChange}
              className='input'
            />
            <input 
              type="password"
              placeholder="Password"
              id="password"
              value={loginCredentials.password}
              onChange={onChange}
              className='input2'
            />
            <button type="submit" className='btn'>Login</button>
          </form>
        )}
      </div> */}
    </>
  );
};

export default App;
