import * as support from './modules/support.js';
import Filter from './modules/filter.js';

document.addEventListener('DOMContentLoaded', support.loadAllJobCards());

export const filterContainer = document.querySelector('.filter');
export const jobCards = document.querySelector('.job-cards');
const filter = new Filter();

jobCards.addEventListener('click', evt => {
  if (evt.target.matches('.categorie-btn')) {
    filter.addCategorieToFilter(evt.target);
  }
});

filterContainer.addEventListener('click', evt => {
  if (evt.target.matches('.categorie-btn')) {
    filter.removeCategorieFromFilter(evt.target);
  }

  if (evt.target.matches('.clear-btn')) {
    filter.resetFilteredCategories();
  }
});
