import Tag, { selectedTags, filterRecipesByTags } from "../utils/tag.js";

let currentlyOpenDropdown = null;

export default class Dropdown {
  constructor(items, name) {
    this.name = name;
    this.items = items;
  }

  createDropdown() {
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("relative", "w-full", "sm:w-auto", "mb-4");

    const dropdownContent = `
      <div class="dropdown w-full">
        <button type="button" class="dropdown_btn flex justify-between items-center w-full py-2 px-4 rounded-md gap-2 bg-white text-gray-800 border border-transparent focus:outline-none">
          <span>${this.name}</span>
          <span class="fa-solid fa-chevron-down"></span>
        </button>
        <div class="dropdown_content hidden absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <input type="text" id="search-${this.name}" class="p-2 w-full border-b border-gray-200" placeholder="Rechercher ${this.name}">
          <ul class="dropdown_content_list"></ul>
        </div>
      </div>
    `;

    dropdownContainer.innerHTML = dropdownContent;
    this.itemsList = dropdownContainer.querySelector(".dropdown_content_list");
    this.dropdown = dropdownContainer.querySelector(".dropdown");
    this.searchInput = dropdownContainer.querySelector(`#search-${this.name}`);
    this.dropdownBtn = dropdownContainer.querySelector(".dropdown_btn");
    this.dropdownContent = dropdownContainer.querySelector(".dropdown_content");

    this.populateItems(this.items);

    this.dropdownBtn.addEventListener("click", () => {
      if (currentlyOpenDropdown && currentlyOpenDropdown !== this) {
        currentlyOpenDropdown.closeDropdown();
      }
      this.dropdownContent.classList.toggle("hidden");
      currentlyOpenDropdown = this.dropdownContent.classList.contains("hidden")
        ? null
        : this;
    });

    this.searchInput.addEventListener("input", (event) => {
      this.filterItems(event.target.value);
    });

    return dropdownContainer;
  }

  populateItems(items) {
    this.itemsList.innerHTML = "";
    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add(
        "p-2",
        "cursor-pointer",
        "hover:bg-gray-100",
        "border-b",
        "border-gray-200"
      );
      listItem.textContent = item;
      this.itemsList.appendChild(listItem);

      listItem.addEventListener("click", () => {
        console.log(item);
        this.addTag(item);
        this.closeDropdown();
      });
    });
  }

  filterItems(query) {
    const filteredItems = this.items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    this.populateItems(filteredItems);
  }

  addTag(tagText) {
    if (!selectedTags.includes(tagText)) {
      const tag = new Tag(tagText);
      tag.createTag();
      selectedTags.push(tagText);
      filterRecipesByTags(selectedTags);
    }
  }

  closeDropdown() {
    this.dropdownContent.classList.add("hidden");
  }

  updateItems(newItems) {
    this.items = newItems;
    this.populateItems(newItems);
  }
}


// Binary search function
const binarySearch = (sortedRecipes, searchText) => {
  let left = 0;
  let right = sortedRecipes.length - 1;
  const normalizedSearchText = normalizeText(searchText);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = normalizeText(sortedRecipes[mid].name);

    if (midValue.includes(normalizedSearchText)) {
      // Find all recipes that match the search text
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