import Filter from './filter.js';

const filter = new Filter();

export function handleJobCardsClick({ target }) {
  if (target.matches('.categorie-btn')) {
    filter.addCategorieToFilter(target);
  }
}

export function handleFilterContainerClick({ target }) {
  if (target.matches('.categorie-btn')) {
    filter.removeCategorieFromFilter(target);
    return;
  }

  if (target.matches('.clear-btn')) {
    filter.resetFilteredCategories();
  }
}
