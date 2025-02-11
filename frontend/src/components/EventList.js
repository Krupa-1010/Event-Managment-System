import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './EventList.css';  // Import the CSS file

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUserRole(response.data.role);
            } catch (error) {
                console.error("There was an error fetching the user role!", error);
            }
        };

        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/events/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                setEvents(response.data);
            } catch (error) {
                console.error("There was an error fetching the events!", error);
            }
        };

        fetchUserRole();
        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/events/${eventId}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="event-page">
            <div className="header">
                <h1>AVAILABLE <br /> EVENTS</h1>
                {userRole === 'organizer' && <Link to="/create-event" className="add-event-btn">Add Event</Link>}
            </div>
            <div className="event-list">
             
                {events.map((event) => (
                    <div className="event-card" key={event.id}>
                        <img src={event.poster} alt={event.name} className="event-poster" />
                        <h3>{event.name}</h3>
                        <p>{event.description}</p>
                        <p><strong>Venue:</strong> {event.venue}</p>
                        <p><strong>Organizer:</strong> {event.organizer}</p>
                        <p><strong>Start Time:</strong> {new Date(event.start_event_time).toLocaleString()}</p>
                        <p><strong>Last Registration Date:</strong> {new Date(event.last_date_of_registration).toLocaleDateString()}</p>
                        <div className="event-actions">
                            <Link to={`/events/${event.id}`} className="explore-btn">Explore</Link>
                            {userRole === 'organizer' && (
                                <>
                                    <button className="edit-btn" onClick={() => navigate(`/edit-event/${event.id}`)}>
                                        <i className="fas fa-edit"></i> Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                                        <i className="fas fa-trash-alt"></i> Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
