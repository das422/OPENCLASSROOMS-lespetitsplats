// create a dropdown menu

export default class Dropdown {
  constructor(items, name) {
    this.name = name;
    this.items = items;
    this.filteredItems = [];
    this.itemsList = null;
  }
  createDropdown() {
    const dropdownContainer = document.createElement("div");
    dropdownContainer.setAttribute(
      "class",
      " filter_section flex flex-row gap-5"
    );
    const listItems = this.items
      .map((item) => {
        if (this.name === "Ingrédients") {
          return `<li>${item.ingredient}</li>`;
        } else {
          return `<li>${item}</li>`;
        }
      })
      .join("");

    const dropdownContent = `
      <div class="dropdown | rounded-md cursor-pointer relative bg-white w-full items-center justify-center flex h-14 flex-col ">
        <button type="button" class="dropdown_btn w-full  justify-between  inline-flex gap-5 items-center px-5"> <span>${this.name}</span>
          <span class="fa-solid fa-chevron-down" aria-hidden="true"></span>
        </button>
  
        <div id="dropdown_content" class="hidden  h-[300px] absolute bg-white rounded-b-md w-full px-5 z-20 top-14 py-2 overflow-y-scroll">
          <div class=" flex outline outline-1 ">
            <input class="w-full" id="search-${this.name}" tabindex="0" type="text">
            <button tabindex="0">
              <svg fill="black" height="16px" width="16px" version="1.1" id="Capa_1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 490.4 490.4" xml:space="preserve">
                <g>
                  <path
                    d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796
      s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z
       M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z" />
                </g>
              </svg>
            </button>
            <label for="search-${this.name}" aria-label="Search by ${this.name}"></label>
          </div>
          <ul class="dropdown_content_list m-2">
          ${listItems}
          </ul>
        </div>
        
      </div>
      
    `;

    dropdownContainer.innerHTML = dropdownContent;
    this.itemsList = dropdownContainer.querySelector(".dropdown_content_list");
    this.dropdown = dropdownContainer;
    this.searchInput = dropdownContainer.querySelector(`#search-${this.name}`);
    this.dropdownBtn = dropdownContainer.querySelector(".dropdown_btn");
    this.dropdownContent = dropdownContainer.querySelector("#dropdown_content");
    this.dropdownBtn.addEventListener("click", () => {
      this.dropdownContent.classList.toggle("hidden");
    });
    const searchInput = dropdownContainer.querySelector(`#search-${this.name}`);
    searchInput.addEventListener("input", () =>
      this.filterItems(searchInput.value)
    );

    return dropdownContainer;
  }

  filterItems(query) {
    const lowerCaseQuery = query.toLowerCase();

    // Filter the items based on the user's input
    const filteredItems = this.items.filter((item) =>
      item.ingredient.toLowerCase().includes(lowerCaseQuery)
    );

    // Clear the current list items
    this.itemsList.innerHTML = "";

    // Add the filtered items to the dropdown
    filteredItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item.ingredient;
      this.itemsList.appendChild(listItem);

      // Add click event listener to each list item
      listItem.addEventListener("click", (event) => {
        this.addTag(event.target.textContent);

        // Close the dropdown
        this.dropdownContent.classList.add("hidden");
      });

      this.dropdownBtn.addEventListener("click", (event) => {
        // Close all dropdowns
        document.querySelectorAll("#dropdown_content").forEach((dropdown) => {
          dropdown.classList.add("hidden");
        });

        // Open the clicked dropdown
        this.dropdownContent.classList.toggle("hidden");

        // Stop propagation so the document click event doesn't immediately close the dropdown
        event.stopPropagation();
      });


    });
  }
  addTag(tagText) {
    if (!selectedTags.includes(tagText)) {
      const tag = new tag(tagText);
      tag.createTag();
      selectedTags.push(tagText);
    }
    filterRecipesByTags(currentRecipes, selectedTags);
  }
}
