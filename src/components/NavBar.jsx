import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import facade from '../util/apiFacade';
import '../css/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const isLoggedIn = facade.getToken() !== null;
  const userRoles = facade.getUserRoles();

  const handleNavToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="sticky-top-navbar">
      <Navbar.Brand href="/">Mini Project</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleNavToggle}>
        <FontAwesomeIcon icon={faBars} />
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end" in={expanded}>
        <Nav>
          <LinkContainer to="/">
            <Nav.Link onClick={() => setExpanded(false)}>Home</Nav.Link>
          </LinkContainer>
          {isLoggedIn && (
            <LinkContainer to="/images">
              <Nav.Link onClick={() => setExpanded(false)}>Images</Nav.Link>
            </LinkContainer>
          )}
          {userRoles.includes('user') && (
            <LinkContainer to="/savedImg">
              <Nav.Link onClick={() => setExpanded(false)}>Saved Images</Nav.Link>
            </LinkContainer>
          )}
          {!isLoggedIn && (
            <LinkContainer to="/signUp">
              <Nav.Link onClick={() => setExpanded(false)}>Sign up</Nav.Link>
            </LinkContainer>
          )}
          {userRoles.includes('admin') && (
            <LinkContainer to="/admin/pictures">
              <Nav.Link onClick={() => setExpanded(false)}>Admin Pictures</Nav.Link>
            </LinkContainer>
          )}
            {userRoles.includes('admin') && (
              <LinkContainer to="/admin/users">
                <Nav.Link onClick={() => setExpanded(false)}>Admin Users</Nav.Link>
              </LinkContainer>
          )}
          {isLoggedIn && (
            <Nav.Link onClick={() => { facade.logout(() => window.location.reload()); setExpanded(false); }}>Logout</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
