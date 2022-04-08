import { filter, jobCards } from '../main.js';

const filterCategories = document.querySelector('.filter-categories');

export function addCategorieToFilter(button) {
  const deleteIcon = document.querySelector('#delete-icon-template').content.cloneNode(true);
  const buttonClone = button.cloneNode(true);

  buttonClone.appendChild(deleteIcon);
  filterCategories.appendChild(buttonClone);
  jobCards.classList.remove('filter-off');
  filter.classList.remove('hidden');
}

export function removeCategorieFromFilter(button) {
  filterCategories.removeChild(button);
  const filterLength = filterCategories.children.length;
  
  if (filterLength === 0) {
    jobCards.classList.add('filter-off');
    filter.classList.add('hidden');
  }
}
