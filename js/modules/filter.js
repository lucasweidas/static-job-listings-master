import { filterContainer, jobCards } from '../main.js';

export default class Filter {
  #filterCategories = document.querySelector('.filter-categories');
  #filteredCategories = [];

  addCategorieToFilter(button) {
    const categorie = this.getButtonCategorie(button);
    const isDuplicatedCategorie = this.#filteredCategories.includes(categorie);

    if (isDuplicatedCategorie) return;

    const iconDelete = document.querySelector('#delete-icon-template').content.cloneNode(true);
    const buttonClone = button.cloneNode(true);

    buttonClone.appendChild(iconDelete);
    this.#filterCategories.appendChild(buttonClone);
    jobCards.classList.remove('filter-off');
    filterContainer.classList.remove('hidden');
    this.#filteredCategories.push(categorie);
    this.filterJobCards(categorie);
  }

  removeCategorieFromFilter(button) {
    const categorie = this.getButtonCategorie(button);
    const categorieIndex = this.#filteredCategories.indexOf(categorie);

    this.#filterCategories.removeChild(button);
    this.#filteredCategories.splice(categorieIndex, 1);
    if (this.#filteredCategories.length) {
      return this.updateFilteredCategories();
    }
    this.resetFilteredCategories();
  }

  filterJobCards(categorie) {
    const cards = this.getCards();

    cards.forEach(card => {
      const button = card.querySelector(`[data-categorie='${categorie}']`);
      if (!button) return card.classList.add('hidden');
    });
  }

  getButtonCategorie(button) {
    return button.dataset.categorie;
  }

  getCards() {
    return [...document.querySelectorAll('.card')];
  }

  updateFilteredCategories() {
    const cards = this.getCards();

    cards.forEach(card => {
      const categoriesCount = this.#filteredCategories.reduce((result, categorie) => {
        const button = card.querySelector(`[data-categorie='${categorie}']`);
        return button ? ++result : result;
      }, 0);

      if (categoriesCount === this.#filteredCategories.length) {
        return card.classList.remove('hidden');
      }

      card.classList.add('hidden');
    });
  }

  resetFilteredCategories() {
    const cards = this.getCards();

    cards.forEach(card => card.classList.remove('hidden'));

    this.#filterCategories.innerHTML = '';
    this.#filteredCategories.length = 0;
    jobCards.classList.add('filter-off');
    filterContainer.classList.add('hidden');
  }
}
