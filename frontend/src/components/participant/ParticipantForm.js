import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to get URL parameters
import '../FormStyle.css'

const ParticipantForm = () => {
  const { id } = useParams(); // Get event ID from the URL
  const navigate = useNavigate(); //
  const [formData, setFormData] = useState({
    name: '',
    semester: '',
    branch: '',
    email: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://127.0.0.1:8000/api/events/${id}/register-participant/`, {
        ...formData,
        event: id,  // Use the id from useParams
        user: null, // Set user here to avoid sending undefined
      }, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Participant registered:', response.data);
      setSuccessMessage('Partcipant registered successfully!'); // Set success message
      setTimeout(() => {
        navigate(`/events/${id}`);// Navigate to the event list after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('Error registering participant:', error.response.data);
    }
  };

  return (
    <div className='hero'>
      <h1>PARTICIPANT FORM</h1>
    <form onSubmit={handleSubmit} className='form1'>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Semester:</label>
      <select name="semester" value={formData.semester} onChange={handleChange} required>
        <option value="S1">S1</option>
        <option value="S3">S3</option>
        <option value="S5">S5</option>
        <option value="S7">S7</option>
      </select>

      <label>Branch:</label>
      <select name="branch" value={formData.branch} onChange={handleChange} required>
        <option value="CSA">CSA</option>
        <option value="CSB">CSB</option>
        <option value="AIDS">AIDS</option>
        <option value="CY">CY</option>
        <option value="AI">AI</option>
        <option value="EEE">EEE</option>
        <option value="ECE">ECE</option>
        <option value="ME">ME</option>
        <option value="CE">CE</option>
      </select>

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <button type="submit">Register Participant</button>
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

export default ParticipantForm;
