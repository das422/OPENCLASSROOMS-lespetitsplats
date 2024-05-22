export default class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  createRecipeCard() {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    const RecipeCard = `

    <div class="recipe-card-image space-y-4">
      <img src="public/images/assets/${this.recipe.image}" alt="${
      this.recipe.name
    }" class="aspect-square w-full">
    </div>

    <h3 class="font-bold">${this.recipe.name}</h3>
    <div class="recipe-card-content space-y-5 w-full line-clamp-5 text-clip">

     <h4 class="text-muted uppercase text-sm">recette</h4>
      <p class=""> ${this.recipe.description}</p>
    </div>
     <p>Ingredients</p>
      <ul class="grid grid-cols-3">
      
        ${this.recipe.ingredients
          .map(
            (ingredient) => `
          <li>${ingredient.ingredient}</li>
          <li>${ingredient.quantity}</li>`
          )
          .join("")}
      </ul>
    </div>

   `;
    card.innerHTML = RecipeCard;
    return card;
  }
}
