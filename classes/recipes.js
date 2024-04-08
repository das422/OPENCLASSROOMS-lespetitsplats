export default class Recipes{
  constructor(data) {
    this.id = data.id;
    this.image = data.image;
    this.name = data.name;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
  }
}