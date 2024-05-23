// templates/RecipeTemplate.js
export default class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  createRecipeCard() {
    const card = document.createElement("div");
    card.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md", "flex", "flex-col", "justify-between", "h-full", "transition", "duration-300", "ease-in-out", "transform", "hover:scale-105");

    const RecipeCard = `
      <div class="mb-4">
        <img src="public/images/assets/${this.recipe.image}" alt="${this.recipe.name}" class="w-full h-48 object-cover rounded-lg">
      </div>
      <h3 class="text-xl font-bold mb-2 truncate">${this.recipe.name}</h3>
      <div class="text-sm text-gray-600 mb-4 flex-grow">
        <h4 class="font-bold">Recette</h4>
        <p class="line-clamp-4">${this.recipe.description}</p>
      </div>
      <div class="text-sm text-gray-600 mb-4">
        <h4 class="font-bold">Ingrédients</h4>
        <ul class="list-disc list-inside">
          ${this.recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient} ${ingredient.quantity || ''} ${ingredient.unit || ''}</li>`).join("")}
        </ul>
      </div>
      <div class="text-sm text-gray-600">
        <p><span class="font-bold">Appareil:</span> ${this.recipe.appliance}</p>
        <p><span class="font-bold">Ustensiles:</span> ${this.recipe.ustensils.join(', ')}</p>
      </div>
    `;
    card.innerHTML = RecipeCard;
    return card;
  }
}
