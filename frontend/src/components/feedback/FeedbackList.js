import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../ListStyle.css'; // Import the external CSS

const FeedbackList = () => {
  const { id } = useParams(); // Get event ID from the URL
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}/feedback-list/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setFeedbacks(response.data); // Store feedback data in state
      } catch (err) {
        setError('Error fetching feedback list');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="list-container">
      <h2 className="table-title">FEEDBACK LIST</h2>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>SN</th> {/* Serial Number Column */}
              <th>Name</th>
              <th>Semester</th>
              <th>Class</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={feedback.id}>
                <td>{index + 1}</td> {/* Serial Number based on the index */}
                <td>{feedback.name}</td>
                <td>{feedback.semester}</td>
                <td>{feedback.class_name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.ratings}</td>
                <td>{feedback.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackList;
