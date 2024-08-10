import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import facade from '../util/apiFacade';
import NavBar from '../components/NavBar.jsx';
import '../css/Login.css'; // Ensure correct path

const Login = ({ setIsLoggedIn, setUserRoles }) => {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Access justLoggedOut state from location
  const justLoggedOut = location.state?.justLoggedOut || false;

  const performLogin = async (evt) => {
    evt.preventDefault();
    try {
      await facade.login(loginCredentials.username, loginCredentials.password);
      setIsLoggedIn(true);
      const roles = facade.getUserRoles();
      setUserRoles(roles); // Update roles in the parent component
      setErrorMessage('');
      navigate('/', { state: { justLoggedIn: true } }); // Redirect to home with justLoggedIn state
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your username and password.');
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <>
      <NavBar />
      <div className='login'>
        {justLoggedOut && <p className='success'>You have successfully logged out.</p>}
        <form className='loginform' onSubmit={performLogin}>
          <h2>Login</h2>
          {errorMessage && <p className='error'>{errorMessage}</p>}
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
        <p className='link'>Don't have an account? <a href="/signup">Sign up here</a></p>
      </div>
    </>
  );
};

export default Login;
