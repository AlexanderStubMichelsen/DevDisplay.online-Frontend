import { useState } from 'react';
import './App.css';
import facade from './util/apiFacade';
import { Link } from 'react-router-dom';

const App = ({ setIsLoggedIn }) => {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const isLoggedInStored = localStorage.getItem('isLoggedIn') === 'true';

  const performLogin = (evt) => {
    evt.preventDefault();
    facade.login(
      loginCredentials.username,
      loginCredentials.password,
      () => {
        setIsLoggedIn(true); // Set the application state to logged in
        localStorage.setItem('isLoggedIn', 'true'); // Store in localStorage
      }
    );
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set the application state to logged out
    localStorage.setItem('isLoggedIn', 'false'); // Update localStorage
  };

  return (
    <>
      <body>
        <div>
          <h1>Login</h1>

          <div>
            {isLoggedInStored ? (
              <div>
                <p>Du er logget ind, {facade.getUserName()}</p>
                <button onClick={handleLogout}>
                  Log out
                </button>
                <div>
                  <Link to="/images" >Images <br/></Link>
                  <Link to="/savedImg" >Saved Images</Link>
                </div>
              </div>
            ) : (

<form className='loginform' onChange={onChange}>
            <input placeholder="User Name" id="username" />
            <input placeholder="Password" id="password" />
            <button onClick={performLogin}>Login</button>
          </form>

            )}
          </div>
        </div>
      </body>
    </>
  );
};

export default App;
