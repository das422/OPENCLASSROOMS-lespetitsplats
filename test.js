export default class Dropdown {
  constructor(name, items) {
      this.name = name;
      this.items = items;
      this.filteredItems = [];
      this.itemList = null;
  }

  createDropdown() {
      const dropdownContent = `
              <div class="dropdown | rounded-md cursor-pointer relative bg-white w-full items-center justify-center flex h-14 flex-col "> 
                  <button class="dropdown_btn | w-full  justify-between  inline-flex gap-5 items-center" type="button">
                      <span>${this.name}</span>
                      <span class="fa-solid fa-chevron-down" aria-hidden="true"></span>
                  </button>

                  <div class="dropdown_content | hidden absolute bg-white rounded-b-md max-w-full  z-20 top-14 py-2 overflow-y-scroll">
                      <div class=" flex outline outline-1 mx-2">
                          <input  class="w-full" tabindex="-1" type="text" id="search-${this.name}" maxlength="12">
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
                      <ul class="dropdown_content_list | m-2">
                          ${this.items.map(item => `<li>${item}</li>`).join('')}
                      </ul>
                  </div>
              </div>                          
      `;
      const dropdownWrapper = document.createElement('div');
      dropdownWrapper.setAttribute('class', 'dropdown_wrapper');
      dropdownWrapper.innerHTML = dropdownContent;

      const inputElement = dropdownWrapper.querySelector(`#search-${this.name}`);
      this.itemList = dropdownWrapper.querySelectorAll('.dropdown_content_list li');

      inputElement.addEventListener('input', () => {
          this.search(normalizeString(inputElement.value));
          this.toggleDeleteBtn(inputElement);
      });

      this.tagHandler(inputElement);

      return dropdownWrapper;
  }

  updateItems(filteredItems, _inputValue, match) {
      this.filteredItems = filteredItems;

      this.itemList.forEach(item => item.style.display = 'none');

      let items = match ? match : this.filteredItems;

      items.forEach(itemText => {
          const itemElement = [...this.itemList].find(item => normalizeString(item.textContent) === normalizeString(itemText));
          if (itemElement)
              itemElement.style.display = 'block';
      });
  }

  search(inputValue) {
      const itemsToSearch = !this.filteredItems.length ? this.items : this.filteredItems;

      const match = itemsToSearch.filter(item => {
          const normalizedItem = normalizeString(item);
          return normalizedItem.includes(inputValue);
      });

      this.updateItems(this.filteredItems, inputValue, match)
  }

  resetItemList() {
      this.itemList.forEach(item => item.style.display = 'block');
      this.filteredItems = [];
  }

  toggleDeleteBtn(inputElement) {
      const btnDelete = inputElement.nextElementSibling;
      const inputValue = inputElement.value;
      inputValue.length > 0 ? btnDelete.style.display = 'block' : btnDelete.style.display = 'none';

      btnDelete.addEventListener('click', () => {
          inputElement.value = '';
          btnDelete.style.display = 'none';

          const itemsToReset = !this.filteredItems.length ? this.items : this.filteredItems;
          this.updateItems(itemsToReset, inputValue, null);
      });
  }

  tagHandler(inputElement) {
      this.itemList.forEach(item => {
          item.addEventListener('click', () => {
              this.addTag(item.textContent)
              inputElement.value = '';
          }); 
          item.addEventListener('keydown', e => { 
              if (e.key === 'Enter') this.addTag(item.textContent) 
              inputElement.value = '';
          });
      });
  }

  addTag(tagText) {
      if(!selectedTags.includes(tagText)) {
          const tag = new Tag(tagText);
          tag.createTag();
          selectedTags.push(tagText);
      }  
      filterRecipesByTags(currentRecipes, selectedTags);
  }
}