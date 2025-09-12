import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import "../../css/pages/UserPage.css";
import NavBar from "../modules/NavBar";
import apiFacade from "../../util/api/UserFacade";
import Footer from "../modules/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import abstractbackground from "../../assets/153450-805374052_small-ezgif.com-reverse-video.mp4"; // Import the video file
import ScrollIndicator from "../modules/ScrollIndicator";

const UserPage = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    const storedUser = apiFacade.getUser();
    if (storedUser?.email) {
      setUser((prevUser) => ({
        ...prevUser,
        id: storedUser.id,
        email: storedUser.email,
        name: storedUser.name,
      }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        name: user.name,
        password: user.password,
      };
      await apiFacade.updateUser(updateData);
      setMessage("User updated successfully!");
      setUser({ ...user, password: "" });
    } catch (error) {
      console.error("Update User Error:", error);
      setMessage("Failed to update user.");
    }
  };

  return (
    <>
      <Helmet>
        <title>User Dashboard | Manage Your DevDisplay Profile</title>
        <meta
          name="description"
          content="View and update your DevDisplay user information, change password, or delete your account."
        />
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
            <h1>User Information</h1>
            {message && <p className="feedback">{message}</p>}
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  readOnly
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Update
              </button>
            </form>

            <Container className="my-4">
              <Row>
                <Col xs={12} md={6} className="mb-3 d-flex flex-column gap-2">
                  <LinkContainer to="/changepassword">
                    <Button variant="outline-primary">Change Password</Button>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <Button variant="outline-secondary">Return</Button>
                  </LinkContainer>
                </Col>
                <Col xs={12} md={6} className="mb-3 d-flex flex-column gap-2">
                  <LinkContainer to="/deleteuser">
                    <Button variant="outline-danger">Delete User</Button>
                  </LinkContainer>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollIndicator />
    </>
  );
};

export default UserPage;
