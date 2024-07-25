import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/NavBar.css';
import facade from '../util/apiFacade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isLoggedIn = facade.getToken() !== null;
  const userRoles = facade.getUserRoles();

  const handleNavToggle = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    facade.logout(() => {
      window.location.reload(); // Refresh page after logout
    });
  };

  const handleLogoutConfirmation = () => {
    handleLogout();
    setShowLogoutModal(false); // Close the modal after logout
  };

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" className="sticky-top-navbar">
      <Navbar.Brand href="/">Mini Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleNavToggle}>
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end" in={expanded}>
          <Nav className="ml-auto">
            <LinkContainer to="/" onClick={() => setExpanded(false)}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login" onClick={() => setExpanded(false)}>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            {isLoggedIn && (
              <LinkContainer to="/images" onClick={() => setExpanded(false)}>
                <Nav.Link>Images</Nav.Link>
              </LinkContainer>
            )}
            {userRoles.includes('user') && (
              <LinkContainer to="/savedImg" onClick={() => setExpanded(false)}>
                <Nav.Link>Saved Images</Nav.Link>
              </LinkContainer>
            )}
            {!isLoggedIn && (
              <LinkContainer to="/signUp" onClick={() => setExpanded(false)}>
                <Nav.Link>Sign up</Nav.Link>
              </LinkContainer>
            )}
            {userRoles.includes('admin') && (
              <LinkContainer to="/admin/users" onClick={() => setExpanded(false)}>
                <Nav.Link>Admin Users</Nav.Link>
              </LinkContainer>
            )}
            {isLoggedIn && (
              <Nav.Link onClick={() => setShowLogoutModal(true)}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogoutConfirmation}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavBar;
