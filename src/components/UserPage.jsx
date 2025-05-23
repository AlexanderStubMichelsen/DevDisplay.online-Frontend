import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UserPage.css";
import NavBar from "./NavBar";
import apiFacade from "../util/api/UserFacade";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Footer from "./Footer";

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
    console.log("Stored user:", storedUser);
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
      // Only send the fields that are updateable (name, password)
      const updateData = {
        name: user.name,
        password: user.password,
      };
      await apiFacade.updateUser(updateData);
      setMessage("User updated successfully!");
      setUser({ ...user, password: "" }); // Clear password field after update
    } catch (error) {
      console.error("Update User Error:", error);
      setMessage("Failed to update user.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="user-page-wrapper">
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
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
