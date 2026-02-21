import React, { useState, useEffect, useRef, useCallback } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "../../css/modules/NavBar.css";
import apiFacade from "../../util/api/UserFacade.js";

function NavBar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false); // Added missing state
  const [stickX, setStickX] = useState(0);
  const [stickVisible, setStickVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [loginDataForm, setLoginDataForm] = useState({
    email: "",
    password: "",
  });
  const navRef = useRef(null);
  const previousXRef = useRef(0);
  const runTimeoutRef = useRef(null);
  const [signupData, setSignupData] = useState({ // Added missing state
    name: "",
    email: "",
    password: "",
  });

  const getActiveNavKey = useCallback(
    (pathname) => {
      if (pathname === "/") return "home";
      if (pathname.startsWith("/images")) return "images";
      if (pathname.startsWith("/saved") && isLoggedIn) return "saved";
      if (
        isLoggedIn &&
        (
          pathname.startsWith("/userpage") ||
          pathname.startsWith("/changepassword") ||
          pathname.startsWith("/deleteuser")
        )
      ) {
        return "account";
      }
      if (pathname.startsWith("/about")) return "about";
      if (pathname.startsWith("/contact")) return "contact";
      if (pathname.startsWith("/help")) return "help";
      return null;
    },
    [isLoggedIn]
  );

  const getActiveElement = useCallback((activeKey, navElement) => {
    if (!navElement || !activeKey) return null;

    const selectorByKey = {
      home: 'a[href="/"]',
      images: 'a[href="/images"]',
      saved: 'a[href="/saved"]',
      about: 'a[href="/about"]',
      contact: 'a[href="/contact"]',
      help: 'a[href="/help"]',
      account: "#dropdown-basic",
    };

    const selector = selectorByKey[activeKey];
    return selector ? navElement.querySelector(selector) : null;
  }, []);

  const syncStickmanPosition = useCallback(() => {
    const activeKey = getActiveNavKey(location.pathname);
    const navElement = navRef.current;
    const activeElement = getActiveElement(activeKey, navElement);

    if (!navElement || !activeElement) {
      setStickVisible(false);
      return;
    }

    const navRect = navElement.getBoundingClientRect();
    const linkRect = activeElement.getBoundingClientRect();
    const x = linkRect.left - navRect.left + linkRect.width / 2 - 13;

    setStickX(Math.max(0, x));
    setStickVisible(true);
  }, [getActiveElement, getActiveNavKey, location.pathname]);

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

  useEffect(() => {
    const frame = requestAnimationFrame(syncStickmanPosition);
    window.addEventListener("resize", syncStickmanPosition);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncStickmanPosition);
    };
  }, [syncStickmanPosition]);

  useEffect(() => {
    if (!stickVisible) return;

    const distance = Math.abs(stickX - previousXRef.current);
    previousXRef.current = stickX;

    if (distance < 2) return;

    setIsRunning(true);
    if (runTimeoutRef.current) {
      clearTimeout(runTimeoutRef.current);
    }
    runTimeoutRef.current = setTimeout(() => {
      setIsRunning(false);
    }, 2000);

    return () => {
      if (runTimeoutRef.current) {
        clearTimeout(runTimeoutRef.current);
      }
    };
  }, [stickVisible, stickX]);

  useEffect(() => {
    return () => {
      if (runTimeoutRef.current) {
        clearTimeout(runTimeoutRef.current);
      }
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
      await apiFacade.signUp(signupData);

      // Log in the user right after sign-up
      const response = await apiFacade.login({
        email: signupData.email,
        password: signupData.password,
      });

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
      if (error.response?.status === 409) {
        alert("The email is already taken. Please use a different email.");
      } else {
        alert("Sign-Up Failed. Please try again.");
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
        >
          <Nav ref={navRef} className="ml-auto nav-links-track">
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

            {stickVisible && (
              <motion.div
                className={`nav-stickman ${isRunning ? "running" : "sitting"}`}
                initial={false}
                animate={
                  isRunning
                    ? {
                        x: stickX,
                        y: [0, -10, 0],
                        rotate: [0, -6, 6, 0],
                      }
                    : {
                        x: stickX,
                        y: 2,
                        rotate: 4,
                      }
                }
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
                  y: { duration: 0.6, ease: "easeInOut" },
                  rotate: { duration: 0.6, ease: "easeInOut" },
                }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" role="img">
                  <circle cx="12" cy="4" r="2.5" />
                  <line x1="12" y1="7" x2="12" y2="14" />
                  <line className="arm arm-left" x1="12" y1="9" x2="8" y2="12" />
                  <line className="arm arm-right" x1="12" y1="9" x2="16" y2="12" />
                  <line className="leg leg-left" x1="12" y1="14" x2="8.5" y2="20" />
                  <line className="leg leg-right" x1="12" y1="14" x2="15.5" y2="20" />
                </svg>
              </motion.div>
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
                placeholder="Email (Does not have to be valid)"
                autoComplete="email"
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
                placeholder="Password"
                autoComplete="new-password"
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
