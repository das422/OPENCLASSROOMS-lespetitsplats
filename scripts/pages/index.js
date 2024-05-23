// index.js
import Api from "../api/Api.js";
import RecipeCard from "../templates/RecipeTemplate.js";
import Dropdown from '../templates/dropdown.js';
import { setAllRecipes, displayRecipes, filterRecipesByTags, selectedTags } from '../utils/tag.js';
import { normalizeText } from '../utils/normalize.js';

let allRecipes = [];

const recipesSection = document.querySelector(".recipes-section");
const recipesApi = new Api("./data/recipe.json");

const filterRecipes = (query) => {
  query = normalizeText(query);
  const filteredRecipes = allRecipes.filter(recipe => {
    return normalizeText(recipe.name).includes(query) ||
      recipe.ingredients.some(ingredient => normalizeText(ingredient.ingredient).includes(query)) ||
      normalizeText(recipe.description).includes(query);
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
