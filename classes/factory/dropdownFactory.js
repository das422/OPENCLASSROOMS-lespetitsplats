// // Parse the JSON file
// export const recipes = JSON.parse(recipes);

// // Extract unique ingredients, appliances, and utensils
// const ingredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))];
// const appliances = [...new Set(recipes.map(recipe => recipe.appliance))];
// const utensils = [...new Set(recipes.flatMap(recipe => recipe.ustensils))];

// // Create the dropdown menus
// const factory = new DropdownFactory();
// const ingredientsDropdown = factory.createDropdown(ingredients);
// const appliancesDropdown = factory.createDropdown(appliances);
// const utensilsDropdown = factory.createDropdown(utensils);

// // Add event listeners to the dropdown menus
// ingredientsDropdown.addEventListener('change', filterRecipes);
// appliancesDropdown.addEventListener('change', filterRecipes);
// utensilsDropdown.addEventListener('change', filterRecipes);

// // Append the dropdown menus to the body
// document.body.appendChild(ingredientsDropdown);
// document.body.appendChild(appliancesDropdown);
// document.body.appendChild(utensilsDropdown);

// export function filterRecipes() {
//   const selectedIngredient = ingredientsDropdown.value;
//   const selectedAppliance = appliancesDropdown.value;
//   const selectedUtensil = utensilsDropdown.value;

//   const filteredRecipes = recipes.filter(recipe => {
//     const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient);
//     const recipeAppliance = recipe.appliance;
//     const recipeUtensils = recipe.ustensils;

//     return recipeIngredients.includes(selectedIngredient) &&
//            recipeAppliance === selectedAppliance &&
//            recipeUtensils.includes(selectedUtensil);
//   });

//   // Update the displayed recipes
//   updateRecipes(filteredRecipes);
// }

// export function updateRecipes(recipes) {
//   // Clear the current recipes
//   const recipeContainer = document.querySelector('#recipe-container');
//   recipeContainer.innerHTML = '';

//   // Add the filtered recipes
//   for (const recipe of recipes) {
//     const recipeElement = document.createElement('div');
//     recipeElement.textContent = recipe.name;
//     recipeContainer.appendChild(recipeElement);
//   }
// }