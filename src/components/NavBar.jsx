import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import facade from '../util/apiFacade';
import '../css/NavBar.css';

function NavBar() {
  const isLoggedIn = facade.getToken() !== null;
  const userRoles = facade.getUserRoles();

  return (
    <div className="container">
      <Nav fill variant="tabs" defaultActiveKey="/home" className="sticky-top-navbar">
        <Nav.Item>
          <LinkContainer to="/">
            <Nav.Link><p>Home</p></Nav.Link>
          </LinkContainer>
        </Nav.Item>
        {isLoggedIn && (
        <Nav.Item>
          <LinkContainer to="/images">
            <Nav.Link><p>Images</p></Nav.Link>
          </LinkContainer>
        </Nav.Item>
        )}
        {userRoles.includes('user') && (
          <Nav.Item>
            <LinkContainer to="/savedImg">
              <Nav.Link><p>Saved Images</p></Nav.Link>
            </LinkContainer>
          </Nav.Item>
        )}
        {!isLoggedIn && (
          <Nav.Item>
            <LinkContainer to="/signUp">
              <Nav.Link><p>Sign up</p></Nav.Link>
            </LinkContainer>
          </Nav.Item>
        )}
        {userRoles.includes('admin') && (
          <Nav.Item>
            <LinkContainer to="/admin">
              <Nav.Link><p>Admin</p></Nav.Link>
            </LinkContainer>
          </Nav.Item>
        )}
        {isLoggedIn && (
          <Nav.Item>
            <Nav.Link onClick={() => facade.logout(() => window.location.reload())}><p>Logout</p></Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
}

export default NavBar;
