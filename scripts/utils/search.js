// search.js
import { normalizeText } from '../utils/normalize.js';
import { displayRecipes, updateRecipeCount } from "../utils/tag.js";

let allRecipes = [];
export const selectedTags = [];
export let currentSearchQuery = "";
export let dropdowns = [];

export const filterRecipes = (query = currentSearchQuery, tags = selectedTags) => {
  query = normalizeText(query);
  const filteredBySearch = allRecipes.filter((recipe) => {
    return (
      normalizeText(recipe.name).includes(query) ||
      recipe.ingredients.some((ingredient) =>
        normalizeText(ingredient.ingredient).includes(query)
      ) ||
      normalizeText(recipe.description).includes(query)
    );
  });
  const filteredByTags =
    tags.length === 0
      ? filteredBySearch
      : filteredBySearch.filter((recipe) => {
          return tags.every((tag) => {
            return (
              recipe.ingredients.some((ingredient) =>
                normalizeText(ingredient.ingredient).includes(
                  normalizeText(tag)
                )
              ) ||
              normalizeText(recipe.ustensils.join(" ")).includes(
                normalizeText(tag)
              ) ||
              normalizeText(recipe.appliance).includes(normalizeText(tag))
            );
          });
        });

  displayRecipes(filteredByTags);
  updateDropdowns(filteredByTags);
  updateRecipeCount(filteredByTags.length);
};

export const setAllRecipes = (recipes) => {
  allRecipes = recipes;
};

export const updateDropdowns = (filteredRecipes) => {
  const dropdownTypes = ["Ingrédients", "Ustensiles", "Appareils"];

  dropdownTypes.forEach((type, index) => {
    let items;
    switch (type) {
      case "Ingrédients":
        items = filteredRecipes.flatMap((recipe) =>
          recipe.ingredients.map((i) => i.ingredient)
        );
        break;
      case "Ustensiles":
        items = filteredRecipes.flatMap((recipe) => recipe.ustensils);
        break;
      case "Appareils":
        items = filteredRecipes.map((recipe) => recipe.appliance);
        break;
    }
    dropdowns[index].updateItems([...new Set(items)]);
  });
};