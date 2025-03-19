import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/NavBar.css';

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // ✅ Logout function: Clears localStorage & updates state
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUserEmail('');
    window.dispatchEvent(new Event('storage')); // ✅ Notify other components about logout
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

            {/* ✅ Show "User Email Logout" only if logged in */}
            {isLoggedIn && (
              <Nav.Link onClick={handleLogout}>
                {userEmail || 'User'} Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
