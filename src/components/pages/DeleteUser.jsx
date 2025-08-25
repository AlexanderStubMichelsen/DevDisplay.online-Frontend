import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiFacade from "../../util/api/UserFacade";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import abstractbackground from "../../assets/153450-805374052_small.mp4"; // Import the video file
import ScrollIndicator from "../modules/ScrollIndicator"; // Import ScrollIndicator component

const DeleteUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    } else {
      const storedEmail = JSON.parse(
        sessionStorage.getItem("loginData")
      )?.email;
      if (storedEmail) setEmail(storedEmail);
    }
  }, [navigate]);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await apiFacade.deleteUser(email, password);
      setMessage("User deleted successfully.");
      setEmail("");
      setPassword("");
      // Redirect after short delay
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Delete User Error:", error);
      setMessage("Failed to delete user. Check your password.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="user-page-wrapper">
        <div className="user-page-container">
          <div className="video-container">
            <video autoPlay loop muted playsInline className="video-bg">
              <source src={abstractbackground} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="user-page">
            <h1>Delete User Account</h1>
            {message && <p className="feedback">{message}</p>}
            <form onSubmit={handleDelete} className="user-form">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                  disabled // Disable if pulled from session
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger">
                Delete Account
              </button>
            </form>
            <div
              className="returndiv"
              style={{ paddingTop: "30px", paddingBottom: "30px" }}
            >
              <LinkContainer to="/userpage">
                <Button variant="outline-primary">Return</Button>
              </LinkContainer>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollIndicator />
    </>
  );
};

export default DeleteUser;
