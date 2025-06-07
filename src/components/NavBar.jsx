import React from "react"; // ✅ required for tests
import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../css/NavBar.css";
import apiFacade from "../util/api/UserFacade.js";
import Dropdown from "react-bootstrap/Dropdown";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // ✅ Show email instead of name
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginDataForm, setLoginDataForm] = useState({
    email: "",
    password: "",
  });

  // ✅ Check sessionStorage on mount
  const checkLoginStatus = () => {
    const storedUser = JSON.parse(sessionStorage.getItem("loginData"));
    if (storedUser?.email) {
      setIsLoggedIn(true);
      setUserEmail(storedUser.email);
    } else {
      setIsLoggedIn(false);
      setUserEmail("");
    }
  };

  // ✅ Listen for login/logout across tabs
  useEffect(() => {
    checkLoginStatus();

    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleNavToggle = () => {
    setExpanded(!expanded);
  };

  // ✅ Logout
  const handleLogout = () => {
    apiFacade.logout();
    setIsLoggedIn(false);
    setUserEmail("");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loginData");
    window.dispatchEvent(new Event("storage"));
  };

  // ✅ Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFacade.login(loginDataForm);

      setShowLogin(false);
      setIsLoggedIn(true);
      setUserEmail(response.userDto.email);

      sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
      sessionStorage.setItem(
        "loginData",
        JSON.stringify({
          id: response.userDto.id,
          email: response.userDto.email,
          name: response.userDto.name,
          token: response.token,
        })
      );

      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        className="sticky-top-navbar"
      >
        <Navbar.Brand href="/"> DevDisplay
        </Navbar.Brand>
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
            <LinkContainer to="/" onClick={() => setExpanded(false)}>
              <Nav.Link>Home</Nav.Link>
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
            <LinkContainer
              to="/trends"
              onClick={() => setExpanded(false)}
            >
              
              <Nav.Link>Trends</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about" onClick={() => setExpanded(false)}>
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/help" onClick={() => setExpanded(false)}>
              <Nav.Link>Help</Nav.Link>
            </LinkContainer>

            {/* ✅ Show dropdown if logged in */}
            {isLoggedIn && (
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {userEmail || "User"}
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
            )}

            {/* ✅ Show login if not logged in */}
            {!isLoggedIn && (
              <Nav.Link onClick={() => setShowLogin(true)}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* ✅ Login Modal */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowLogin(false)}
              onKeyUp={(e) => {
                if (e.key === "Enter") setShowLogin(false);
              }}
            >
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
                  setLoginDataForm({
                    ...loginDataForm,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginDataForm.password}
                onChange={(e) =>
                  setLoginDataForm({
                    ...loginDataForm,
                    [e.target.name]: e.target.value,
                  })
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
