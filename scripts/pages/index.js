// Import necessary modules
import Api from "../api/Api.js";
import RecipeCard from "../templates/RecipeTemplate.js";
import Dropdown from '../templates/dropdown.js'; // Adjust the path if necessary

export let selectedTags = [];
let allRecipes = [];

const recipesSection = document.querySelector(".recipes-section");
const recipesApi = new Api("./data/recipe.json");

export const setAllRecipes = (recipes) => {
  allRecipes = recipes;
};

export const displayRecipes = (recipes) => {
  recipesSection.innerHTML = '';
  recipes.forEach((recipe) => {
    const recipeCard = new RecipeCard(recipe);
    const card = recipeCard.createRecipeCard();
    recipesSection.appendChild(card);
  });
};

export const filterRecipesByTags = (tags) => {
  let filtered = allRecipes;

  if (tags.length > 0) {
    filtered = allRecipes.filter(recipe => {
      return tags.every(tag => {
        return recipe.ingredients.some(ingredient => ingredient.ingredient.includes(tag)) ||
               recipe.ustensils.includes(tag) ||
               recipe.appliance.includes(tag);
      });
    });
  }

  displayRecipes(filtered);
};

const filterRecipes = (query) => {
  query = query.toLowerCase();
  const filteredRecipes = allRecipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(query) ||
      recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query)) ||
      recipe.description.toLowerCase().includes(query);
  });
  displayRecipes(filteredRecipes);
};

const getRecipes = async () => {
  try {
    const recipesData = await recipesApi.get();
    allRecipes = recipesData.recipes;
    setAllRecipes(allRecipes);
    displayRecipes(allRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
};

document.getElementById('search-recipe').addEventListener('input', (event) => {
  const query = event.target.value;
  filterRecipes(query);
});

const getDropdown = async () => {
  try {
    const dropdownData = await recipesApi.get();
    const dropdownItems = dropdownData.recipes;
    const dropdownTypes = ['Ingrédients', 'Ustensiles', 'Appareils'];

    dropdownTypes.forEach(type => {
      let items;
      switch(type) {
        case 'Ingrédients':
          items = dropdownItems.flatMap(recipe => recipe.ingredients.map(i => i.ingredient));
          break;
        case 'Ustensiles':
          items = dropdownItems.flatMap(recipe => recipe.ustensils);
          break;
        case 'Appareils':
          items = dropdownItems.map(recipe => recipe.appliance);
          break;
      }
      const dropdownType = new Dropdown([...new Set(items)], type);
      const dropdownElement = dropdownType.createDropdown();
      document.querySelector('.filter_section').appendChild(dropdownElement);
    });
  } catch (error) {
    console.error('Error fetching dropdown items:', error);
  }
}

getDropdown();
getRecipes();