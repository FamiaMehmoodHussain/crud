// import React, { useEffect, useState } from 'react';
// import { Button, Table } from 'semantic-ui-react'
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// export default function Read() {
//   const [APIData, setAPIData] = useState([]);

//   useEffect(() => {
//     axios.get('https://63b7b2474f17e3a931da1e08.mockapi.io/fakeData')
//       .then((response) => {
//         setAPIData(response.data);
//       })
//   }, [])

//   const setData = (data) => {
//     let { id, firstName, lastName, checkbox } = data;
//     localStorage.setItem('ID', id);
//     localStorage.setItem('First Name', firstName);
//     localStorage.setItem('Last Name', lastName);
//     localStorage.setItem('Checkbox Value', checkbox)
//   }

//   const onDelete = (id) => {
//     axios.delete(`https://63b7b2474f17e3a931da1e08.mockapi.io/fakeData/${id}`)
//     .then(() => {
//       getData();
//     })
//   }

//   const getData = () => {
//     axios.get(`https://63b7b2474f17e3a931da1e08.mockapi.io/fakeData`)
//       .then((getData) => {
//         setAPIData(getData.data);
//       })
//   }

//   return (
//     <div>
//       <Table singleLine>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell>First Name</Table.HeaderCell>
//             <Table.HeaderCell>Last Name</Table.HeaderCell>
//             <Table.HeaderCell>Checked</Table.HeaderCell>
//             <Table.HeaderCell>Update</Table.HeaderCell>
//             <Table.HeaderCell>Delete</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {APIData.map((data) => {
//             return (
//               <Table.Row>
//                 <Table.Cell>{data.firstName}</Table.Cell>
//                 <Table.Cell>{data.lastName}</Table.Cell>
//                 <Table.Cell>{data.checkbox ? 'checkbox' : 'Unchecked'}</Table.Cell>
//                 <Link to='/update'>
//                   <Table.Cell>
//                     <Button onClick={() => setData(data)}>Update</Button>
//                   </Table.Cell>
//                 </Link>
//                 <Table.Cell>
//                   <Button onClick={() => onDelete(data.id)}>Delete</Button>
//                 </Table.Cell>
//               </Table.Row>
//             )
//           })}
//         </Table.Body>
//       </Table>
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ReadRecipes.css'; // Import your custom CSS file

export default function ReadRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    axios.get('http://localhost:5000/recipes') // Update to your actual endpoint
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  };

  const setData = (recipe) => {
    const { id, recipeName, ingredients, instructions } = recipe;
    localStorage.setItem('ID', id);
    localStorage.setItem('Recipe Name', recipeName);
    localStorage.setItem('Ingredients', ingredients);
    localStorage.setItem('Instructions', instructions);
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:3000/recipes/${id}`) // Update to your actual endpoint
      .then(() => {
        fetchRecipes(); // Refresh the recipes list after deletion
      })
      .catch((error) => {
        console.error('Error deleting recipe:', error);
      });
  };

  return (
    <div className="read-recipes-container">
      <div className="table-container">
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Recipe Name</Table.HeaderCell>
              <Table.HeaderCell>Ingredients</Table.HeaderCell>
              <Table.HeaderCell>Instructions</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {recipes.map((recipe) => {
              return (
                <Table.Row key={recipe.id}>
                  <Table.Cell>{recipe.recipeName}</Table.Cell>
                  <Table.Cell>{recipe.ingredients}</Table.Cell>
                  <Table.Cell>{recipe.instructions}</Table.Cell>
                  <Link to='/update'>
                    <Table.Cell>
                      <Button onClick={() => setData(recipe)}>Update</Button>
                    </Table.Cell>
                  </Link>
                  <Table.Cell>
                    <Button onClick={() => onDelete(recipe.id)}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}



