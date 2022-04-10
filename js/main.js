import * as support from './modules/support.js';
import Filter from './modules/filter.js';

document.addEventListener('DOMContentLoaded', support.loadAllJobCards());

export const filterContainer = document.querySelector('.filter');
export const jobCards = document.querySelector('.job-cards');
const filter = new Filter();

// Job Cards Event Listeners
jobCards.addEventListener('click', evt => {
  if (evt.target.matches('.categorie-btn')) {
    filter.addCategorieToFilter(evt.target);
  }
});

jobCards.addEventListener('touchstart', evt => {
  evt.stopImmediatePropagation();
  
  if (evt.target.matches('.categorie-btn')) {
    filter.addCategorieToFilter(evt.target);
  }
}, { passive: true });

// Filter Container Event Listeners
filterContainer.addEventListener('click', evt => {
  if (evt.target.matches('.categorie-btn')) {
    filter.removeCategorieFromFilter(evt.target);
  }

  if (evt.target.matches('.clear-btn')) {
    filter.resetFilteredCategories();
  }
});

filterContainer.addEventListener('touchstart', evt => {
  evt.stopImmediatePropagation();
  
  if (evt.target.matches('.categorie-btn')) {
    filter.removeCategorieFromFilter(evt.target);
  }

  if (evt.target.matches('.clear-btn')) {
    filter.resetFilteredCategories();
  }
}, { passive: true });
