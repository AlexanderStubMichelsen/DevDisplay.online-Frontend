import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../css/NavBar.css";
import apiFacade from "../api/facade.js"; // ✅ Import API facade
import Dropdown from "react-bootstrap/Dropdown";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginDataForm, setLoginDataForm] = useState({
    email: "",
    password: "",
  });

  // ✅ Function to check login status from sessionStorage
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

  // ✅ Load login state when component mounts & listen for updates
  useEffect(() => {
    checkLoginStatus(); // Check on mount

    // ✅ Listen for login/logout events
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

  // ✅ Handle Logout Using apiFacade
  const handleLogout = () => {
    apiFacade.logout();
    setIsLoggedIn(false);
    setUserEmail("");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loginData");
    window.dispatchEvent(new Event("storage")); // Notify other components
  };

  // ✅ Handle Login Using apiFacade
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFacade.login(loginDataForm);
      console.log("Response:", response);

      setShowLogin(false);
      setIsLoggedIn(true);
      setUserEmail(response.email);

      // Store login data and token in sessionStorage
      sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
      sessionStorage.setItem(
        "loginData",
        JSON.stringify({ email: response.email, name: response.name, token: response.token })
      );

      window.dispatchEvent(new Event("storage")); // Notify other components
    } catch (error) {
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        className="sticky-top-navbar"
      >
        <Navbar.Brand href="/">Maskinen</Navbar.Brand>
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
            <LinkContainer to="/youtube" onClick={() => setExpanded(false)}>
              <Nav.Link>Youtube</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/help" onClick={() => setExpanded(false)}>
              <Nav.Link>Help</Nav.Link>
            </LinkContainer>

            {/* ✅ Show "User Email Logout" if logged in */}
            {sessionStorage.getItem("isLoggedIn") && (
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

            {!sessionStorage.getItem("isLoggedIn") && (
              <Nav.Link onClick={() => setShowLogin(true)}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* ✅ Login Modal (Rendered Separately, NOT Inside <Nav.Link>) */}
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