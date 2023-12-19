import { useState } from 'react';
import './App.css';
import facade from './util/apiFacade';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { useEffect } from 'react';

const App = ({ setIsLoggedIn }) => {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [isLoggedInStored, setIsLoggedInStored] = useState(false); // State to track login status

  const performLogin = (evt) => {
    evt.preventDefault();
    facade.login(
      loginCredentials.username,
      loginCredentials.password,
      () => {
        setIsLoggedIn(true); // Set the application state to logged in
        setIsLoggedInStored(true); // Update isLoggedInStored to true after successful login
        localStorage.setItem('isLoggedIn', 'true'); // Store in localStorage
      }
    );
  };

  useEffect(() => {
    // Check login status on each render and update isLoggedInStored accordingly
    setIsLoggedInStored(localStorage.getItem('isLoggedIn') === 'true');
  }, [setIsLoggedInStored]);

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleLogout = (evt) => {
    evt.preventDefault();
    facade.logout((result) => {
      // Handle the result or any further actions after logout
      console.log('User logged out:', result);
  });
    setIsLoggedIn(false); // Set the application state to logged out
    setIsLoggedInStored(false); // Update isLoggedInStored to false on logout
    localStorage.setItem('isLoggedIn', 'false'); // Update localStorage
  };

  // Checking isLoggedInStored for conditional rendering
  return (
    <>
      <NavBar />
      <div className='login'>
        <div>
          {isLoggedInStored ? (
            // Logged-in view
            <div className='loginform'>
              <p>Du er logget ind, {facade.getUserName()}</p>
              <button onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            // Login form
            <form className='loginform' onChange={onChange}>
              <input placeholder="User Name" id="username" className='input' />
              <input placeholder="Password" id="password" className='input' />
              <button onClick={performLogin} className='btn'>Login</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
