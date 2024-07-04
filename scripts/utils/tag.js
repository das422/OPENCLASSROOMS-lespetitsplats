import RecipeCard from "../templates/RecipeTemplate.js";
import { normalizeText } from "../utils/normalize.js";
import { filterRecipes, updateRecipeCount } from "../pages/index.js"; 
import { updateDropdowns } from "../pages/index.js";

export default class Tag {
  constructor(tagText) {
    this.tagText = tagText;
  }

  createTag() {
    const tagSection = document.querySelector(".tag_section");
    const tagElement = document.createElement("div");
    tagElement.classList.add(
      "flex",
      "items-center",
      "bg-yellow-400",
      "text-black",
      "px-3",
      "py-1",
      "rounded-full",
      "m-1",
      "shadow-md"
    );

    const tagTextElement = document.createElement("span");
    tagTextElement.classList.add("mr-2");
    tagTextElement.textContent = this.tagText;

    const removeIcon = document.createElement("span");
    removeIcon.classList.add("cursor-pointer");
    removeIcon.innerHTML = "&times;"; 

    removeIcon.addEventListener("click", () => {

      tagElement.remove();
      const index = selectedTags.indexOf(this.tagText);
      if (index > -1) {
        selectedTags.splice(index, 1);
      }
      filterRecipes(); 
    });

    tagElement.appendChild(tagTextElement);
    tagElement.appendChild(removeIcon);
    tagSection.appendChild(tagElement);
  }
}

export const selectedTags = [];
let allRecipes = [];

export const filterRecipesByTags = (tags) => {
  let filtered = allRecipes;

  if (tags.length > 0) {
    filtered = allRecipes.filter((recipe) => {

      return tags.every((tag) => {

        return (
          recipe.ingredients.some((ingredient) =>
            normalizeText(ingredient.ingredient).includes(normalizeText(tag))
          ) ||
          normalizeText(recipe.ustensils.join(" ")).includes(
            normalizeText(tag)
          ) ||
          normalizeText(recipe.appliance).includes(normalizeText(tag))
        );
      });
    });
  }

  displayRecipes(filtered);
  updateRecipeCount(filtered.length);
  updateDropdowns(filtered);
};

export const setAllRecipes = (recipes) => {
  allRecipes = recipes;
};

export const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector(".recipes-section");
  recipesSection.innerHTML = "";

  if (recipes.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent =
      "Aucune recette ne correspond à votre recherche.";
    noResultsMessage.classList.add("text-center", "text-gray-500", "mt-4");
    recipesSection.appendChild(noResultsMessage);
  } else {
    recipes.forEach((recipe) => {
      const recipeCard = new RecipeCard(recipe);
      const card = recipeCard.createRecipeCard();
      recipesSection.appendChild(card);
    });
  }
};