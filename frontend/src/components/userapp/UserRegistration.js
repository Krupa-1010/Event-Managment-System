import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserStyles.css'

const UserRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Select Role',
    });
    const [successMessage, setSuccessMessage] = useState(''); //
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);  // Correct URL here
            console.log('Registration successful:', response.data);

            setSuccessMessage('User registered  successfully!'); // Set success message
      setTimeout(() => {
        navigate(`/login`);// Navigate to the event list after 2 seconds
      }, 2000);
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='main'>
            <h2>REGISTER NOW</h2>
            <h4>Already registered ? <a href='/login'>Login here</a></h4>
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
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
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
                <select name="role" value={formData.role} onChange={handleChange} required>
                <option selected disabled value="default">Select Role</option>
                    <option value="student">Student</option>
                    <option value="organizer">Organizer</option>
                </select>
                <button type="submit">Register</button>
            </form>
            {/* Success message popup */}
      {successMessage && (
        <div className='success-message'>
          {successMessage}
        </div>
      )}
    </div>
    
    );
};

export default UserRegistration;
