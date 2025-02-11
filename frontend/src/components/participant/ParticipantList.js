import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../ListStyle.css'; // Import the external CSS

const ParticipantList = () => {
  const { id } = useParams(); // Get event ID from the URL
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}/participants/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setParticipants(response.data);  // Store participant data in state
      } catch (err) {
        setError('Error fetching participant list');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="list-container">
      <h2 className="table-title">PARTICIPANT LIST</h2>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>SN</th> {/* Serial Number Column */}
              <th>Name</th>
              <th>Semester</th>
              <th>Branch</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={participant.participant_id}>
                <td>{index + 1}</td> {/* Serial Number based on the index */}
                <td>{participant.name}</td>
                <td>{participant.semester}</td>
                <td>{participant.branch}</td>
                <td>{participant.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantList;
