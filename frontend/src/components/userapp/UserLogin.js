import React, { useState } from 'react';
import axios from 'axios';
import './UserStyles.css'
import { useNavigate } from 'react-router-dom'; // Used for navigation after login

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to different routes
 
  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);

      // Assuming response.data contains the token
      const token = response.data.token;

      if (token) {
        // Store token in localStorage for future requests
        localStorage.setItem('token', token);

        // Navigate to the events page or another protected route after login
        navigate('/event-list');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      setError('Login error. Please check your credentials and try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className='main'>
      <h2>WELCOME BACK !</h2>
      <h4>First time here? <a href='/register'>Register now</a></h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UserLogin;
