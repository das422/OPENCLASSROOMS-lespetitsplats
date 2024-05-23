// utils/tag.js
import RecipeCard from '../templates/RecipeTemplate.js';
import { normalizeText } from '../utils/normalize.js';

// Binary search function
const binarySearch = (sortedRecipes, searchText) => {
  let left = 0;
  let right = sortedRecipes.length - 1;
  const normalizedSearchText = normalizeText(searchText);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = normalizeText(sortedRecipes[mid].name);

    if (midValue.includes(normalizedSearchText)) {
      // Find all recipes that match the search text
      let start = mid;
      while (start > left && normalizeText(sortedRecipes[start - 1].name).includes(normalizedSearchText)) {
        start--;
      }

      let end = mid;
      while (end < right && normalizeText(sortedRecipes[end + 1].name).includes(normalizedSearchText)) {
        end++;
      }

      return sortedRecipes.slice(start, end + 1);
    } else if (midValue < normalizedSearchText) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return [];
};

// Sort recipes by normalized title
const sortRecipesByTitle = (recipes) => {
  return recipes.sort((a, b) => {
    const titleA = normalizeText(a.name);
    const titleB = normalizeText(b.name);
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  });
};

export default class Tag {
  constructor(tagText) {
    this.tagText = tagText;
  }

  createTag() {
    const tagSection = document.querySelector('.tag_section');
    const tagElement = document.createElement('div');
    tagElement.classList.add('flex', 'items-center', 'bg-yellow-400', 'text-black', 'px-3', 'py-1', 'rounded-full', 'm-1', 'shadow-md');

    const tagTextElement = document.createElement('span');
    tagTextElement.classList.add('mr-2');
    tagTextElement.textContent = this.tagText;

    const removeIcon = document.createElement('span');
    removeIcon.classList.add('cursor-pointer');
    removeIcon.innerHTML = '&times;'; // Using the multiplication sign as an "X"

    removeIcon.addEventListener('click', () => {
      tagElement.remove();
      const index = selectedTags.indexOf(this.tagText);
      if (index > -1) {
        selectedTags.splice(index, 1);
      }
      filterRecipesByTags(selectedTags);
    });

    tagElement.appendChild(tagTextElement);
    tagElement.appendChild(removeIcon);
    tagSection.appendChild(tagElement);
  }
}

export const selectedTags = [];
let allRecipes = [];

export const setAllRecipes = (recipes) => {
  allRecipes = recipes;
};

export const filterRecipesByTags = (tags) => {
  let filtered = allRecipes;

  if (tags.length > 0) {
    filtered = allRecipes.filter(recipe => {
      return tags.every(tag => {
        return recipe.ingredients.some(ingredient => normalizeText(ingredient.ingredient).includes(normalizeText(tag))) ||
               normalizeText(recipe.ustensils.join(' ')).includes(normalizeText(tag)) ||
               normalizeText(recipe.appliance).includes(normalizeText(tag));
      });
    });
  }

  // Sort and then perform binary search on filtered recipes
  const sortedRecipes = sortRecipesByTitle(filtered);
  const searchText = document.querySelector('#search-recipe').value;

  if (searchText.length >= 3) {
    const searchResults = binarySearch(sortedRecipes, searchText);
    displayRecipes(searchResults);
  } else {
    displayRecipes(filtered);
  }
};

export const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector(".recipes-section");
  recipesSection.innerHTML = '';

  if (recipes.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = "Aucune recette ne correspond à votre recherche.";
    noResultsMessage.classList.add('text-center', 'text-gray-500', 'mt-4');
    recipesSection.appendChild(noResultsMessage);
  } else {
    recipes.forEach((recipe) => {
      const recipeCard = new RecipeCard(recipe);
      const card = recipeCard.createRecipeCard();
      recipesSection.appendChild(card);
    });
  }
};

export { binarySearch, sortRecipesByTitle };
