import Recipes from "./classes/recipes.js";

export default class Image extends Recipes{
  constructor(data) {
      super(data);
      this.image = data.image;
  }
}
