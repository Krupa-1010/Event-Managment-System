import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Used for navigation after login
import './FormStyle.css'


const CreateEvent = () => {
  const [name, setName] = useState('');
  const [poster, setPoster] = useState(null);
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [startEventTime, setStartEventTime] = useState('');
  const [lastDateOfRegistration, setLastDateOfRegistration] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('poster', poster);
    formData.append('description', description);
    formData.append('venue', venue);
    formData.append('organizer', organizer);
    formData.append('start_event_time', startEventTime);
    formData.append('last_date_of_registration', lastDateOfRegistration);

    try {
      const token = localStorage.getItem('token'); // Get the token from local storage

      const response = await axios.post('http://127.0.0.1:8000/api/events/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`, // Include the token in the headers
        },
      });

      console.log('Event created:', response.data);
      navigate('/event-list');
    } catch (error) {
      console.error('Error creating event:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='hero'>
      <h1> ADD EVENT </h1>
    <form onSubmit={handleSubmit} className='form1'>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" required />
      <label>Event Poster:</label>
      <input type="file" onChange={(e) => setPoster(e.target.files[0])} required />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <label>Venue:</label>
      <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Venue" required />
      <label>Organizer:</label>
      <input type="text" value={organizer} onChange={(e) => setOrganizer(e.target.value)} placeholder="Organizer" required />
      <label>Event Date and Time:</label>
      <div className="input-container">
      <input className='calender' type="datetime-local" value={startEventTime} onChange={(e) => setStartEventTime(e.target.value)} required />
      {/* FontAwesome calendar icon */}
      <i className="fas fa-calendar-alt calendar-icon"></i>
    </div>
    <label>Last Date of Registration:</label>
    <div className="input-container">
      <input className='calender' type="date" value={lastDateOfRegistration} onChange={(e) => setLastDateOfRegistration(e.target.value)} required />
      {/* FontAwesome calendar icon */}
      <i className="fas fa-calendar-alt calendar-icon"></i>
    </div>
      <button className='btn' type="submit">Create Event</button>
    </form>
    </div>
  );
};

export default CreateEvent;
