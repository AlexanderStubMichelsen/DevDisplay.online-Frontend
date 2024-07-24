import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import facade from "../../util/apiFacade";
import NavBar from "../NavBar";
import "../../css/AdminUsers.css"; // Import the CSS file

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromUsers = async () => {
      try {
        const userEndpoint = "auth/getAllUsers";
        const userMethod = "GET";
        const userResponse = await facade.fetchData(userEndpoint, userMethod);

        const initializedUsers = userResponse.map((user) => ({
          ...user,
          roles: {},
        }));

        setUsers(initializedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromUsers();
  }, []);

  const deleteRatingFromPictures = async (pictureId) => {
    try {
      const endpoint = `ratings/${pictureId}`;
      const method = "DELETE";
      await facade.fetchData(endpoint, method);
      console.log(`Rating deleted for picture ${pictureId}`);
    } catch (error) {
      console.error("Error deleting rating:", error);
      setError("Failed to delete rating. Please try again.");
    }
  };

  const deletePicturesFromUser = async (username) => {
    try {
      const endpoint = `pictures/${username}`;
      const method = "DELETE";
      await facade.fetchData(endpoint, method);
      console.log(`Pictures deleted for user ${username}`);
    } catch (error) {
      console.error("Error deleting pictures:", error);
      setError("Failed to delete pictures. Please try again.");
    }
  };

  const fetchDataFromPictures = async (username) => {
    try {
      const pictureEndpoint = `pictures/${username}`;
      const pictureMethod = "GET";
      const pictureResponse = await facade.fetchData(
        pictureEndpoint,
        pictureMethod
      );
      if (pictureResponse && pictureResponse.length > 0) {
        for (const picture of pictureResponse) {
          await deleteRatingFromPictures(picture.id);
        }
        await deletePicturesFromUser(username);
      }
    } catch (error) {
      console.error("Error fetching pictures:", error);
      setError("Failed to fetch pictures. Please try again.");
    }
  };

  const deleteUser = async (username) => {
    try {
      await fetchDataFromPictures(username);
      const endpoint = `auth/delete/${username}`;
      const method = "DELETE";
      await facade.fetchData(endpoint, method);
      console.log(`User deleted: ${username}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.username !== username)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");
    }
  };

  const changeRoles = async (user) => {
    try {
      const endpoint = `auth/update/${user.username}`;
      const method = "PUT";

      const roleNames = Object.keys(user.roles).filter(
        (role) => user.roles[role]
      );

      const payload = { roles: roleNames };

      await facade.fetchData(endpoint, method, payload);
      console.log(`Roles updated for user ${user.username}:`, payload.roles);
    } catch (error) {
      console.error("Error updating roles:", error);
      setError("Failed to update roles. Please try again.");
    }
  };

  const handleChange = (userId, role) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === userId
          ? { ...user, roles: toggleRole(user.roles, role) }
          : user
      )
    );
  };

  const deleteRatings = async (username) => {
    try {
      const endpoint = `ratings/${username}`;
      const method = "DELETE";
      await facade.fetchData(endpoint, method);
      console.log(`Ratings deleted for user ${username}`);
    } catch (error) {
      console.error("Error deleting ratings:", error);
      setError("Failed to delete ratings. Please try again.");
    }
  };

  const toggleRole = (roles, role) => {
    return {
      ...roles,
      [role]: !roles[role],
    };
  };

  return (
    <>
      <NavBar />
      <div className="admin-container">
        <h2 className="admin-title">Admin Users</h2>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="loading-error">Error: {error}</p>
          ) : users.length > 0 ? (
            <ul className="user-list">
              {users.map((user) => (
                <li key={user.username} className="user-item">
                  <p className="header_1">Admin panel for user: {user.username}</p>
                  <div className="user-actions">
                    <button className="delete" onClick={() => deleteUser(user.username)}>
                      Delete
                    </button>
                    <Link to={`/admin/users/${user.username}`}>
                      <button className="view">View Images</button>
                    </Link>
                    <Link to={`/admin/images/${user.username}`}>
                      <button className="view">Search Images</button>
                    </Link>
                    <button className="view" onClick={() => deleteRatings(user.username)}>Delete Ratings</button>
                  </div>
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={user.roles["user"] || false}
                        onChange={() => handleChange(user.username, "user")}
                      />
                      User
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={user.roles["admin"] || false}
                        onChange={() => handleChange(user.username, "admin")}
                      />
                      Admin
                    </label>
                  </div>
                  <button className="submit" onClick={() => changeRoles(user)}>
                    Submit Roles
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
