import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import facade from "../../util/apiFacade";
import NavBar from "../NavBar";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to hold error messages

    // Fetch all users on component mount
    useEffect(() => {
        const fetchDataFromUsers = async () => {
            try {
                const userEndpoint = 'auth/getAllUsers';
                const userMethod = 'GET';
                const userResponse = await facade.fetchData(userEndpoint, userMethod);
                setUsers(userResponse); // Assuming userResponse is an array of users
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users. Please try again later.'); // Set error state
            } finally {
                setLoading(false);
            }
        };

        fetchDataFromUsers();
    }, []);

    const deleteRatingFromPictures = async (pictureId) => {
        try {
            const endpoint = `ratings/${pictureId}`;
            const method = 'DELETE';
            await facade.fetchData(endpoint, method, true);
            console.log(`Rating deleted for picture ${pictureId}`);
        } catch (error) {
            console.error('Error deleting rating:', error);
            setError('Failed to delete rating. Please try again.');
            throw error;
        }
    };

    const deletePicturesFromUser = async (username) => {
        try {
            const endpoint = `pictures/${username}`;
            const method = 'DELETE';
            await facade.fetchData(endpoint, method, true);
            console.log(`Pictures deleted for user ${username}`);
        } catch (error) {
            console.error('Error deleting pictures:', error);
            setError('Failed to delete pictures. Please try again.');
            throw error;
        }
    };

    const fetchDataFromPictures = async (username) => {
        try {
            const pictureEndpoint = `pictures/${username}`;
            const pictureMethod = 'GET';
            const pictureResponse = await facade.fetchData(pictureEndpoint, pictureMethod);
            if (pictureResponse && pictureResponse.length > 0) {
                for (const picture of pictureResponse) {
                    await deleteRatingFromPictures(picture.id);
                }
                await deletePicturesFromUser(username);
            }
        } catch (error) {
            console.error('Error fetching pictures:', error);
            setError('Failed to fetch pictures. Please try again.');
            throw error;
        }
    };

    const deleteUser = async (username) => {
        try {
            await fetchDataFromPictures(username);
            const endpoint = `auth/delete/${username}`;
            const method = 'DELETE';
            await facade.fetchData(endpoint, method, true);
            console.log(`User deleted: ${username}`);
            setUsers(prevUsers => prevUsers.filter(user => user.username !== username));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user. Please try again.');
        }
    };

    return (
        <>
            <NavBar />
            <h2>Admin Users</h2>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user.username}>
                                {user.username}
                                <button onClick={() => deleteUser(user.username)}>Delete</button>
                                <Link to={`/admin/users/${user.username}`}>
                                    <button>View Pictures</button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </>
    );
};

export default AdminUsers;
