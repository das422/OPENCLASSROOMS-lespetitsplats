// search.js
import { normalizeText } from '../utils/normalize.js';
import { displayRecipes, selectedTags, updateRecipeCount, updateDropdowns as updateDropdownsExternal } from "../utils/tag.js";

let allRecipes = [];
export let currentSearchQuery = "";

export const setAllRecipes = (recipes) => {
  allRecipes = recipes;
};

// Binary search function
export const binarySearch = (sortedRecipes, searchText) => {
  let left = 0;
  let right = sortedRecipes.length - 1;
  const normalizedSearchText = normalizeText(searchText);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = normalizeText(sortedRecipes[mid].name);

    if (midValue.includes(normalizedSearchText)) {
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
                normalizeText(ingredient.ingredient).includes(normalizeText(tag))
              ) ||
              normalizeText(recipe.ustensils.join(" ")).includes(normalizeText(tag)) ||
              normalizeText(recipe.appliance).includes(normalizeText(tag))
            );
          });
        });

  const finalFilteredBySearch = query.length >= 3 ? binarySearch(filteredByTags, query) : filteredByTags;

  displayRecipes(finalFilteredBySearch);
  updateDropdowns(finalFilteredBySearch);
  updateRecipeCount(finalFilteredBySearch.length);
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
    updateDropdownsExternal(index, [...new Set(items)]);
  });
};