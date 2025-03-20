import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/NavBar.css';
import apiFacade from '../api/facade.js'; // ✅ Import API facade

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginDataForm, setLoginDataForm] = useState({ email: "", password: "" });

  // ✅ Function to check login status from localStorage
  const checkLoginStatus = () => {
    const storedUser = JSON.parse(localStorage.getItem('loginData'));
    if (storedUser && storedUser.email) {
      setIsLoggedIn(true);
      setUserEmail(storedUser.email);
    } else {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  };

  // ✅ Load login state when component mounts & listen for updates
  useEffect(() => {
    checkLoginStatus(); // Check on mount

    // ✅ Listen for login/logout events
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleNavToggle = () => {
    setExpanded(!expanded);
  };

  // ✅ Handle Logout Using apiFacade
  const handleLogout = () => {
    apiFacade.logout();
    setIsLoggedIn(false);
    setUserEmail("");
  };

  // ✅ Handle Login Using apiFacade
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFacade.login(loginDataForm);
      setShowLogin(false);
      setIsLoggedIn(true);
      setUserEmail(loginDataForm.email);

      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("loginData", JSON.stringify({ email: loginDataForm.email }));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" className="sticky-top-navbar">
        <Navbar.Brand href="/">Maskinen</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleNavToggle}>
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end" in={expanded}>
          <Nav className="ml-auto">
            <LinkContainer to="/" onClick={() => setExpanded(false)}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/images" onClick={() => setExpanded(false)}>
              <Nav.Link>Images</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/youtube" onClick={() => setExpanded(false)}>
              <Nav.Link>Youtube</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/help" onClick={() => setExpanded(false)}>
              <Nav.Link>Help</Nav.Link>
            </LinkContainer>

            {/* ✅ Show "Login" button only if user is NOT logged in */}
            {!isLoggedIn && (
              <Nav.Link onClick={() => setShowLogin(true)}>
                Login
              </Nav.Link>
            )}

            {/* ✅ Show "User Email Logout" if logged in */}
            {isLoggedIn && (
              <Nav.Link onClick={handleLogout}>
                {userEmail || 'User'} Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* ✅ Login Modal (Rendered Separately, NOT Inside <Nav.Link>) */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowLogin(false)}>
              &times;
            </span>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={loginDataForm.email} 
                onChange={(e) => setLoginDataForm({ ...loginDataForm, [e.target.name]: e.target.value })} 
                required 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={loginDataForm.password} 
                onChange={(e) => setLoginDataForm({ ...loginDataForm, [e.target.name]: e.target.value })} 
                required 
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
