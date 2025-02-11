import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../ListStyle.css'; // Import the external CSS

const VolunteerList = () => {
  const { id } = useParams(); // Get event ID from the URL
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}/volunteers/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setVolunteers(response.data); // Store volunteer data in state
      } catch (err) {
        setError('Error fetching volunteer list');
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="list-container">
      <h2 className="table-title">VOLUNTEERS LIST</h2>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>SN</th> {/* Serial Number Column */}
              <th>Name</th>
              <th>Semester</th>
              <th>Class</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer, index) => (
              <tr key={volunteer.volunteer_id}>
                <td>{index + 1}</td> {/* Serial Number based on the index */}
                <td>{volunteer.name}</td>
                <td>{volunteer.semester}</td>
                <td>{volunteer.class_name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerList;
