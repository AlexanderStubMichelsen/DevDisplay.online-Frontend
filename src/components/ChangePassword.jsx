import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiFacade from "../util/api/UserFacade";
import NavBar from "./NavBar";

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
      <NavBar />
      <div className="user-page-container">
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
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
