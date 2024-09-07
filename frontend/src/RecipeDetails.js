import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './recipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  return (
    <div className="recipe-details-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : recipe ? (
        <div className="recipe-details">
          {recipe.image ? (
            <img src={`http://localhost:3000/${recipe.image}`} alt={recipe.recipeName} className="recipe-image" />
          ) : (
            <p>No image available</p>
          )}
          <h2>{recipe.recipeName}</h2>
          <p><strong>Dish Type:</strong> {recipe.dishType}</p>
          <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
          <p><strong>Shelf Life:</strong> {recipe.shelfLife}</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p><strong>Directions:</strong> {recipe.directions}</p>
          <p><strong>Submitted by:</strong> {recipe.username}</p>
        </div>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
};

export default RecipeDetails;
