import Recipes from "../../classes/recipes.js";
import Api from "../api/Api.js";
import RecipeCard from "../templates/main.js";

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

getRecipes();
