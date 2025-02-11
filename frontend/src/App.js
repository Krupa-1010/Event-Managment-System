// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistration from './components/userapp/UserRegistration';
import UserLogin from './components/userapp/UserLogin';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import EventForm from './components/EventForm';
import ParticipantList from './components/participant/ParticipantList';
import ParticipantForm from './components/participant/ParticipantForm';
import EditEvent from './components/EditEvent';
import VolunteerForm from './components/volunteer/VolunteerForm';
import VolunteerList from './components/volunteer/VolunteerList';
import FeedbackForm from './components/feedback/FeedbackForm';
import FeedbackList from './components/feedback/FeedbackList';
import Main from './components/Main';
import './App.css'


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/event-list" element={<EventList />} />
      <Route path="/events/:id" element={<EventDetail />} /> {/* Ensure this matches the URL pattern */}
      <Route path="/create-event" element={<EventForm />} />
      <Route path="/edit-event/:id" element={<EditEvent />} />
      <Route path="/register" element={<UserRegistration />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/events/:id/register-participant" element={<ParticipantForm />} />
      <Route path="/events/:id/participants" element={<ParticipantList />} />
      <Route path="/events/:id/register-volunteer" element={<VolunteerForm />} />
      <Route path="/events/:id/volunteer-list" element={<VolunteerList />} />
      <Route path="/events/:id/submit-feedback" element={<FeedbackForm />} />
      <Route path="/events/:id/feedbacks" element={<FeedbackList />} />
      
      </Routes>
    </Router>
  );
};

export default App;


