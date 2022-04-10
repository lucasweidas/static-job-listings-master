import { filterContainer, jobCards } from '../main.js';

export default function Filter() {
  const filterCategories = document.querySelector('.filter-categories');
  const filteredCategories = [];

  return {
    addCategorieToFilter(button) {
      const categorie = button.dataset.categorie;
      if (this.isDuplicatedCategorie(categorie)) return;
      const deleteIcon = document.querySelector('#delete-icon-template').content.cloneNode(true);
      const buttonClone = button.cloneNode(true);

      buttonClone.appendChild(deleteIcon);
      filterCategories.appendChild(buttonClone);
      jobCards.classList.remove('filter-off');
      filterContainer.classList.remove('hidden');
      filteredCategories.push(categorie);
      this.filterJobCards(categorie);
    },
    removeCategorieFromFilter(button) {
      const categorie = button.dataset.categorie;
      const index = filteredCategories.indexOf(categorie);

      filterCategories.removeChild(button);
      filteredCategories.splice(index, 1);
      if (filteredCategories.length > 0) return this.updateFilteredCategories();
      this.resetFilteredCategories();
    },
    filterJobCards(categorie) {
      const cards = [...document.querySelectorAll('.card')];

      cards.forEach(card => {
        const button = card.querySelector(`[data-categorie='${categorie}']`);
        if (!button) return card.classList.add('hidden');
      });
    },
    isDuplicatedCategorie(categorie) {
      return filteredCategories.includes(categorie);
    },
    updateFilteredCategories() {
      const cards = [...document.querySelectorAll('.card')];

      cards.forEach(card => {
        const categoriesCount = filteredCategories.reduce((result, categorie) => {
          const button = card.querySelector(`[data-categorie='${categorie}']`);
          if (button) ++result;
          return result;
        }, 0);

        if (categoriesCount === filteredCategories.length) {
          return card.classList.remove('hidden');
        }
        card.classList.add('hidden');
      });
    },
    resetFilteredCategories() {
      const cards = [...document.querySelectorAll('.card')];

      cards.forEach(card => card.classList.remove('hidden'));
      filterCategories.innerHTML = '';
      filteredCategories.splice(0);
      jobCards.classList.add('filter-off');
      filterContainer.classList.add('hidden');
    },
  };
}
