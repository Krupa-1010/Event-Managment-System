import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetail.css'; // Import the CSS file

const EventDetail = () => {
  const { id } = useParams(); // Get event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null); // State to hold user role
  const navigate = useNavigate(); // For navigating to other pages

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error("No authentication token found. Please login.");
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        // Set event details and user role
        setEvent(response.data);
        setUserRole(response.data.user_role); // Correctly capture user role
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('There was an error fetching the event');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="event-detail-container">
      <div className="event-detail-card">
        <h2 className="event-title">{event.name}</h2>
        <img
          src={event.poster}
          alt={event.name}
          className="eventdetail-poster"
        />
        <p className="event-description">{event.description}</p>
        <p className="event-info">Venue: {event.venue}</p>
        <p className="event-info">Organizer: {event.organizer}</p>
        <p className="event-info">Start Time: {new Date(event.start_event_time).toLocaleString()}</p>
        <p className="event-info">Last Registration Date: {new Date(event.last_date_of_registration).toLocaleDateString()}</p>

        {/* Register as Participant and Volunteer Buttons */}
        <div className="button-container">
          <button className="custom-button" onClick={() => navigate(`/events/${id}/register-participant`)}>Register as Participant</button>
          <button className="custom-button" onClick={() => navigate(`/events/${id}/register-volunteer`)}>Register as Volunteer</button>
          <button className="custom-button" onClick={() => navigate(`/events/${id}/submit-feedback`)}>Submit Feedback</button>
        </div>

        {/* Conditionally render View Participant List and Volunteer List buttons for organizers only */}
        {userRole === 'organizer' && (
          <div className="button-container">
            <button
              className="custom-button"
              onClick={() => navigate(`/events/${id}/participants`)}>
              View Participant List
            </button>
            
            <button
              className="custom-button"
              onClick={() => navigate(`/events/${id}/volunteer-list`)}>
              View Volunteer List
            </button>
            
            <button
              className="custom-button"
              onClick={() => navigate(`/events/${id}/feedbacks`)}>
              View Feedback List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
