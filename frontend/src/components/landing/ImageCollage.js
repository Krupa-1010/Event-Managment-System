import React, { useEffect, useState } from 'react';
import './ImageCollage.css'; // Ensure this file contains the CSS provided below
import { useNavigate } from 'react-router-dom';

const ImageCollage = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [fadeOutImages, setFadeOutImages] = useState(false);
  const [rotateGrid, setRotateGrid] = useState(false); // New state for grid rotation
  const navigate = useNavigate(); 
  // List of image URLs
  const images = [
    '/static/1.jpg',
    '/static/2.jpg',
    '/static/3.jpg',
    '/static/4.jpg',
    '/static/5.jpg',
    '/static/6.jpg',
    '/static/7.jpg',
    '/static/8.jpg',
    '/static/9.jpg',
    '/static/10.jpg',
    '/static/11.jpg',
    '/static/12.jpg',
    '/static/13.jpg',
    '/static/14.jpg',
    '/static/15.jpg',
    '/static/16.jpg',
    '/static/17.jpg',
    '/static/18.jpg',
  ];

  useEffect(() => {
    // After 5 seconds, fade out the images, rotate the grid, and then show the title
    const timer = setTimeout(() => {
      setFadeOutImages(true);
      setTimeout(() => {
        setRotateGrid(true); // Start rotation
        setTimeout(() => setShowTitle(true), 2000); // Wait for rotation to complete before showing title
      }, 1000); // Wait for fade-out to complete before starting rotation
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='anim'>
    <div className={`collage-container ${showTitle ? 'black-out' : ''}`}>
      <div className={`grid ${rotateGrid ? 'flip-out' : ''}`}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={`image ${fadeOutImages ? 'fade-out' : ''} enter-from-${index % 4}`} // Add fade-out class conditionally
          />
        ))}
      </div>

      {/* Black background and title */}
      {showTitle && (
        <div className="black-background">
          <div className='navbar'>
      <button
              className="btn4"
              onClick={() => navigate(`/register`)}>
              Register
            </button>
            <button
              className="btn4"
              onClick={() => navigate(`/login`)}>
              Login
            </button>
            </div>
   
          <h1>EVENT MANAGEMENT <br />SYSTEM</h1>
          <h2 className='typewriter-text'>Streamline,Organize and Engage-All in One Place</h2>
          <hr className='line'/>
        </div>
      )}
    </div>
    </div>
  );
};

export default ImageCollage;

/*.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Responsive grid */
/*gap: 10px;
  transition: transform 2s ease; /* Transition for rotation */
/*}*/



