import image from "./classes/image.js";

export default class RecipeFactory {
  constructor(data) {
    if (data.image) {
      return new image(data);
    } else {
      throw new Error("Invalid data");
    }
  }
}