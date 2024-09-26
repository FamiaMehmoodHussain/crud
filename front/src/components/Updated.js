
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';
import './UpdateRecipe.css'; // Import your custom CSS file

export default function UpdateRecipe() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [progress, setProgress] = useState(0);
  const [id, setID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setID(localStorage.getItem('ID'));
    setRecipeName(localStorage.getItem('Recipe Name'));
    setIngredients(localStorage.getItem('Ingredients'));
    setInstructions(localStorage.getItem('Instructions'));
  }, []);

  const updateAPIData = () => {
    setProgress(30); // Start loading progress

    axios.put(`http://localhost:3000/recipes/${id}`, { // Update to your actual endpoint
      recipeName,
      ingredients,
      instructions,
    })
    .then(() => {
      setProgress(100); // Set the progress to 100 after successful update
      navigate('/recipes'); // Redirect to the recipes list
    })
    .catch((error) => {
      console.error('Error updating recipe:', error);
      setProgress(0); // Reset progress on error
    });
  };

  const handleButtonClick = () => {
    if (!recipeName || !ingredients || !instructions) {
      return; // Ensure all fields are filled
    }
    updateAPIData(); // Call the update function
  };

  return (
    <div className="update-recipe-container">
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Form className="update-form">
        <Form.Field>
          <label>Recipe Name</label>
          <input
            placeholder='Recipe Name'
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Ingredients</label>
          <textarea
            placeholder='List ingredients here...'
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Instructions</label>
          <textarea
            placeholder='Cooking instructions...'
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </Form.Field>
        <Button type='button' onClick={handleButtonClick}>Update Recipe</Button>
      </Form>
    </div>
  );
}
