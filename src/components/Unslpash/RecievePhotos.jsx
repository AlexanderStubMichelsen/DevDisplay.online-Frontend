import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/logout');
      setMessage('Logout successful');
    } catch (error) {
      setMessage('Failed to logout');
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/profile');
      setMessage(`Logged in as: ${response.data.username}`);
    } catch (error) {
      setMessage('Unauthorized');
    }
  };

  return (
    <div className="App">
      <h1>User Authentication Example</h1>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={fetchProfile}>Fetch Profile</button>
      <p>{message}</p>
    </div>
  );
};

export default App;
