import Api from "../api/Api.js";
import RecipeCard from "../templates/RecipeTemplate.js";
import Dropdown from '../templates/dropdown.js';

const recipesSection = document.querySelector(".recipes-section");
const recipesApi = new Api("./data/recipe.json");



const getRecipes = async () => {
  const recipesData = await recipesApi.get();
  const recipes = recipesData.recipes;
  console.log(recipes);
  
  recipes.forEach((recipe) => {
    const recipeCard = new RecipeCard(recipe);
    const card = recipeCard.createRecipeCard();
    recipesSection.appendChild(card);
  });
};


const dropdown = document.querySelector(".filter_section");

const getDropdown = async () => {
  const dropdownData = await recipesApi.get();
  console.log('dropdownData:', dropdownData);  // Add this line
  const dropdownItems = dropdownData.recipes;

  const dropdownTypes = ['Ingrédients', 'Ustensiles', 'Appareils'];

  dropdownTypes.map(type => {
    let items;
    switch(type) {
      case 'Ingrédients':
        items = dropdownItems.flatMap(recipe => recipe.ingredients);
        break;
      case 'Ustensiles':
        items = dropdownItems.flatMap(recipe => recipe.ustensils);
        break;
      case 'Appareils':
        items = dropdownItems.map(recipe => recipe.appliance);
        break;
    }
    console.log(`items for ${type}:`, items);  // Add this line
    const dropdownType = new Dropdown(items, type);
    const dropdownElement = dropdownType.createDropdown();
    dropdown.appendChild(dropdownElement);
  });
}





getDropdown();


getRecipes();

