import RecipeCard from '../templates/RecipeTemplate.js';


  export default class Tag {
    constructor(tagText) {
      this.tagText = tagText;
    }
  
    createTag() {
      const tagSection = document.querySelector('.tag_section');
      const tagElement = document.createElement('span');
      tagElement.classList.add('tag');
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
        return recipe.ingredients.some(ingredient => ingredient.ingredient.includes(tag)) ||
               recipe.ustensils.includes(tag) ||
               recipe.appliance.includes(tag);
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
  recipes.forEach((recipe) => {
    const recipeCard = new RecipeCard(recipe);
    const card = recipeCard.createRecipeCard();
    recipesSection.appendChild(card);
  });
};
