import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './FormStyle.css'

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        venue: '',
        organizer: '',
        start_event_time: '',
        last_date_of_registration: '',
        poster: null, // Poster is initially null
    });
    const [posterPreview, setPosterPreview] = useState(''); // Poster URL for preview
    const [currentPoster, setCurrentPoster] = useState('');  // Current poster URL

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please login');
                }

                const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                const eventData = response.data;

                // Set the poster preview and current poster file
                setPosterPreview(eventData.poster); // Use the poster URL for the preview
                setCurrentPoster(eventData.poster.split('/').pop()); // Display the current file name

                // Set the form data with the fetched event data
                setFormData({
                    ...eventData,
                    poster: null, // Poster should stay null, as we cannot programmatically select a file
                    start_event_time: eventData.start_event_time.split('T')[0] + 'T00:00',
                    last_date_of_registration: eventData.last_date_of_registration,
                });
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            if (files.length > 0) {
                setPosterPreview(URL.createObjectURL(files[0])); // Show the new selected file preview
                setFormData({ ...formData, [name]: files[0] }); // Update formData with new poster
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formDataToSubmit = new FormData();
    
            // Append all fields to FormData
            for (const key in formData) {
                if (key === 'poster') {
                    // If no new poster is chosen, don't append the file
                    if (formData.poster) {
                        formDataToSubmit.append('poster', formData.poster); // Append the new poster file
                    }
                } else {
                    formDataToSubmit.append(key, formData[key]);
                }
            }
    
            const response = await axios.put(`http://127.0.0.1:8000/api/events/${id}/`, formDataToSubmit, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data', // Ensure multipart encoding for file upload
                },
            });
    
            console.log('Response:', response);
            navigate('/event-list');
        } catch (error) {
            console.error('Error updating event:', error);
            if (error.response) {
                console.error('Server error data:', error.response.data);
            }
        }
    };
    
    return (
        <div className='hero'>
            <h1>EDIT EVENT</h1>
        <form onSubmit={handleSubmit} className='form1'>
            <label htmlFor="name">Event Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label htmlFor="description">Event Description</label>
            <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
            />

            <label htmlFor="venue">Venue</label>
            <input
                type="text"
                name="venue"
                id="venue"
                value={formData.venue}
                onChange={handleChange}
                required
            />

            <label htmlFor="organizer">Organizer</label>
            <input
                type="text"
                name="organizer"
                id="organizer"
                value={formData.organizer}
                onChange={handleChange}
                required
            />

            <label htmlFor="start_event_time">Start Event Time</label>
            <input
                type="datetime-local"
                name="start_event_time"
                id="start_event_time"
                value={formData.start_event_time}
                onChange={handleChange}
                required
            />

            <label htmlFor="last_date_of_registration">Last Date of Registration</label>
            <input
                type="date"
                name="last_date_of_registration"
                id="last_date_of_registration"
                value={formData.last_date_of_registration}
                onChange={handleChange}
                required
            />

            <label htmlFor="poster">Event Poster</label>
            <input
                type="file"
                name="poster"
                id="poster"
                onChange={handleChange}
                accept="image/*"
            />

            {/* Display current poster file name */}
            <p className='current-poster'>Current Poster: {currentPoster ? currentPoster : 'No file selected'}</p>

            {/* Poster preview */}
            {posterPreview && (
                <div>
                    <h3>Poster Preview:</h3>
                    <img src={posterPreview} alt="Event Poster" style={{ width: '200px', height: 'auto' }} />
                </div>
            )}

            <button type="submit">Update Event</button>
        </form>
        </div>
    );
};

export default EditEvent;
