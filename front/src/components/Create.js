// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Checkbox, Form } from 'semantic-ui-react';
// import LoadingBar from 'react-top-loading-bar';
// import axios from 'axios';

// export default function Create() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [checkbox, setCheckbox] = useState(false);
//   const [progress, setProgress] = useState(0)
//   let history = useNavigate();

//   const postData = () => {
//     axios.post('https://63b7b2474f17e3a931da1e08.mockapi.io/fakeData', {
//       firstName,
//       lastName,
//       checkbox,
//     }).then(() => {
//       history('/read');
//     })
//   }

//   const handleButtonClick = () => {
//     if (!checkbox) {
//       return;
//     }
//     postData();   // Call the postData function
//     setProgress(100); // Set the progress to 100
//   }

//   return (
//     <div>
//       <LoadingBar
//         color='#f11946'
//         progress={progress}
//         onLoaderFinished={() => setProgress(100)}
//       />
//       <Form className="create-form">
//         <Form.Field>
//           <label>First Name</label>
//           <input
//             placeholder='First Name'
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </Form.Field>
//         <Form.Field>
//           <label>Last Name</label>
//           <input
//             placeholder='Last Name'
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </Form.Field>
//         <Form.Field>
//           <Checkbox
//             label='I agree to the Terms and Conditions'
//             onChange={(e) => setCheckbox(!checkbox)}
//             checked={checkbox}
//           />
//         </Form.Field>
//         <Button
//           type='submit'
//           onClick={handleButtonClick}
//           disabled={!checkbox}
//         >
//           Submit
//         </Button>
//       </Form>
//     </div>
//   )
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';
import './CreateRecipe.css'; // Import your custom CSS file

export default function CreateRecipe() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const postData = () => {
    axios.post('https://your-api-endpoint.com/recipes', {
      recipeName,
      ingredients,
      instructions,
      checkbox,
    }).then(() => {
      navigate('/recipes');
    });
  };

  const handleButtonClick = () => {
    if (!checkbox) {
      return;
    }
    setProgress(100);
    postData();
  };

  return (
    <div className="create-recipe-container">
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Form className="create-form">
        <Form.Field>
          <label>Recipe Name</label>
          <input
            placeholder='Recipe Name'
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Ingredients</label>
          <textarea
            placeholder='List ingredients here...'
            onChange={(e) => setIngredients(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Instructions</label>
          <textarea
            placeholder='Cooking instructions...'
            onChange={(e) => setInstructions(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label='I agree to the Terms and Conditions'
            onChange={() => setCheckbox(!checkbox)}
            checked={checkbox}
          />
        </Form.Field>
        <Button
          type='submit'
          onClick={handleButtonClick}
          disabled={!checkbox}
        >
          Submit Recipe
        </Button>
      </Form>
    </div>
  );
}
