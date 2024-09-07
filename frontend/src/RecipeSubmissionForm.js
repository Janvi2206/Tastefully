import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./RecipeSubmissionForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const RecipeSubmissionForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [currentStep, setCurrentStep] = useState(1); // State to track the current step of the form
  const [formData, setFormData] = useState({ //formdata state variable is an object here that holds the data of recipe form
    recipeName: "",  //nested state is being update using the spread operator
    dishType: "",
    prepTime: "",
    shelfLife: "",
    difficulty: "",
    image: null,
    ingredients: "",
    description:"",
    directions: "",
  });

  // Handle input changes
  const handleChange = (e) => {  //this function is responsible for updating the formdata state whenever an input field value changes
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); //setFormData is a function provided by useState hook
  };

  // Handle image file upload
  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); //this property accesses the file collection of the input element
  };

  // Move to the next step in the form
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Move to the previous step in the form
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(); // Create a FormData object to send the data
    data.append("recipeName", formData.recipeName);
    data.append("dishType", formData.dishType);
    data.append("prepTime", formData.prepTime);
    data.append("shelfLife", formData.shelfLife);
    data.append("difficulty", formData.difficulty);
    data.append("image", formData.image); // Append the image file
    data.append("ingredients", formData.ingredients);
    data.append("description", formData.description);
    data.append("directions", formData.directions); // Ensure you use 'directions' if that's the expected field

    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    try {
      const response = await axios.post(  //using axios it is sending a post request to the backend
        "http://localhost:3000/api/recipes",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // content type is set which indicates that the request body contains form data
            Authorization: token, // Include the token in the Authorization header
          },
        }
      );
      console.log("Recipe submitted successfully:", response.data);
      navigate("/"); // Redirect to home page after successful submission
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  return (
    <div className="recipe-form-container">
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="translucent-container">
          {/* Step 1: Recipe Name */}
          {currentStep === 1 && (
            <div className="form-step">
              <label>Recipe Name</label>
              <input
                type="text"
                name="recipeName"
                value={formData.recipeName}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Step 2: Dish Type */}
          {currentStep === 2 && (
            <div className="form-step">
              <label>Dish Type</label>
              <input
                type="text"
                name="dishType"
                value={formData.dishType}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Step 3: Preparation Time */}
          {currentStep === 3 && (
            <div className="form-step">
              <label>Preparation Time (in minutes)</label>
              <input
                type="text"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Step 4: Shelf Life */}
          {currentStep === 4 && (
            <div className="form-step">
              <label>Shelf Life (in days)</label>
              <input
                type="text"
                name="shelfLife"
                value={formData.shelfLife}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Step 5: Difficulty */}
          {currentStep === 5 && (
            <div className="form-step">
              <label>Difficulty</label>
              <input
                type="text"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Step 6: Image Upload */}
          {currentStep === 6 && (
            <div className="form-step">
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
            </div>
          )}

          {/* Step 7: Ingredients */}
          {currentStep === 7 && (
            <div className="form-step">
              <label>Ingredients</label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {/* Step 8: Descriptions */}
          {currentStep === 8 && (
            <div className="form-step">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Step 9: Directions */}
          {currentStep === 9 && (
            <div className="form-step">
              <label>Directions</label>
              <textarea
                name="directions"
                value={formData.directions}
                onChange={handleChange}
                required
              />
              {/* Final submission button */}
            </div>
          )}
          <div className="navigation-container">
          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            )}
            {currentStep < 9 && (
              <button type="button" onClick={nextStep}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            )}
          </div>

          {/* Submit Button positioned below the navigation buttons */}
          {currentStep === 9 && (
            <div className="submit-container">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipeSubmissionForm;