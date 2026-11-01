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
  const [showSignup, setShowSignup] = useState(false); // Added missing state
  const [loginDataForm, setLoginDataForm] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({ // Added missing state
    name: "",
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
      if (e.key === "Escape") {
        closeLoginModal();
        setShowSignup(false);
      }
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
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUserEmail("");
    window.dispatchEvent(new Event("storage"));
    window.location.reload();
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
      window.location.reload();
    } catch (error) {
      alert("Login failed. Please check your email and password.");
    }
  };

  const closeLoginModal = () => {
    setShowLogin(false);
    setLoginDataForm({ email: "", password: "" });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign up the user
      const response = await apiFacade.signUp(signupData);

      console.log("Response:", response);

      setShowSignup(false);
      setIsLoggedIn(true);

      // Store login data including ID
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem(
        "loginData",
        JSON.stringify({
          id: response.userDto.id,
          email: response.userDto.email,
          name: response.userDto.name,
          token: response.token,
        })
      );

      // Clear signup form
      setSignupData({ name: "", email: "", password: "" });
      setUserEmail(response.userDto.email);
      window.dispatchEvent(new Event("storage"));
      window.location.reload();
    } catch (error) {
      // Check if the error is a 409 Conflict (email already taken)
      if (error.status === 409) {
        alert("The email is already taken. Please use a different email.");
      } else if (error.status === 500) {
        alert(`Server error during sign-up: ${error.message}`);
      } else {
        alert(error.message || "Sign-Up Failed. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        className="sticky-top-navbar"
        expanded={expanded}
      >
        <Navbar.Brand href="/">MachineMal</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleNavToggle}
        >
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="ml-auto">
            <LinkContainer to="/" onClick={() => setExpanded(false)}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/images" onClick={() => setExpanded(false)}>
              <Nav.Link>Images</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/saved" onClick={() => setExpanded(false)}>
              <Nav.Link>Saved</Nav.Link>
            </LinkContainer>

            {/* <LinkContainer to="/youtube" onClick={() => setExpanded(false)}>
              <Nav.Link>Youtube</Nav.Link> 
            </LinkContainer> */}
            <LinkContainer to="/about" onClick={() => setExpanded(false)}>
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact" onClick={() => setExpanded(false)}>
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/help" onClick={() => setExpanded(false)}>
              <Nav.Link>Help</Nav.Link>
            </LinkContainer>

            {/* Authentication Section */}
            {!isLoggedIn && (
              <Nav.Link onClick={() => setShowSignup(true)}>
                Sign Up
              </Nav.Link>
            )}

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

      {/* Login Modal */}
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
                autoComplete="email"
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
                autoComplete="current-password"
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

      {/* Sign-Up Modal */}
      {showSignup && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowSignup(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setShowSignup(false);
              }}
              tabIndex="0"
            >
              &times;
            </span>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                maxLength={100}
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                maxLength={100}
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password (at least 8 characters)"
                autoComplete="new-password"
                minLength={8}
                maxLength={72}
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
