import React, { useState, useEffect } from 'react';
import '../css/Login.css'; // Import the stylesheet
import facade from '../util/apiFacade';
import NavBar from '../components/NavBar.jsx';

const Login = ({ setIsLoggedIn }) => {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [isLoggedInStored, setIsLoggedInStored] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  useEffect(() => {
    // Check if the token is present in localStorage on component mount
    const token = facade.getToken();
    if (token) {
      setIsLoggedIn(true);
      setIsLoggedInStored(true);
    }
  }, [setIsLoggedIn]);

  const performLogin = async (evt) => {
    evt.preventDefault();
    try {
      await facade.login(loginCredentials.username, loginCredentials.password);
      setIsLoggedIn(true);
      setIsLoggedInStored(true);
      setErrorMessage(''); // Clear any previous error messages on successful login
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your username and password.'); // Set error message
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleLogout = (evt) => {
    evt.preventDefault();
    facade.logout(() => {
      setIsLoggedIn(false);
      setIsLoggedInStored(false);
    });
  };

  return (
    <>
      <NavBar />
      <div className='login'>
        {isLoggedInStored ? (
          <div className='loginform'>
            <p className='welcome'>Hi {facade.getUserRoles()} {facade.getUserName()}!</p>
            <button onClick={handleLogout} className='btn'>Log out</button>
          </div>
        ) : (
          <>
            <form className='loginform' onSubmit={performLogin}>
              <h2>Login</h2>
              {errorMessage && <p className='error'>{errorMessage}</p>} {/* Display error message */}
              <label htmlFor="username">Username:</label>
              <input 
                type="text"
                id="username"
                value={loginCredentials.username}
                onChange={onChange}
                className='input'
              />
              <label htmlFor="password">Password:</label>
              <input 
                type="password"
                id="password"
                value={loginCredentials.password}
                onChange={onChange}
                className='input2'
              />
              <button type="submit" className='btn'>Login</button>
            </form>
            <p className='signup-link'>Don't have an account? <a href="/signup">Sign up here</a></p>
          </>
        )}
      </div>
    </>
  );
};

export default Login;