// src/Home.js
import React from 'react';
import Gallery from './food/Gallery';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib, faSearch, faStar, faUserGroup } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container text-center mt-5 home-content">
        <h1>Taste the joy of sharing recipes</h1>
        <button className="explore-btn"
        onClick={() => navigate('/recipes')}
        >Browse our Recipes</button>
      </div>
      
      {/* Gallery Component */}
      <Gallery />

      {/* Services Section */}
      <div id="services" className="services-section">
      <h2>Our Services</h2>
      <div className="services-container">
        <div className="service-item">
          <FontAwesomeIcon icon={faPenNib} className="service-icon" />
          <h3>Submit Recipes</h3>
          <p>Share your culinary creations with the community.</p>
        </div>
        <div className="service-item">
          <FontAwesomeIcon icon={faSearch} className="service-icon" />
          <h3>Discover Recipes</h3>
          <p>Find new and exciting recipes from other users.</p>
        </div>
        <div className="service-item">
          <FontAwesomeIcon icon={faStar} className="service-icon" />
          <h3>Favorite Recipes</h3>
          <p>Save your favorite recipes for easy access.</p>
        </div>
        <div className="service-item">
          <FontAwesomeIcon icon={faUserGroup} className="service-icon" />
          <h3>Connect with Others</h3>
          <p>Interact with fellow food enthusiasts and share ideas.</p>
        </div>
      </div>
      {/* About Us Section */}
      <div id="about" className="about-section">
        <h2>About Us</h2>
        <p>
          Welcome to Tastefully! Our mission is to create a vibrant community of food lovers who share their culinary creations and discover new recipes. 
          We believe that cooking is not just about food; it's about bringing people together and creating lasting memories.
        </p>
        <p>
          Founded by a passionate food enthusiast, Tastefully aims to provide a platform where everyone can share their favorite recipes, 
          connect with others, and explore the diverse world of cooking. Whether you're a seasoned chef or just starting out, 
          there's something for everyone here.
        </p>
        <p>
          Our values are rooted in creativity, community, and sustainability. We encourage our users to experiment in the kitchen, 
          share their unique recipes, and connect with fellow food enthusiasts. Join us on this delicious journey!
        </p>
        <p>
          Ready to dive in? Sign up today and start sharing your recipes with the world!
        </p>
      </div>
    </div>
    </div>
  );
};

export default Home;