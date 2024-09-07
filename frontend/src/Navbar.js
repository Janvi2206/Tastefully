import React from "react";
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar({ isRecipeSubmission }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Tastefully
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="ms-auto navbar-nav">
            {isRecipeSubmission ? (
              <>
                <Link className="nav-link" to="/browse-recipes">Browse Recipes</Link>
                <button className="signup-btn">Sign Out</button>
              </>
            ) : (
              <>
                <Link className="nav-link active" aria-current="page" to="/post-recipe">Post Recipes</Link>
                <Link className="nav-link" to="/register">Sign Up</Link>
                <Link className="nav-link" to="/login">Login</Link> {/* Link to the login page */}
                <a className="nav-link" href="#services">Services</a>
                <a className="nav-link" href="#about">About Us</a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}