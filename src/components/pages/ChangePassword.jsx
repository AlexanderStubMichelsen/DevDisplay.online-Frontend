import React from "react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import apiFacade from "../../util/api/UserFacade";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import { Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import abstractbackground from "../../assets/153450-805374052_small-ezgif.com-reverse-video.mp4"; // Import the video file
import ScrollIndicator from "../modules/ScrollIndicator"; // Import ScrollIndicator component

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== rePassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      await apiFacade.changePassword({
        oldPassword,
        newPassword,
      });
      setMessage("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setRePassword("");
    } catch (error) {
      console.error("Update Password Error:", error);
      setMessage("Failed to update password.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Change Password | DevDisplay</title>
        <meta property="og:title" content="Change Password | DevDisplay" />
        <meta
          property="og:description"
          content="Update your DevDisplay account password securely."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devdisplay.online/changepassword" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1200&h=630&q=80"
        />
        <meta name="twitter:title" content="Change Password | DevDisplay" />
        <meta
          name="twitter:description"
          content="Update your DevDisplay account password securely."
        />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1200&h=630&q=80"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
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
            <h1>Change Password</h1>
            {message && <p className="feedback">{message}</p>}
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-group">
                <label htmlFor="oldPassword">Old Password:</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rePassword">Re-enter New Password:</label>
                <input
                  type="password"
                  name="rePassword"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
            </form>
            <Container className="my-4">
              <LinkContainer to="/userpage">
                <Button variant="outline-primary">Return</Button>
              </LinkContainer>
            </Container>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollIndicator />
    </>
  );
};

export default ChangePassword;
