import * as support from './modules/support.js';
import * as event from './modules/event.js';

document.addEventListener('DOMContentLoaded', () => {
  support.loadAllJobCards();
});

export const filter = document.querySelector('.filter');
export const jobCards = document.querySelector('.job-cards');

jobCards.addEventListener('click', evt => {
  if (evt.target.matches('.categorie-btn')) {
    event.addCategorieToFilter(evt.target);
  }
});

filter.addEventListener('click', evt => {
  if (evt.target.matches('.categorie-btn')) {
    event.removeCategorieFromFilter(evt.target);
  }
});
