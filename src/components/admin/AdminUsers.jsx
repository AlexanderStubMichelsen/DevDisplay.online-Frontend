import React, { useEffect, useState } from "react";
import facade from "../../util/apiFacade";
import NavBar from "../NavBar";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDataFromUsers = async () => {
            try {
                const userEndpoint = 'auth/getAllUsers'; // Adjust the endpoint path if necessary
                const userMethod = 'GET';
                const userResponse = await facade.fetchData(userEndpoint, userMethod);
                
                setUsers(userResponse); // Update users state with fetched data
                setIsLoading(false); // Set loading state to false after fetching
                
            } catch (error) {
                console.error('Error fetching users:', error);
                // Handle the error gracefully, display a message to the user, etc.
            }
        };

        fetchDataFromUsers();
    }, []);

    return (
        <>
            <NavBar />
            <h2>Admin Users</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {users.length > 0 ? (
                        <ul>
                            {users.map(user => (
                                <li key={user.id}>
                                    {user.username}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default AdminUsers;
