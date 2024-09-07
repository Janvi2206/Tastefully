import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Home from './Home';
import RecipeSubmissionForm from './RecipeSubmissionForm';
import Register from './Register'; // Import the Register component
import Login from './Login'; // Import the Login component
import Recipes from './Recipes'; // Import the Recipes component
import RecipeDetails from './RecipeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Navbar isRecipeSubmission={false} />
              <Home />
            </>
          } 
        />
        <Route 
          path="/post-recipe" 
          element={
            <>
              <Navbar isRecipeSubmission={true} />
              <RecipeSubmissionForm />
            </>
          } 
        />
        <Route 
          path="/recipes" 
          element={
            <>
              <Navbar isRecipeSubmission={false} />
              <Recipes />
            </>
          } 
        />
        <Route 
          path="/recipes/:id" 
          element={
            <>
              <Navbar isRecipeSubmission={false} />
              <RecipeDetails />
            </>
          } 
        />
        <Route 
          path="/register" 
          element={
            <>
              <Navbar isRecipeSubmission={false} />
              <Register />
            </>
          } 
        />
        <Route 
          path="/login" 
          element={
            <>
              <Navbar isRecipeSubmission={false} />
              <Login />
            </>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
