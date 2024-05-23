export default class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  createRecipeCard() {
    const card = document.createElement("div");
    card.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md");

    const RecipeCard = `
      <div class="mb-4">
        <img src="public/images/assets/${this.recipe.image}" alt="${this.recipe.name}" class="w-full h-48 object-cover rounded-lg">
      </div>
      <h3 class="text-xl font-bold mb-2">${this.recipe.name}</h3>
      <div class="text-sm text-gray-600 mb-4">
        <h4 class="font-bold">Recette</h4>
        <p>${this.recipe.description}</p>
      </div>
      <p class="font-bold">Ingrédients</p>
      <ul class="list-disc list-inside">
        ${this.recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient} ${ingredient.quantity || ''}</li>`).join("")}
      </ul>
    `;
    card.innerHTML = RecipeCard;
    return card;
  }
}
