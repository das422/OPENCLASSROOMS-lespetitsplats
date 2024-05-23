// tag.js
import RecipeCard from '../templates/RecipeTemplate.js';
import { normalizeText } from '../utils/normalize.js';

export default class Tag {
  constructor(tagText) {
    this.tagText = tagText;
  }

  createTag() {
    const tagSection = document.querySelector('.tag_section');
    const tagElement = document.createElement('span');
    tagElement.classList.add('bg-blue-500', 'text-white', 'px-3', 'py-1', 'rounded-full', 'inline-flex', 'items-center', 'm-1');
    tagElement.textContent = this.tagText;
    tagSection.appendChild(tagElement);

    tagElement.addEventListener('click', () => {
      tagElement.remove();
      const index = selectedTags.indexOf(this.tagText);
      if (index > -1) {
        selectedTags.splice(index, 1);
      }
      filterRecipesByTags(selectedTags);
    });
  }
}

export const selectedTags = [];

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

  displayRecipes(filtered);
};

let allRecipes = [];

export const setAllRecipes = (recipes) => {
  allRecipes = recipes;
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
