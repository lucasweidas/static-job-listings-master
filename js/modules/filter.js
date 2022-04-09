import { filterContainer, jobCards } from '../main.js';
import * as data from './data.js';

export default function Filter() {
  const filterCategories = document.querySelector('.filter-categories');
  // const jobData = await data.getAllJobs();
  const filteredCategories = [];
  const filteredCards = [];

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
      // if (filteredCategories.length === 0) {
      //   return this.filterJobCards(categorie);
      // }
      filteredCategories.push(categorie);
      this.filterJobCards(categorie);
      // this.filterFilteredJobCards(categorie);
    },
    removeCategorieFromFilter(button, categorie) {
      filterCategories.removeChild(button);
      const filterLength = filterCategories.children.length;
      const index = filteredCategories.indexOf(categorie);

      if (filterLength === 0) {
        jobCards.classList.add('filter-off');
        filterContainer.classList.add('hidden');
      }

      filteredCategories.splice(index, 1);
      if (filteredCategories.length > 0) this.updateFilteredCategories();
      this.resetFilteredCategories();
    },
    filterJobCards(categorie) {
      const cards = [...document.querySelectorAll('.card')];

      cards.forEach(card => {
        const button = card.querySelector(`[data-categorie='${categorie}']`);

        if (!button) {
          return card.classList.add('hidden');
        }
        filteredCards.push(card);
      });
    },
    isDuplicatedCategorie(categorie) {
      return filteredCategories.includes(categorie);
    },
    updateFilteredCategories() {
      const cards = [...document.querySelectorAll('.card')];

      cards.forEach(card => {
        const hasCategorie = filteredCategories.reduce((result, categorie) => {
          const button = card.querySelector(`[data-categorie='${categorie}']`);
          if (button) {
            result = true;
          }
          return result;
        }, false);

        if (!hasCategorie) return card.classList.add('hidden');
        card.classList.remove('hidden');
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
