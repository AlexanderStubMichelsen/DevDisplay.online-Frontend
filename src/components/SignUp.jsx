import React, { useState } from 'react';
import facade from '../util/apiFacade';
import NavBar from '../components/NavBar';
import '../css/SignUp.css'; // Ensure you import the stylesheet containing your CSS

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await facade.register(username, password, role);
        setSuccessMessage('User registered successfully');
      } catch (error) {
        setErrors({ apiError: error.message || 'Registration failed' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) errors.username = 'Username is required';
    if (!password.trim()) errors.password = 'Password is required';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  return (
    <>
      <NavBar />
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
          <button type="submit">Sign Up</button>
          {errors.apiError && <p className="error">{errors.apiError}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </form>
      </div>
      <div className='link'>
        <p>Don't have an account? <a href="/login">Login</a> here</p>
      </div>
    </>
  );
};

export default SignupPage;
