import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const FeedbackForm = () => {
  const { id } = useParams(); // Get event ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [formData, setFormData] = useState({
    name: '',
    semester: '',
    class_name: '',
    email: '',
    ratings: '',
    comments: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); // State to handle success message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://127.0.0.1:8000/api/events/${id}/submit-feedback/`, {
        ...formData,
        event: id,  // Use the id from useParams
        user: null, // Set user here to avoid sending undefined
      }, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Feedback submitted:', response.data);
      setSuccessMessage('Feedback submitted successfully!'); // Set success message
      setTimeout(() => {
        navigate(`/events/${id}`);// Navigate to the event list after 2 seconds
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting feedback:', error.response.data);
    }
  };

  return (
    <div className='hero'>
      <h1>FEEDBACK FORM</h1>
      <form onSubmit={handleSubmit} className='form1'>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Semester:</label>
        <select name="semester" value={formData.semester} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="S1">S1</option>
          <option value="S3">S3</option>
          <option value="S5">S5</option>
          <option value="S7">S7</option>
        </select>

        <label>Class:</label>
        <select name="class_name" value={formData.class_name} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="CSA">CSA</option>
          <option value="CSB">CSB</option>
          <option value="AIDS">AIDS</option>
          <option value="AI">AI</option>
          <option value="CY">CY</option>
          <option value="EEE">EEE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
        </select>

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Rating:</label>
        <select name="ratings" value={formData.ratings} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>

        <label>Comments:</label>
        <textarea name="comments" value={formData.comments} onChange={handleChange} required></textarea>

        <button type="submit">Submit Feedback</button>
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

export default FeedbackForm;
