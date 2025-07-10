import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import "../../css/modules/NavBar.css";
import apiFacade from "../../util/api/UserFacade.js";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginDataForm, setLoginDataForm] = useState({
    email: "",
    password: "",
  });

  const checkLoginStatus = () => {
    const storedUser = JSON.parse(sessionStorage.getItem("loginData"));
    if (storedUser?.email && storedUser?.token) {
      setIsLoggedIn(true);
      setUserEmail(storedUser.email);
    } else {
      setIsLoggedIn(false);
      setUserEmail("");
    }
  };

  useEffect(() => {
    checkLoginStatus();

    const handleStorageChange = () => checkLoginStatus();
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLoginModal();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNavToggle = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    apiFacade.logout();
    sessionStorage.removeItem("loginData");
    setIsLoggedIn(false);
    setUserEmail("");
    window.dispatchEvent(new Event("storage"));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFacade.login(loginDataForm);

      sessionStorage.setItem(
        "loginData",
        JSON.stringify({
          id: response.userDto.id,
          email: response.userDto.email,
          name: response.userDto.name,
          token: response.token,
        })
      );

      setIsLoggedIn(true);
      sessionStorage.setItem("isLoggedIn", "true");
      setUserEmail(response.userDto.email);
      closeLoginModal();
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      alert("Login failed. Please check your email and password.");
    }
  };

  const closeLoginModal = () => {
    setShowLogin(false);
    setLoginDataForm({ email: "", password: "" });
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        className="sticky-top-navbar"
      >
        <Navbar.Brand href="/">DevDisplay</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleNavToggle}
        >
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
          in={expanded}
        >
          <Nav className="ml-auto">
            <Nav.Link
              href="https://skraafoto.devdisplay.online"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setExpanded(false)}
            >
              Skraafoto
            </Nav.Link>
            <LinkContainer to="/" onClick={() => setExpanded(false)}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/board" onClick={() => setExpanded(false)}>
              <Nav.Link>Board</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/images" onClick={() => setExpanded(false)}>
              <Nav.Link>Images</Nav.Link>
            </LinkContainer>
            {isLoggedIn && (
              <LinkContainer to="/saved" onClick={() => setExpanded(false)}>
                <Nav.Link>Saved</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/youtube" onClick={() => setExpanded(false)}>
              <Nav.Link>Youtube</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/trends" onClick={() => setExpanded(false)}>
              <Nav.Link>Trends</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about" onClick={() => setExpanded(false)}>
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/help" onClick={() => setExpanded(false)}>
              <Nav.Link>Help</Nav.Link>
            </LinkContainer>

            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {userEmail}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <LinkContainer
                    to="/userpage"
                    onClick={() => setExpanded(false)}
                  >
                    <Dropdown.Item>User Page</Dropdown.Item>
                  </LinkContainer>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link onClick={() => setShowLogin(true)}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {showLogin && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <span className="close" onClick={closeLoginModal}>
              &times;
            </span>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginDataForm.email}
                onChange={(e) =>
                  setLoginDataForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginDataForm.password}
                onChange={(e) =>
                  setLoginDataForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
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
