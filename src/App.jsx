import { useState, useEffect } from 'react';
import './App.css';
import facade from './util/apiFacade';
import NavBar from './components/NavBar.jsx';

const App = ({ setIsLoggedIn }) => {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [isLoggedInStored, setIsLoggedInStored] = useState(false);

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
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., show error message)
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
        <div>
          {isLoggedInStored ? (
            <div className='loginform'>
              <p>Du er logget ind, {facade.getUserName()}, med rollen {facade.getUserRoles()}</p>
              <button onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            <form className='loginform' onSubmit={performLogin}>
              <input 
                placeholder="User Name" 
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
        </div>
      </div>
    </>
  );
};

export default App;
