import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './recipes.css';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recipes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length > 0 ? (
        <div className="recipe-list">
          {recipes.map(recipe => (
            <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="recipe-link">
              <div className="recipe-card">
                {recipe.image ? (
                  <img src={`http://localhost:3000/${recipe.image}`} alt={recipe.recipeName} className="recipe-image" />
                ) : (
                  <p>No image available</p>
                )}
                <h2 className="recipe-title">{recipe.recipeName}</h2>
                <p className="recipe-description">{recipe.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default Recipes;
