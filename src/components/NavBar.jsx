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

  const handleNavToggle = () => {
    setExpanded(!expanded);
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
