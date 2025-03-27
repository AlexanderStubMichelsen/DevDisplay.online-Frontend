import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import apiFacade from "../api/facade";
import NavBar from "./NavBar";

const ChangePassword = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [newPassword, setNewPassword] = useState({
    newpassword: "",
    repassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
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

  const handleNewPasswordChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.newpassword !== newPassword.repassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      await apiFacade.changePassword({
        email: user.email,
        oldPassword: user.password,
        newPassword: newPassword.newpassword,
      });
      setMessage("Password updated successfully!");
    } catch (error) {
      console.error("Update Password Error:", error);
      setMessage("Failed to update password.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="user-page-container">
        <div className="user-page">
          <h1>Change Password</h1>
          {message && <p className="feedback">{message}</p>}
          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label htmlFor="oldpassword">Old Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="newpassword">New Password:</label>
              <input
                type="password"
                name="newpassword"
                value={newPassword.newpassword}
                onChange={handleNewPasswordChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="repassword">Re Enter New Password:</label>
              <input
                type="password"
                name="repassword"
                value={newPassword.repassword}
                onChange={handleNewPasswordChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;