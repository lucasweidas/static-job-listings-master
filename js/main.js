import * as support from './modules/support.js';
import * as handler from './modules/handler.js';

document.addEventListener('DOMContentLoaded', support.loadAllJobCards());

export const filterContainer = document.querySelector('.filter');
export const jobCards = document.querySelector('.job-cards');

// Event Listeners
jobCards.addEventListener('click', handler.handleJobCardsClick);
filterContainer.addEventListener('click', handler.handleFilterContainerClick);
