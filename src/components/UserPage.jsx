import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../css/UserPage.css";
import NavBar from "./NavBar";
import apiFacade from "../api/facade";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";

const UserPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/"); // Redirect to the home page if not logged in
      return;
    }

    const fetchUserData = async () => {
      try {
        const storedUser = apiFacade.getUser();
        console.log("Stored user:", storedUser);
        if (storedUser?.email) {
          setUser((prevUser) => ({
            ...prevUser,
            email: storedUser.email || "",
            name: storedUser.name || "",
          }));
        }
      } catch (error) {
        console.error("Fetch User Error:", error);
        setMessage("Failed to fetch user data.");
      }
    };

    fetchUserData();
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
      await apiFacade.updateUser(user);
      setMessage("User updated successfully!");
    } catch (error) {
      console.error("Update User Error:", error);
      setMessage("Failed to update user.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="user-page-container">
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
          <LinkContainer to="/changepassword">
            <Nav.Link>Change Password</Nav.Link>
          </LinkContainer>
        </div>
      </div>
    </>
  );
};

export default UserPage;