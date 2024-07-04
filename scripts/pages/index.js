import Api from "../api/Api.js";
import Dropdown from "../templates/dropdown.js";
import { setAllRecipes, displayRecipes, selectedTags } from "../utils/tag.js";
import { normalizeText } from "../utils/normalize.js";

let allRecipes = [];
let dropdowns = [];
let currentSearchQuery = "";

const recipeCountElement = document.getElementById("recipe-count");
const recipesApi = new Api("./data/recipe.json");

export const filterRecipes = (
  query = currentSearchQuery,
  tags = selectedTags
) => {
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

const getRecipes = async () => {
  try {
    const recipesData = await recipesApi.get();
    allRecipes = recipesData.recipes;
    setAllRecipes(allRecipes);
    displayRecipes(allRecipes);
    updateRecipeCount(allRecipes.length);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

document.getElementById("search-recipe").addEventListener("input", (event) => {
  currentSearchQuery = event.target.value;
  filterRecipes(currentSearchQuery);
});

const getDropdown = async () => {
  try {
    const dropdownData = await recipesApi.get();
    const dropdownItems = dropdownData.recipes;
    const dropdownTypes = ["Ingrédients", "Ustensiles", "Appareils"];

    dropdownTypes.forEach((type) => {
      let items;
      switch (type) {
        case "Ingrédients":
          items = dropdownItems.flatMap((recipe) =>
            recipe.ingredients.map((i) => i.ingredient)
          );
          break;
        case "Ustensiles":
          items = dropdownItems.flatMap((recipe) => recipe.ustensils);
          break;
        case "Appareils":
          items = dropdownItems.map((recipe) => recipe.appliance);
          break;
      }
      const dropdownType = new Dropdown([...new Set(items)], type);
      const dropdownElement = dropdownType.createDropdown();
      document.querySelector(".filter_section").appendChild(dropdownElement);
      dropdowns.push(dropdownType);
    });
  } catch (error) {
    console.error("Error fetching dropdown items:", error);
  }
};

export const updateRecipeCount = (count) => {
  recipeCountElement.textContent = `${count} recette(s) trouvée(s)`;
};

getDropdown();
getRecipes();