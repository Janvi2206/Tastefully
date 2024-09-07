// src/Gallery/Gallery.js
import React from 'react';
import './Gallery.css'; // Import the CSS for the gallery
import image1 from './image1.avif';
import image2 from './image2.jpeg';
import image3 from './image3.webp';
import image4 from './image4.jpeg';
import image5 from './image5.webp';
import image6 from './image6.jpeg';
import image7 from './image7.webp';
import image8 from './image8.jpeg';
import image9 from './image9.jpeg';
import image10 from './image10.webp';


const Gallery = () => {
  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Our Delicious Recipes</h2>
      <div className="gallery">
        <img src={image1} alt="Recipe 1" className="gallery-item" />
        <img src={image2} alt="Recipe 2" className="gallery-item" />
        <img src={image3} alt="Recipe 3" className="gallery-item" />
        <img src={image4} alt="Recipe 4" className="gallery-item" />
        <img src={image5} alt="Recipe 5" className="gallery-item" />
        <img src={image6} alt="Recipe 6" className="gallery-item" />
        <img src={image7} alt="Recipe 7" className="gallery-item" />
        <img src={image8} alt="Recipe 8" className="gallery-item" />
        <img src={image9} alt="Recipe 9" className="gallery-item" />
        <img src={image10} alt="Recipe 10" className="gallery-item" />
      </div>
    </div>
  );
};

export default Gallery;